'use client';

import { trpc } from '@/trpc/client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string>('');

  const hello = trpc.hello.useQuery();
  const generateCode = trpc.ai.generateCode.useMutation({
    onSuccess: (data) => {
      setIsGenerating(false);
      setResult(`✅ ${data.message}\nPrompt: ${data.prompt}`);
    },
    onError: (error) => {
      setIsGenerating(false);
      setResult(`❌ Error: ${error.message}`);
    },
  });

  const handleGenerateCode = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setResult('');
    generateCode.mutate({
      prompt: prompt,
      projectId: 'test-project',
      userId: 'test-user',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Vibe AI Builder
          </h1>
          <p className="text-xl text-gray-600">
            Generate full-stack applications with AI
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Test AI Code Generation</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe what you want to build:
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Create a todo list component with add, delete, and mark as complete functionality"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>
            
            <button
              onClick={handleGenerateCode}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating Code...' : 'Generate Code'}
            </button>
          </div>

          {result && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">System Status</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Next.js Server: Running</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>tRPC API: Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Database: Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Inngest: Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Gemini AI: Ready</span>
            </div>
          </div>
          
          {hello.data && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-gray-700">{hello.data.greeting}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
