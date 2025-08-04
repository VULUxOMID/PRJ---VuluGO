import { z } from 'zod';
import { publicProcedure, router } from '../init';
import { inngest } from '@/inngest/client';

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
        
        // Trigger Inngest function
        await inngest.send({
          name: 'app/code.generate',
          data: {
            prompt: input.prompt,
            projectId: input.projectId,
            userId: input.userId,
          },
        });
        
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
