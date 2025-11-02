import React from 'react';
import { SketchPicker } from 'react-color';
import type { ColorResult } from 'react-color';
import type { Logo } from './LogoEditor';
import { GOOGLE_FONTS } from '../utils/googleFonts';

interface ControlsProps {
  logo: Logo;
  setLogo: React.Dispatch<React.SetStateAction<Logo>>;
}

const Controls: React.FC<ControlsProps> = ({ logo, setLogo }) => {
  const handleExportSVG = () => {
    const svgElement = document.getElementById('logo-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${logo.text || 'logo'}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  const handleExportPNG = () => {
    const svgElement = document.getElementById('logo-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `${logo.text || 'logo'}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
          }
        }, 'image/png');
      }
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto max-h-[calc(100vh-8rem)]">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Customize Logo</h3>

        {/* Layout Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Layout</h4>
          <div className="grid grid-cols-2 gap-2">
            {(['top', 'left', 'right', 'center'] as const).map((layout) => (
              <button
                key={layout}
                onClick={() => setLogo({ ...logo, layout })}
                className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-colors ${
                  logo.layout === layout
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {layout}
              </button>
            ))}
          </div>
        </div>

        {/* Text Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Text</h4>
          
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">Project Name</label>
            <input
              type="text"
              value={logo.text}
              onChange={(e) => setLogo({ ...logo, text: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">Tagline</label>
            <input
              type="text"
              value={logo.tagline}
              onChange={(e) => setLogo({ ...logo, tagline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Font: {logo.fontFamily}
            </label>
            <select
              value={logo.fontFamily}
              onChange={(e) => setLogo({ ...logo, fontFamily: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {GOOGLE_FONTS.map((font) => (
                <option key={font.name} value={font.family}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Font Size: {logo.fontSize}px
            </label>
            <input
              type="range"
              min="20"
              max="80"
              value={logo.fontSize}
              onChange={(e) => setLogo({ ...logo, fontSize: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Tagline Size: {logo.taglineSize}px
            </label>
            <input
              type="range"
              min="12"
              max="40"
              value={logo.taglineSize}
              onChange={(e) => setLogo({ ...logo, taglineSize: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="flex gap-3 mb-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={logo.textStyle.bold}
                onChange={(e) =>
                  setLogo({
                    ...logo,
                    textStyle: { ...logo.textStyle, bold: e.target.checked },
                  })
                }
                className="cursor-pointer"
              />
              <span>Bold</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={logo.textStyle.italic}
                onChange={(e) =>
                  setLogo({
                    ...logo,
                    textStyle: { ...logo.textStyle, italic: e.target.checked },
                  })
                }
                className="cursor-pointer"
              />
              <span>Italic</span>
            </label>
          </div>
        </div>

        {/* Colors Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Colors</h4>
          
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">Primary Color</label>
            <div className="flex justify-center">
              <SketchPicker
                color={logo.colors.primary}
                onChangeComplete={(color: ColorResult) =>
                  setLogo({
                    ...logo,
                    colors: { ...logo.colors, primary: color.hex },
                  })
                }
                width="240px"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">Accent Color</label>
            <div className="flex justify-center">
              <SketchPicker
                color={logo.colors.accent}
                onChangeComplete={(color: ColorResult) =>
                  setLogo({
                    ...logo,
                    colors: { ...logo.colors, accent: color.hex },
                  })
                }
                width="240px"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">Background</label>
            <div className="flex justify-center">
              <SketchPicker
                color={logo.colors.background === 'transparent' ? '#ffffff' : logo.colors.background}
                onChangeComplete={(color: ColorResult) =>
                  setLogo({
                    ...logo,
                    colors: { ...logo.colors, background: color.hex },
                  })
                }
                width="240px"
              />
            </div>
            <button
              onClick={() =>
                setLogo({
                  ...logo,
                  colors: { ...logo.colors, background: 'transparent' },
                })
              }
              className="w-full mt-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
            >
              Clear Background
            </button>
          </div>
        </div>

        {/* Shape Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Shape/Icon</h4>
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={logo.showShape}
                onChange={(e) => setLogo({ ...logo, showShape: e.target.checked })}
                className="cursor-pointer"
              />
              <span>Show</span>
            </label>
          </div>

          {logo.showShape && (
            <>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                <select
                  value={logo.shape.type}
                  onChange={(e) =>
                    setLogo({
                      ...logo,
                      shape: { ...logo.shape, type: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="circle">Circle</option>
                  <option value="square">Square</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="triangle">Triangle</option>
                  <option value="hexagon">Hexagon</option>
                  <option value="star">Star</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Size: {logo.shape.size}px
                </label>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={logo.shape.size}
                  onChange={(e) =>
                    setLogo({
                      ...logo,
                      shape: { ...logo.shape, size: parseInt(e.target.value) },
                    })
                  }
                  className="w-full"
                />
              </div>

              {!logo.shape.gradient && (
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Color</label>
                  <div className="flex justify-center">
                    <SketchPicker
                      color={logo.shape.color}
                      onChangeComplete={(color: ColorResult) =>
                        setLogo({
                          ...logo,
                          shape: { ...logo.shape, color: color.hex },
                        })
                      }
                      width="240px"
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={logo.shape.gradient}
                    onChange={(e) =>
                      setLogo({
                        ...logo,
                        shape: { ...logo.shape, gradient: e.target.checked },
                      })
                    }
                    className="cursor-pointer"
                  />
                  <span>Use Gradient</span>
                </label>
              </div>

              {logo.shape.gradient && (
                <>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Start</label>
                    <div className="flex justify-center">
                      <SketchPicker
                        color={logo.shape.gradientColors.start}
                        onChangeComplete={(color: ColorResult) =>
                          setLogo({
                            ...logo,
                            shape: {
                              ...logo.shape,
                              gradientColors: {
                                ...logo.shape.gradientColors,
                                start: color.hex,
                              },
                            },
                          })
                        }
                        width="240px"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-600 mb-2">End</label>
                    <div className="flex justify-center">
                      <SketchPicker
                        color={logo.shape.gradientColors.end}
                        onChangeComplete={(color: ColorResult) =>
                          setLogo({
                            ...logo,
                            shape: {
                              ...logo.shape,
                              gradientColors: {
                                ...logo.shape.gradientColors,
                                end: color.hex,
                              },
                            },
                          })
                        }
                        width="240px"
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Export Section */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Export</h4>
          <button
            onClick={handleExportSVG}
            className="w-full mb-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Export as SVG
          </button>
          <button
            onClick={handleExportPNG}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
          >
            Export as PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
