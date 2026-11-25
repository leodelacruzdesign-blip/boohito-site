// Use server directive is required for Genkit flows.
'use server';

/**
 * @fileOverview An AI-powered navigation assistant flow. It helps users find
 * relevant information or pages on the website by answering their questions.
 *
 * - aiNavigation - A function that handles the AI navigation process.
 * - AiNavigationInput - The input type for the aiNavigation function.
 * - AiNavigationOutput - The return type for the aiNavigation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiNavigationInputSchema = z.object({
  query: z.string().describe('The user query about the website.'),
});
export type AiNavigationInput = z.infer<typeof AiNavigationInputSchema>;

const AiNavigationOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
  relevantLinks: z
    .array(z.string())
    .describe('A list of relevant links to help the user.'),
});
export type AiNavigationOutput = z.infer<typeof AiNavigationOutputSchema>;

export async function aiNavigation(input: AiNavigationInput): Promise<AiNavigationOutput> {
  return aiNavigationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiNavigationPrompt',
  input: {schema: AiNavigationInputSchema},
  output: {schema: AiNavigationOutputSchema},
  prompt: `You are an AI assistant that helps users navigate a website. 
You will answer user questions about the website and provide relevant links to help them find what they are looking for.

User Query: {{{query}}}

Answer in a concise and helpful manner. Provide specific links if available. If no relevant links exist, say so.
`,
});

const aiNavigationFlow = ai.defineFlow(
  {
    name: 'aiNavigationFlow',
    inputSchema: AiNavigationInputSchema,
    outputSchema: AiNavigationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
