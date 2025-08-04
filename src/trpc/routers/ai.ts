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
          Generate a complete, self-contained React component based on this prompt: "${input.prompt}"
          
          Requirements:
          - Use modern React with TypeScript
          - Include proper styling with Tailwind CSS
          - Make it functional and interactive
          - Include proper error handling
          - Add comments for clarity
          - Use mock data instead of real API calls (no external dependencies)
          - Make it work in a sandboxed environment
          - Include sample data/state for demonstration
          - Use React hooks (useState, useEffect) appropriately
          - Make it visually appealing and modern
          
          Important: 
          - Do NOT use external API calls or axios
          - Use mock/sample data instead
          - Make it completely self-contained
          - Return only the component code, no explanations
          
          Example structure:
          const ComponentName: React.FC = () => {
            const [data, setData] = useState(mockData);
            // ... rest of component
          };
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
