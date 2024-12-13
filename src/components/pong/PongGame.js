// PongGame.js
import React, { useState, useEffect, useRef } from 'react';
import usePongGame from './usePongGame';
import BlockRenderer from '../shared/BlockRenderer';
import PongMovementControl from './PongMovementControl';

const PongGame = ({ blockSize, updateScreen, setDisplayScore }) => {
  const desktopPong = true;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const newWidth = Math.floor(clientWidth / blockSize) * blockSize;
        const newHeight = Math.floor(clientHeight / blockSize) * blockSize;
        setDimensions({
          width: newWidth,
          height: newHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [blockSize]);

  const blockColumns = dimensions.width / blockSize;
  const blockRows = dimensions.height / blockSize;

  // Always call usePongGame, but handle uninitialized state inside
  const {
    paddle,
    handleMoveLeft,
    handleMoveRight,
    ball,
    resetGame,
    score,
    gameOver,
  } = usePongGame(
    blockColumns,
    blockRows,
    updateScreen,
    setDisplayScore,
    desktopPong
  );

  // TRIGGER GAMEOVER SCREEN IN ARCADE MACHINE
  useEffect(() => {
    if (gameOver) {
      setDisplayScore(score);
      updateScreen('gameover');
    }
  }, [gameOver, score, setDisplayScore, updateScreen]);

  // CONTAINER RENDER SETTINGS //
  const screenStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  };

  const gameStyle = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    overflow: 'hidden',
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
        color: 'rgba(255, 128, 255, 0.5)', // Paddle color
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
    <div className="game-container-desktop">
      <div className="pong-stats-desktop">Score: {score}</div>
      <div style={screenStyle} ref={containerRef}>
        <div style={gameStyle}>
          <BlockRenderer
            rows={blockRows || 0}
            columns={blockColumns || 0}
            blockSize={blockSize}
            blocks={blocks}
          />
        </div>
      </div>
      <PongMovementControl
        handleMoveLeft={handleMoveLeft}
        handleMoveRight={handleMoveRight}
        resetGame={resetGame}
        desktopPong={desktopPong}
      />
    </div>
  );
};

export default PongGame;