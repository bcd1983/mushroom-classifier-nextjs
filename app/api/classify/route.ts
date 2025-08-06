import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export type MushroomClassification = z.infer<typeof mushroomClassificationSchema>;
import { NextRequest, NextResponse } from 'next/server';

// Define the schema for structured output
export const mushroomClassificationSchema = z.object({
  species: z.object({
    commonName: z.string().describe('Common name of the mushroom'),
    scientificName: z.string().describe('Scientific/Latin name of the mushroom'),
  }),
  confidence: z.enum(['high', 'medium', 'low']).describe('Confidence level of the identification'),
  edibility: z.enum(['edible', 'poisonous', 'unknown', 'not_recommended']).describe('Edibility status'),
  toxicity: z.object({
    level: z.enum(['none', 'mild', 'moderate', 'severe', 'deadly', 'unknown']).describe('Toxicity level if poisonous'),
    symptoms: z.array(z.string()).describe('Potential symptoms if consumed').optional(),
  }),
  identifyingFeatures: z.array(z.string()).describe('Key identifying features visible in the image'),
  warnings: z.array(z.string()).describe('Important warnings or notes'),
  similarSpecies: z.array(z.object({
    name: z.string(),
    edibility: z.enum(['edible', 'poisonous', 'unknown', 'not_recommended']),
    keyDifference: z.string(),
  })).describe('Similar looking species that could be confused'),
  habitat: z.string().describe('Typical habitat where this mushroom is found').optional(),
  season: z.string().describe('Typical season when this mushroom appears').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Create data URL
    const dataUrl = `data:${image.type};base64,${base64Image}`;

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: mushroomClassificationSchema,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `You are an expert mycologist. Analyze this mushroom image and provide a detailed identification. Be conservative with edibility - when in doubt, mark as "not_recommended" or "unknown". Include all relevant warnings for safety.`
            },
            {
              type: 'image',
              image: dataUrl
            }
          ]
        }
      ]
    });

    return NextResponse.json({ classification: object });
  } catch (error) {
    console.error('Classification error:', error);
    return NextResponse.json(
      { error: 'Failed to classify mushroom' },
      { status: 500 }
    );
  }
}