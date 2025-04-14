import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

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

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const rateLimitError = await rateLimitRequest(session.user.email);
  if (rateLimitError) return rateLimitError;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const meals = await prisma.meal.findMany({
      where: { userId: user.id },
      orderBy: { dateTime: "desc" },
    });
    return NextResponse.json(meals);
  } catch (error) {
    console.error("GET /api/meals error:", error);
    return NextResponse.json({ error: "Failed to fetch meals" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const rateLimitError = await rateLimitRequest(session.user.email);
  if (rateLimitError) return rateLimitError;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const body = await request.json();
    const { name, description, calories, dateTime, type } = body;
    const newMeal = await prisma.meal.create({
      data: {
        name,
        description,
        calories,
        dateTime: new Date(dateTime),
        type,
        userId: user.id,
      },
    });
    return NextResponse.json(newMeal, { status: 201 });
  } catch (error) {
    console.error("POST /api/meals error:", error);
    return NextResponse.json({ error: "Failed to create meal" }, { status: 500 });
  }
}
