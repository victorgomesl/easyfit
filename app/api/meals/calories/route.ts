// app/api/meals/calories/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { toZonedTime } from "date-fns-tz";
import { startOfDay, endOfDay } from "date-fns";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, "1 m"),
});

async function rateLimitRequest(identifier: string) {
  const { success } = await ratelimit.limit(identifier);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  return null;
}

export async function GET(request: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimitError = await rateLimitRequest(session.user.email);
  if (rateLimitError) return rateLimitError;

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "day";

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let startDate: Date, endDate: Date;
    const now = new Date();
    const timeZone = "America/Sao_Paulo";

    if (period === "day") {
      const zonedNow = toZonedTime(now, timeZone);
      startDate = startOfDay(zonedNow);
      endDate = endOfDay(zonedNow);
    } else if (period === "week") {
      const zonedNow = toZonedTime(now, timeZone);
      const day = zonedNow.getDay();
      startDate = startOfDay(new Date(zonedNow.getFullYear(), zonedNow.getMonth(), zonedNow.getDate() - day));
      endDate = endOfDay(new Date(zonedNow.getFullYear(), zonedNow.getMonth(), zonedNow.getDate() - day + 6));
    } else {
      return NextResponse.json({ error: "Invalid period" }, { status: 400 });
    }

    const meals = await prisma.meal.findMany({
      where: {
        userId: user.id,
        dateTime: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
    return NextResponse.json({ total: totalCalories });
  } catch (error) {
    console.error("GET /api/meals/calories error:", error);
    return NextResponse.json({ error: "Failed to calculate calories" }, { status: 500 });
  }
}
