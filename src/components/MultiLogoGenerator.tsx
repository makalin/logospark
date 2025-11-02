import React, { useState } from 'react';
import { generateLogos } from '../utils/imagen';
import { Image, Loader2, Download, Sparkles } from 'lucide-react';

const MultiLogoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedLogos, setGeneratedLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [numberOfLogos, setNumberOfLogos] = useState(4);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt describing your logo');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedLogos([]);

    try {
      const logos = await generateLogos({
        prompt,
        numberOfImages: numberOfLogos,
        aspectRatio: '1:1',
      });
      setGeneratedLogos(logos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate logos. Please check your API configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoSelect = (logoUrl: string) => {
    setSelectedLogo(logoUrl);
  };

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `logo-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Multi-Logo Generation</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Powered by Google's Imagen 3, LogoSpark generates 4-6 distinct logo concepts from a single text prompt.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Logos: {numberOfLogos}
          </label>
          <input
            type="range"
            min="4"
            max="6"
            value={numberOfLogos}
            onChange={(e) => setNumberOfLogos(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Describe your logo idea (e.g., 'Modern tech startup logo with geometric shapes')"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Image className="w-5 h-5" />
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

      {generatedLogos.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Generated Logos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedLogos.map((logoUrl, index) => (
              <div
                key={index}
                className={`relative group border-2 rounded-lg overflow-hidden transition-all cursor-pointer ${
                  selectedLogo === logoUrl
                    ? 'border-purple-600 ring-2 ring-purple-300'
                    : 'border-gray-200 hover:border-purple-400'
                }`}
                onClick={() => handleLogoSelect(logoUrl)}
              >
                <img
                  src={logoUrl}
                  alt={`Generated logo ${index + 1}`}
                  className="w-full h-64 object-contain bg-gray-50"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(logoUrl, index);
                    }}
                    className="opacity-0 group-hover:opacity-100 bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-all"
                    title="Download logo"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2 text-center">
                  <span className="text-sm font-medium text-gray-700">Logo {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
          {selectedLogo && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Selected:</strong> You can now customize this logo in the editor.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiLogoGenerator;

