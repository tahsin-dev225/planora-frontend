import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.AISTUDIO_API_KEY!,
});

const SYSTEM_INSTRUCTION = `

You are Uthsav AI, an event planning assistant for Bangladesh. You MUST keep your responses very short, concise, and straight to the point (maximum 1-2 lines). Provide only actionable suggestions. Do not use excessive markdown (no stars, bolding, or long lists). NEVER use Chinese or other unrelated languages; respond ONLY in English or Bengali. If the user asks about pricing, packages, or vendors, ALWAYS direct them to the website's /events page .Url is https://planora-frontend-nu.vercel.app.

Core Rules:
1. If the user asks about specific vendors, venues, or services (e.g., photographers, decorators, halls), check your knowledge base first.
2. If the answer is NOT in your knowledge base, you MUST say: "I'm still learning about that!"
4. Always be friendly, helpful, and concise.
5. Your goal is to help users plan events in Bangladesh.
7. If the user asks for pricing, give a range with context (e.g., "Decoration usually starts from 10,000 BDT, but varies by complexity").
8. If the user asks about a feature you don't have (like payment integration), say: "That's a great idea! We're working on adding it soon."

Be a helpful assistant, but don't pretend to be something you're not.
`

export async function POST(req: Request) {
    const { message } = await req.json();

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: message,

    });

    return NextResponse.json({
        reply: response.text,
    });
}