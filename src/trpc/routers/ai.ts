import { z } from 'zod';
import { publicProcedure, router } from '../init';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
        
        // Initialize Google AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        
        const result = await model.generateContent(`
          Generate a complete React component based on this prompt: "${input.prompt}"
          
          Requirements:
          - Use modern React with TypeScript
          - Include proper styling with Tailwind CSS
          - Make it functional and interactive
          - Include proper error handling
          - Add comments for clarity
          
          Return only the code, no explanations.
        `);

        const response = await result.response;
        const generatedCode = response.text();
        
        return { 
          success: true, 
          message: 'Code generated successfully!',
          prompt: input.prompt,
          code: generatedCode
        };
      } catch (error) {
        console.error('Error in generateCode:', error);
        throw new Error(`Failed to generate code: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }),
});
