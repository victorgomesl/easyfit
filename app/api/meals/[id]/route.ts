import { NextResponse, NextRequest } from "next/server";
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

export async function GET(request: NextRequest) {
  const params = request.nextUrl.pathname.split("/").pop(); // Extract id from URL
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rateLimitError = await rateLimitRequest(session.user.email);
  if (rateLimitError) return rateLimitError;
  try {
    const meal = await prisma.meal.findUnique({
      where: { id: params },
    });
    if (!meal) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 });
    }
    return NextResponse.json(meal);
  } catch (error) {
    console.error("GET /api/meals/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch meal" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const params = request.nextUrl.pathname.split("/").pop();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rateLimitError = await rateLimitRequest(session.user.email);
  if (rateLimitError) return rateLimitError;
  try {
    const body = await request.json();
    const { name, description, calories, dateTime, type } = body;
    const updatedMeal = await prisma.meal.update({
      where: { id: params },
      data: {
        name,
        description,
        calories,
        dateTime: new Date(dateTime),
        type,
      },
    });
    return NextResponse.json(updatedMeal);
  } catch (error) {
    console.error("PUT /api/meals/[id] error:", error);
    return NextResponse.json({ error: "Failed to update meal" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const params = request.nextUrl.pathname.split("/").pop();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rateLimitError = await rateLimitRequest(session.user.email);
  if (rateLimitError) return rateLimitError;
  try {
    await prisma.meal.delete({
      where: { id: params },
    });
    return NextResponse.json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/meals/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete meal" }, { status: 500 });
  }
}