
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import JsonEditor from './components/JsonEditor';
import CodeDisplay from './components/CodeDisplay';
import Preview from './components/Preview';
import Spinner from './components/Spinner';
import ClipboardIcon from './components/icons/ClipboardIcon';
import CheckIcon from './components/icons/CheckIcon';
import { generateUiCode } from './services/geminiService';
import { DEFAULT_JSON_CONFIG } from './constants';

type ViewMode = 'code' | 'preview';

const App: React.FC = () => {
  const [jsonConfig, setJsonConfig] = useState<string>(DEFAULT_JSON_CONFIG);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('code');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [generatedCode]);


  const handleGenerateClick = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedCode('');
    setViewMode('code'); // Default to code view on new generation

    try {
      // Basic JSON validation
      JSON.parse(jsonConfig);
    } catch (e) {
      setError('Invalid JSON format. Please check your input.');
      setIsLoading(false);
      return;
    }

    try {
      const code = await generateUiCode(jsonConfig);
      setGeneratedCode(code);
    } catch (err) {
      setError('Failed to generate UI. The AI model might be unavailable or the request was blocked. Please check your API key and network connection.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [jsonConfig]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-6">
        <div className="flex flex-col gap-4 h-[calc(100vh-100px)]">
          <JsonEditor value={jsonConfig} onChange={setJsonConfig} />
          <button
            onClick={handleGenerateClick}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center disabled:bg-indigo-800 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Spinner />
                Generating...
              </>
            ) : (
              'Generate UI Component'
            )}
          </button>
        </div>
        <div className="flex flex-col bg-gray-800 rounded-lg border border-gray-700 h-[calc(100vh-100px)]">
          {isLoading && (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-400">
               <Spinner />
               <p className="mt-4 text-lg">AI is generating your component...</p>
               <p className="text-sm text-gray-500">This may take a moment.</p>
            </div>
          )}
          {error && (
            <div className="flex-grow flex items-center justify-center p-4">
              <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
                <h3 className="font-bold">Error</h3>
                <p>{error}</p>
              </div>
            </div>
          )}
          {!isLoading && !error && generatedCode && (
            <>
              <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <button
                        onClick={() => setViewMode('preview')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => setViewMode('code')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'code' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                    >
                        Code
                    </button>
                </div>
                {viewMode === 'code' && (
                    <button
                        onClick={handleCopy}
                        className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm text-gray-300 transition-colors"
                    >
                        {copied ? <CheckIcon /> : <ClipboardIcon />}
                        <span className="ml-2">{copied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                )}
              </div>
              {viewMode === 'code' && <CodeDisplay code={generatedCode} />}
              {viewMode === 'preview' && <Preview code={generatedCode} jsonConfig={jsonConfig} />}
            </>
          )}
          {!isLoading && !error && !generatedCode && (
             <div className="flex-grow flex flex-col items-center justify-center text-gray-600 p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-500">Generated Code Will Appear Here</h2>
                <p className="text-gray-600 mt-2">Enter your JSON configuration and click "Generate UI" to see the magic happen.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
