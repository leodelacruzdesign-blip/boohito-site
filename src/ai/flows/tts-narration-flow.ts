
'use server';

/**
 * @fileOverview AI Narration flow for E-Learning modules.
 * Converts instructional text into speech using Gemini TTS.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import wav from 'wav';

const TtsNarrationInputSchema = z.object({
  text: z.string().describe('The text to narrate.'),
});
export type TtsNarrationInput = z.infer<typeof TtsNarrationInputSchema>;

const TtsNarrationOutputSchema = z.object({
  audioUri: z.string().describe('Data URI of the generated WAV audio.'),
});
export type TtsNarrationOutput = z.infer<typeof TtsNarrationOutputSchema>;

export async function generateNarration(input: TtsNarrationInput): Promise<TtsNarrationOutput> {
  return ttsNarrationFlow(input);
}

const ttsNarrationFlow = ai.defineFlow(
  {
    name: 'ttsNarrationFlow',
    inputSchema: TtsNarrationInputSchema,
    outputSchema: TtsNarrationOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' }, // Professional female-leaning voice
          },
        },
      },
      prompt: input.text,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate audio media.');
    }

    // Extract base64 PCM data
    const pcmBase64 = media.url.substring(media.url.indexOf(',') + 1);
    const pcmBuffer = Buffer.from(pcmBase64, 'base64');

    // Convert PCM to WAV
    const wavBase64 = await toWav(pcmBuffer);

    return {
      audioUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);

/**
 * Converts raw PCM data to WAV format.
 */
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
