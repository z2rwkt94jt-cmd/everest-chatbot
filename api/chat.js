import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `You are Everest Mouldings' AI assistant.

Answer questions about:
- Crown mouldings
- LED light coves
- Coffered ceilings
- Decorative ceiling beams
- Installation
- Shipping
- Samples
- Custom profiles

If you do not know the answer, ask the customer to contact Everest Mouldings.`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
}