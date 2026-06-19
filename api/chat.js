import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(200).json({
      message: "Everest chatbot API is running. Send a POST request with a message."
    });
  }

  try {
    const userMessage = req.body?.message || "Hello";

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are Everest Mouldings' AI assistant. Answer questions about crown mouldings, LED light coves, coffered ceilings, decorative ceiling beams, installation, shipping, samples, pricing, custom profiles, and product recommendations."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message || "Server error"
    });
  }
}