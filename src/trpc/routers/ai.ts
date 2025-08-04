import { z } from 'zod';
import { publicProcedure, router } from '../init';

export const aiRouter = router({
  generateCode: publicProcedure
    .input(z.object({
      prompt: z.string(),
      projectId: z.string(),
      userId: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        console.log('Generating code for prompt:', input.prompt);
        
        // For now, let's just return a success message without Inngest
        // We'll add Inngest back once we fix the basic tRPC setup
        
        return { 
          success: true, 
          message: 'Code generation started',
          prompt: input.prompt 
        };
      } catch (error) {
        console.error('Error in generateCode:', error);
        throw new Error('Failed to generate code');
      }
    }),
});
