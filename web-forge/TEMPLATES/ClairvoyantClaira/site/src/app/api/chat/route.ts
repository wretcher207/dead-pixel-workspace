import { NextRequest, NextResponse } from "next/server";

const oracleResponses = [
  "The cards suggest a period of transformation. What you're clinging to is the very thing blocking what's trying to reach you.",
  "I see water in your reading — emotion, intuition, something beneath the surface you haven't named yet. Trust what your body already knows.",
  "There's a door you keep walking past. You know which one. The hesitation isn't wisdom — it's fear dressed up as patience.",
  "The moon is waning. This is a time for release, not pursuit. Let something go this week and notice what fills the space.",
  "Your question carries its own answer. Read it back to yourself slowly. You already know.",
  "I see two paths, but you're not choosing between them — you're choosing between who you are and who you're becoming.",
  "Something buried is surfacing. Don't push it back down. The discomfort is the healing.",
  "The stars are quiet tonight, but silence isn't absence. Sometimes the universe holds its breath before it speaks.",
];

export async function POST(request: NextRequest) {
  const { message } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  // Simulate delay for mystical effect
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000)
  );

  const response =
    oracleResponses[Math.floor(Math.random() * oracleResponses.length)];

  return NextResponse.json({ response });
}
