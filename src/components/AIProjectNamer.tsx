import React, { useState } from 'react';
import { generateProjectNames } from '../utils/gemini';
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';

const AIProjectNamer: React.FC = () => {
  const [keywords, setKeywords] = useState('');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!keywords.trim()) {
      setError('Please enter some keywords');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedNames([]);

    try {
      const names = await generateProjectNames(keywords);
      setGeneratedNames(names);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate names. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (name: string, index: number) => {
    navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">AI Project Namer</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Can't think of a name? Enter a few keywords (e.g., "Real estate, smart, analytics") and our AI will brainstorm unique, brandable names.
        </p>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Enter keywords separated by commas (e.g., tech, innovation, future)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
      </div>

      {generatedNames.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Generated Names</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {generatedNames.map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <span className="font-medium text-gray-800">{name}</span>
                <button
                  onClick={() => handleCopy(name, index)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                  title="Copy to clipboard"
                >
                  {copiedIndex === index ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProjectNamer;

