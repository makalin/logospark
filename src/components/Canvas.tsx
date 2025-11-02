import React from 'react';
import type { Logo } from './LogoEditor';

interface CanvasProps {
  logo: Logo;
}

const Canvas: React.FC<CanvasProps> = ({ logo }) => {
  const renderShape = () => {
    if (!logo.showShape) return null;

    const halfSize = logo.shape.size / 2;
    const transform = `rotate(${logo.shape.rotation} 0 0)`;

    const gradientId = 'shapeGradient';
    const gradientDef = logo.shape.gradient ? (
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={logo.shape.gradientColors.start} />
          <stop offset="100%" stopColor={logo.shape.gradientColors.end} />
        </linearGradient>
      </defs>
    ) : null;

    const fillColor = logo.shape.gradient ? `url(#${gradientId})` : logo.shape.color;
    const strokeProps = logo.shape.strokeWidth > 0 ? {
      stroke: logo.shape.strokeColor,
      strokeWidth: logo.shape.strokeWidth,
    } : {};

    let shapeElement = null;

    switch (logo.shape.type) {
      case 'circle':
        shapeElement = (
          <circle
            cx="0"
            cy="0"
            r={halfSize}
            fill={fillColor}
            transform={transform}
            {...strokeProps}
          />
        );
        break;
      case 'square':
        shapeElement = (
          <rect
            x={-halfSize}
            y={-halfSize}
            width={logo.shape.size}
            height={logo.shape.size}
            fill={fillColor}
            transform={transform}
            {...strokeProps}
          />
        );
        break;
      case 'rectangle':
        shapeElement = (
          <rect
            x={-halfSize}
            y={-halfSize * 0.7}
            width={logo.shape.size}
            height={logo.shape.size * 0.7}
            fill={fillColor}
            transform={transform}
            {...strokeProps}
          />
        );
        break;
      case 'triangle':
        const triangleSize = logo.shape.size / 2;
        const trianglePoints = [
          `0,${-triangleSize}`,
          `${-triangleSize},${triangleSize}`,
          `${triangleSize},${triangleSize}`,
        ].join(' ');
        shapeElement = (
          <polygon
            points={trianglePoints}
            fill={fillColor}
            transform={transform}
            {...strokeProps}
          />
        );
        break;
      case 'hexagon':
        const hexSize = logo.shape.size / 2;
        const hexPoints = Array.from({ length: 6 }, (_, i) => {
          const angle = (Math.PI / 3) * i;
          const x = hexSize * Math.cos(angle);
          const y = hexSize * Math.sin(angle);
          return `${x},${y}`;
        }).join(' ');
        shapeElement = (
          <polygon
            points={hexPoints}
            fill={fillColor}
            transform={transform}
            {...strokeProps}
          />
        );
        break;
      case 'star':
        const starOuterRadius = logo.shape.size / 2;
        const starInnerRadius = starOuterRadius * 0.4;
        const starPoints = Array.from({ length: 10 }, (_, i) => {
          const angle = (Math.PI / 5) * i - Math.PI / 2;
          const radius = i % 2 === 0 ? starOuterRadius : starInnerRadius;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          return `${x},${y}`;
        }).join(' ');
        shapeElement = (
          <polygon
            points={starPoints}
            fill={fillColor}
            transform={transform}
            {...strokeProps}
          />
        );
        break;
      default:
        return null;
    }

    return (
      <>
        {gradientDef}
        {shapeElement}
      </>
    );
  };

  const getTextShadowFilter = () => {
    if (!logo.textStyle.shadow) return null;
    return (
      <defs>
        <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx={logo.textStyle.shadowOffset}
            dy={logo.textStyle.shadowOffset}
            stdDeviation="2"
            floodColor={logo.textStyle.shadowColor}
            floodOpacity="0.8"
          />
        </filter>
      </defs>
    );
  };

  const textTransform = logo.rotation !== 0 ? `rotate(${logo.rotation} 200 200)` : '';

  // Calculate positions based on layout
  const getLayoutPositions = () => {
    const svgWidth = 400;
    const svgHeight = 400;

    switch (logo.layout) {
      case 'top':
        return {
          iconX: svgWidth / 2,
          iconY: svgHeight / 3,
          textX: svgWidth / 2,
          textY: svgHeight / 2 + 30,
          taglineX: svgWidth / 2,
          taglineY: svgHeight / 2 + 60,
        };
      case 'left':
        return {
          iconX: svgWidth / 3,
          iconY: svgHeight / 2,
          textX: svgWidth / 2 + svgWidth / 6,
          textY: svgHeight / 2 - 10,
          taglineX: svgWidth / 2 + svgWidth / 6,
          taglineY: svgHeight / 2 + 20,
        };
      case 'right':
        return {
          iconX: (svgWidth / 3) * 2,
          iconY: svgHeight / 2,
          textX: svgWidth / 3,
          textY: svgHeight / 2 - 10,
          taglineX: svgWidth / 3,
          taglineY: svgHeight / 2 + 20,
        };
      case 'center':
      default:
        return {
          iconX: svgWidth / 2,
          iconY: svgHeight / 2,
          textX: svgWidth / 2,
          textY: svgHeight / 2,
          taglineX: svgWidth / 2,
          taglineY: svgHeight / 2 + 35,
        };
    }
  };

  const positions = getLayoutPositions();

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
      <svg
        id="logo-svg"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="bg-white shadow-xl rounded-lg"
        style={{
          backgroundColor: logo.colors.background === 'transparent' ? 'none' : logo.colors.background,
        }}
      >
        <rect width="400" height="400" fill={logo.colors.background === 'transparent' ? 'none' : logo.colors.background} />
        {getTextShadowFilter()}
        
        {/* Render shape/icon at calculated position */}
        <g transform={`translate(${positions.iconX}, ${positions.iconY})`}>
          {renderShape()}
        </g>
        
        {/* Main text */}
        <text
          x={positions.textX}
          y={positions.textY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={logo.colors.primary}
          fontSize={logo.fontSize}
          fontFamily={logo.fontFamily}
          fontWeight={logo.textStyle.bold ? 'bold' : 'normal'}
          fontStyle={logo.textStyle.italic ? 'italic' : 'normal'}
          filter={logo.textStyle.shadow ? 'url(#textShadow)' : undefined}
          transform={textTransform}
        >
          {logo.text}
        </text>
        
        {/* Tagline */}
        {logo.tagline && (
          <text
            x={positions.taglineX}
            y={positions.taglineY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={logo.colors.accent}
            fontSize={logo.taglineSize}
            fontFamily={logo.fontFamily}
            fontStyle="normal"
            opacity="0.8"
          >
            {logo.tagline}
          </text>
        )}
      </svg>
    </div>
  );
};

export default Canvas;
