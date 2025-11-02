import React, { useState } from 'react';
import Canvas from './Canvas';
import Controls from './Controls';

export interface Logo {
  text: string;
  tagline: string;
  fontSize: number;
  taglineSize: number;
  fontFamily: string;
  textStyle: {
    bold: boolean;
    italic: boolean;
    shadow: boolean;
    shadowColor: string;
    shadowOffset: number;
  };
  colors: {
    primary: string;
    accent: string;
    background: string;
  };
  layout: 'top' | 'left' | 'right' | 'center';
  shape: {
    type: string;
    color: string;
    size: number;
    strokeWidth: number;
    strokeColor: string;
    rotation: number;
    gradient: boolean;
    gradientColors: {
      start: string;
      end: string;
    };
  };
  showShape: boolean;
  rotation: number;
}

const LogoEditor: React.FC = () => {
  const [logo, setLogo] = useState<Logo>({
    text: 'LogoSpark',
    tagline: 'Your project tagline here',
    fontSize: 50,
    taglineSize: 24,
    fontFamily: 'Inter',
    textStyle: {
      bold: true,
      italic: false,
      shadow: false,
      shadowColor: '#000000',
      shadowOffset: 2,
    },
    colors: {
      primary: '#000000',
      accent: '#3b82f6',
      background: 'transparent',
    },
    layout: 'top',
    shape: {
      type: 'circle',
      color: '#3b82f6',
      size: 100,
      strokeWidth: 0,
      strokeColor: '#000000',
      rotation: 0,
      gradient: false,
      gradientColors: {
        start: '#3b82f6',
        end: '#8b5cf6',
      },
    },
    showShape: false,
    rotation: 0,
  });

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      <Controls logo={logo} setLogo={setLogo} />
      <div className="flex-1 overflow-auto">
        <Canvas logo={logo} />
      </div>
    </div>
  );
};

export default LogoEditor;

