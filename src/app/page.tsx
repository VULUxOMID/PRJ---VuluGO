'use client';

import { trpc } from '@/trpc/client';
import { useState } from 'react';
import React from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const hello = trpc.hello.useQuery();
  const generateCode = trpc.ai.generateCode.useMutation({
    onSuccess: (data) => {
      setIsGenerating(false);
      setResult(`✅ ${data.message}\nPrompt: ${data.prompt}`);
      if (data.code) {
        setGeneratedCode(data.code);
        setShowPreview(true);
      }
    },
    onError: (error) => {
      setIsGenerating(false);
      setResult(`❌ Error: ${error.message}`);
      setGeneratedCode('');
      setShowPreview(false);
    },
  });

  const handleGenerateCode = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setResult('');
    setGeneratedCode('');
    setShowPreview(false);
    generateCode.mutate({
      prompt: prompt,
      projectId: 'test-project',
      userId: 'test-user',
    });
  };

  // Function to create a safe component from generated code
  const createPreviewComponent = (code: string) => {
    try {
      // Extract the component name from different patterns
      let componentName = 'GeneratedComponent';
      
      // Pattern 1: const ComponentName: React.FC
      const pattern1 = code.match(/const\s+(\w+):\s*React\.FC/);
      if (pattern1) {
        componentName = pattern1[1];
      } else {
        // Pattern 2: function ComponentName()
        const pattern2 = code.match(/function\s+(\w+)/);
        if (pattern2) {
          componentName = pattern2[1];
        } else {
          // Pattern 3: const ComponentName = () =>
          const pattern3 = code.match(/const\s+(\w+)\s*=\s*\(\)\s*=>/);
          if (pattern3) {
            componentName = pattern3[1];
          }
        }
      }
      
      console.log('Extracted component name:', componentName);
      
      return { componentName, safeCode: code };
    } catch (error) {
      console.error('Error parsing generated code:', error);
      return { componentName: 'GeneratedComponent', safeCode: code };
    }
  };

  const previewData = generatedCode ? createPreviewComponent(generatedCode) : null;

  // Debug logging
  React.useEffect(() => {
    if (generatedCode) {
      console.log('Generated Code:', generatedCode);
      console.log('Preview Data:', previewData);
    }
  }, [generatedCode, previewData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Vibe AI Builder
          </h1>
          <p className="text-xl text-gray-600">
            Generate full-stack applications with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Generation Panel */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Generate Your App</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe what you want to build:
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Create a Netflix-style homepage with movie cards and navigation"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={4}
                />
              </div>
              
              <button
                onClick={handleGenerateCode}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? '🚀 Generating Your App...' : '🚀 Generate & Preview App'}
              </button>
              
              <button
                onClick={() => {
                  setGeneratedCode(`
const TestComponent: React.FC = () => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Test Component</h1>
        <p className="text-gray-600 mb-6">This is a test component to verify the preview system is working!</p>
        <div className="space-y-4">
          <p className="text-2xl font-bold text-blue-600">Count: {count}</p>
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Increment
          </button>
          <button 
            onClick={() => setCount(0)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors ml-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
                  `);
                  setShowPreview(true);
                  setResult('✅ Test component loaded successfully!');
                }}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                🧪 Test Preview System
              </button>
            </div>

            {result && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            )}
          </div>

          {/* Live Preview Panel */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Live Preview</h2>
              {showPreview && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Hide Preview
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement save/deploy functionality
                      alert('Save/Deploy functionality coming soon!');
                    }}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save Project
                  </button>
                </div>
              )}
            </div>

            {showPreview && generatedCode ? (
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 ml-2">Live Preview</span>
                  </div>
                </div>
                <div className="h-96 overflow-auto bg-white">
                  <iframe
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <meta charset="utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <title>Generated App Preview</title>
                          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                          <script src="https://cdn.tailwindcss.com"></script>
                          <style>
                            body { margin: 0; padding: 0; }
                            * { box-sizing: border-box; }
                          </style>
                        </head>
                        <body>
                          <div id="root"></div>
                          <script type="text/babel">
                            try {
                              ${generatedCode}
                              
                              const root = ReactDOM.createRoot(document.getElementById('root'));
                              root.render(React.createElement(${previewData?.componentName || 'GeneratedComponent'}));
                            } catch (error) {
                              document.getElementById('root').innerHTML = '<div style="padding: 20px; color: red;">Error rendering component: ' + error.message + '</div>';
                            }
                          </script>
                        </body>
                      </html>
                    `}
                    className="w-full h-full border-0"
                    title="Generated App Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            ) : (
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">🎨</div>
                  <p className="text-lg font-medium">Your app preview will appear here</p>
                  <p className="text-sm">Generate code to see the live preview</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generated Code Display */}
        {generatedCode && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Generated Code</h3>
              <button
                onClick={() => navigator.clipboard.writeText(generatedCode)}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Copy Code
              </button>
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm whitespace-pre-wrap">{generatedCode}</pre>
            </div>
          </div>
        )}

        {/* System Status */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">System Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Next.js Server</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>tRPC API</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Database</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Gemini AI</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Live Preview</span>
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
