
import React, { useState, useEffect, useRef } from 'react';
import usePongGame from './usePongGame';
import BlockRenderer from '../shared/BlockRenderer';
import PongMovementControl from './PongMovementControl';

const PongGameMobile = ({
  bgColor,
  blockSize,
  setGameControls,
  setScreenStatus,
  setOptionList,
}) => {
  const desktopPong = false;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Update dimensions on mount and when blockSize changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: Math.floor(clientWidth / blockSize) * blockSize,
          height: Math.floor(clientHeight / blockSize) * blockSize,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [blockSize]);

  const blockColumns = dimensions.width / blockSize;
  const blockRows = dimensions.height / blockSize;

  const {
    paddle,
    handleMoveLeft,
    handleMoveRight,
    resetGame,
    ball,
    score,
  } = usePongGame(
    blockColumns,
    blockRows,
    setScreenStatus,
    setOptionList,
    desktopPong
  );

  // CONTAINER RENDER SETTINGS //
  const screenStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    height: '90%',
  };

  // BLOCK RENDER SETTINGS //
  const blocks = [];

  // Only render blocks if paddle and ball are initialized
  if (paddle) {
    // Paddle Blocks
    paddle.body.forEach((block) => {
      blocks.push({
        x: block.x,
        y: block.y,
        color: '#60345b', // Paddle color
      });
    });
  }

  if (ball) {
    // Ball Block
    blocks.push({
      x: ball.x,
      y: ball.y,
      color: 'rgba(237, 233, 157, 0.5)', // Ball color
      renderBorderRadius: '50%',
    });
  }

  return (
    <div className="game-container-mobile">
      <div className="pong-stats">Score: {score}</div>
      <div style={screenStyle} ref={containerRef}>
        <BlockRenderer
          rows={blockRows || 0}
          columns={blockColumns || 0}
          blockSize={blockSize}
          blocks={blocks}
        />
      </div>
      <PongMovementControl
        setGameControls={setGameControls}
        handleMoveLeft={handleMoveLeft}
        handleMoveRight={handleMoveRight}
        resetGame={resetGame}
      />
    </div>
  );
};

export default PongGameMobile;