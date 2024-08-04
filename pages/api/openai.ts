import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { messages } = req.body;

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4o-mini",
        });

        const reply = completion.choices[0].message
        res.status(200).json(reply);
    } else {
        res.status(400).json({ message: "Method not allowed" })
    }

}

export default handler;