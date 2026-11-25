
'use server';
/**
 * @fileOverview Genkit flow for HubSpot MCP integration.
 * - syncHubSpotUser - Syncs user usage data to HubSpot.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SyncHubSpotInputSchema = z.object({
  email: z.string().email(),
  usageCount: z.number(),
});
export type SyncHubSpotInput = z.infer<typeof SyncHubSpotInputSchema>;

const SyncHubSpotOutputSchema = z.object({
  success: z.boolean(),
  hubspotId: z.string().optional(),
  message: z.string(),
});
export type SyncHubSpotOutput = z.infer<typeof SyncHubSpotOutputSchema>;

const checkHubSpotContact = ai.defineTool(
  {
    name: 'checkHubSpotContact',
    description: 'Checks if a contact exists in HubSpot by email.',
    inputSchema: z.object({ email: z.string().email() }),
    outputSchema: z.object({ exists: z.boolean(), contactId: z.string().optional() }),
  },
  async (input) => {
    // Simulated HubSpot API check logic
    // In production, this would use the HubSpot SDK
    console.log(`Checking HubSpot for: ${input.email}`);
    return { exists: false }; 
  }
);

const createOrUpdateHubSpotContact = ai.defineTool(
  {
    name: 'createOrUpdateHubSpotContact',
    description: 'Creates a new HubSpot contact or updates an existing one with usage analytics.',
    inputSchema: z.object({
      email: z.string().email(),
      usageCount: z.number(),
      lifecycleTag: z.string(),
    }),
    outputSchema: z.object({ contactId: z.string() }),
  },
  async (input) => {
    // Simulated HubSpot API call mapping usage_count to AI_Queries_Used
    console.log(`Syncing to HubSpot: ${input.email}, AI_Queries_Used: ${input.usageCount}`);
    return { contactId: 'hs_' + Math.random().toString(36).substr(2, 9) };
  }
);

export async function syncHubSpotUser(input: SyncHubSpotInput): Promise<SyncHubSpotOutput> {
  return syncHubSpotFlow(input);
}

const syncHubSpotFlow = ai.defineFlow(
  {
    name: 'syncHubSpotFlow',
    inputSchema: SyncHubSpotInputSchema,
    outputSchema: SyncHubSpotOutputSchema,
  },
  async (input) => {
    const check = await checkHubSpotContact({ email: input.email });
    
    // Create or update contact with the specific lifecycle tag and AI queries property
    const result = await createOrUpdateHubSpotContact({
      email: input.email,
      usageCount: input.usageCount,
      lifecycleTag: 'Boohito_Portfolio_Visitor',
    });

    return {
      success: true,
      hubspotId: result.contactId,
      message: check.exists ? 'Contact updated' : 'New contact created in HubSpot',
    };
  }
);
