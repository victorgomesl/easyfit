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
    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/user error:", error);
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimitError = await rateLimitRequest(session.user.email);
  if (rateLimitError) return rateLimitError;

  const body = await request.json();
  const { name, dailyCalorieGoal, weeklyCalorieGoal } = body;

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  if (
    typeof dailyCalorieGoal !== "number" ||
    dailyCalorieGoal < 500 ||
    dailyCalorieGoal > 10000
  ) {
    return NextResponse.json(
      { error: "Invalid daily calorie goal" },
      { status: 400 }
    );
  }

  if (
    typeof weeklyCalorieGoal !== "number" ||
    weeklyCalorieGoal < 3500 ||
    weeklyCalorieGoal > 70000
  ) {
    return NextResponse.json(
      { error: "Invalid weekly calorie goal" },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: name.trim(),
        dailyCalorieGoal,
        weeklyCalorieGoal,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PATCH /api/user error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimitError = await rateLimitRequest(session.user.email);
  if (rateLimitError) return rateLimitError;

  try {
    await prisma.user.delete({
      where: { email: session.user.email },
    });
    return NextResponse.json({ message: "Conta deletada com sucesso." });
  } catch (error) {
    console.error("DELETE /api/user error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
