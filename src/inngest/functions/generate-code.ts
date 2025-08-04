import { inngest } from '@/inngest/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateCode = inngest.createFunction(
  { name: 'Generate Code' },
  { event: 'app/code.generate' },
  async ({ event, step }) => {
    const { prompt, projectId, userId } = event.data;

    // Step 1: Generate code using Gemini
    const generatedCode = await step.run('generate-code', async () => {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const result = await model.generateContent(`
        Generate a complete React component based on this prompt: "${prompt}"
        
        Requirements:
        - Use modern React with TypeScript
        - Include proper styling with Tailwind CSS
        - Make it functional and interactive
        - Include proper error handling
        - Add comments for clarity
        
        Return only the code, no explanations.
      `);

      const response = await result.response;
      return response.text();
    });

    // Step 2: Save to database (we'll implement this later)
    await step.run('save-code', async () => {
      // TODO: Save generated code to database
      console.log('Code generated:', generatedCode);
      return { success: true, code: generatedCode };
    });

    return {
      success: true,
      code: generatedCode,
      projectId,
      userId
    };
  }
);
