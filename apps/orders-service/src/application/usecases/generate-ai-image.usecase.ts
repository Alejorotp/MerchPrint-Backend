import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GenerateAIImageUseCase {
    async execute(prompt: string): Promise<{ mime: string; data: Buffer }> {
        if (!prompt || typeof prompt !== 'string') {
            throw new Error('prompt is required');
        }

        const apiKey = process.env.GENERATE_IMAGE_API_KEY;
        if (!apiKey) {
            throw new Error('AI service not configured');
        }

        try {
            const ai = new GoogleGenAI({ apiKey });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }],
                    },
                ],
            });

            const candidates = response.candidates || [];
            for (const cand of candidates) {
                if (!cand.content?.parts) continue;
                for (const part of cand.content.parts) {
                    const anyPart = part as any;
                    if (anyPart.inlineData) {
                        const inline = anyPart.inlineData as {
                            data: string;
                            mimeType?: string;
                        };
                        const mime = inline.mimeType || 'image/png';
                        const b64 = inline.data;
                        const buffer = Buffer.from(b64, 'base64');
                        return { mime, data: buffer };
                    }
                }
            }

            const text = candidates
                .filter((c) => c.content)
                .flatMap((c) => c.content!.parts)
                .map((p: any) => p.text)
                .filter(Boolean)
                .join('\n');

            throw new Error(text || 'No image generated');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'AI error';
            throw new Error(message);
        }
    }
}
