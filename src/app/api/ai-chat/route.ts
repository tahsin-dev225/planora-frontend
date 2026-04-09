export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json(
        { success: false, message: "Message required" },
        { status: 400 }
      );
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL!,
        "X-Title": "Planora AI",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free", // 🔥 free model
        messages: [
          {
            role: "system",
            content:
              "You are Planora AI, an event planning assistant for Bangladesh. You MUST keep your responses very short, concise, and straight to the point (maximum 1-2 lines). Provide only actionable suggestions. Do not use excessive markdown (no stars, bolding, or long lists). NEVER use Chinese or other unrelated languages; respond ONLY in English or Bengali. If the user asks about pricing, packages, or vendors, ALWAYS direct them to the website's /events page .Url is https://planora-frontend-nu.vercel.app. ",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await res.json();

    const reply =
      data?.choices?.[0]?.message?.content || "No response from AI";

    return Response.json({ success: true, reply });
  } catch (error) {
    console.error("AI ERROR:", error);

    return Response.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}