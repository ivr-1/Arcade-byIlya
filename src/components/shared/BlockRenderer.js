
import React from 'react';

function BlockRenderer({
  rows,
  columns,
  blockSize,
  blocks,
  renderBorder,
  renderBlockBorder,
  renderBorderRadius,
}) {
  const Block = ({
    x,
    y,
    size,
    color,
    renderBlockBorder,
    renderBorderRadius,
  }) => {
    const baseStyle = {
      position: 'absolute',
      left: `${x * size}px`,
      top: `${y * size}px`,
      width: `${size - 2}px`,
      height: `${size - 2}px`,
      backgroundColor: color,
      borderRadius: renderBorderRadius || '0%',
      border: renderBlockBorder || '1px solid rgba(0, 0, 0, 0.1)',
    };
    return <div style={baseStyle} />;
  };


  const gridBackground = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      gridBackground.push(
        <div
          key={`grid-${x}-${y}`}
          style={{
            position: 'absolute',
            left: `${x * blockSize}px`,
            top: `${y * blockSize}px`,
            width: `${blockSize - 2}px`,
            height: `${blockSize - 2}px`,
            backgroundColor: 'transparent',
            border: renderBorder || '1px solid rgba(0, 0, 0, 0.1)',
          }}
        />
      );
    }
  }

  const renderedBlocks = blocks.map((block, index) => (
    <Block
      key={`block-${block.x}-${block.y}-${index}`}
      x={block.x}
      y={block.y}
      size={blockSize}
      color={block.color}
      renderBlockBorder={renderBlockBorder}
      renderBorderRadius={block.renderBorderRadius || renderBorderRadius}
    />
  ));

  return (
    <div
      style={{
        position: 'relative',
        width: `${columns * blockSize}px`,
        height: `${rows * blockSize}px`,
        boxSizing: 'content-box',
      }}
    >
      {gridBackground}
      {renderedBlocks}
    </div>
  );
}

export default BlockRenderer;