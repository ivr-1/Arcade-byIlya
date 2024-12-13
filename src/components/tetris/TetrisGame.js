import React, { useRef, useEffect, useState } from 'react';
import useTetrisGame from './useTetrisGame';
import BlockRenderer from '../shared/BlockRenderer';
import TetrisMovementControl from './TetrisMovementControl'

const TetrisGame = ({ bgColor, updateScreen, setDisplayScore }) => {
  const desktopTetris = true
  const blockRows = 20;
  const blockColumns = 10;
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, blockSize: 0 });
  const {
    tetrisShape,
    clutter,
    handleMoveRight,
    handleMoveLeft,
    handleSpeedDown,
    handleSpeedUp,
    score,
    flip,
    setSpeed,
    speed,
    resetGame,
    level,
    gameOver,
    getBody,
  } = useTetrisGame(blockColumns, blockRows);

  // TRIGGER GAMEOVER SCREEN IN ARCADE MACHINE
  useEffect(() => {
    if (gameOver) {
      setDisplayScore(score);
      updateScreen('gameover');
    }
  }, [gameOver, updateScreen]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const newBlockSize = Math.floor(
          Math.min(containerHeight / blockRows, containerWidth / blockColumns)
        );
        setDimensions({
          width: newBlockSize * blockColumns,
          height: newBlockSize * blockRows,
          blockSize: newBlockSize
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

    // CONTAINER RENDER SETTINGS //
    const screenStyle = {
      display: "flex",
      flexDirection: 'Row',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: bgColor,
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

    // Default Blocks
    const renderBorder = '1px solid rgba(255, 255, 255, 0.1)';
    const renderBlockBorder = '1px solid rgba(0, 0, 0, 0.3)';
  
    // Clutter Blocks
    clutter.forEach((block) => {
      blocks.push({
        x: block.x,
        y: block.y,
        color: block.color,
      });
    });

    // TetrisShape Blocks
    const shapeBody = getBody(tetrisShape);
    shapeBody.forEach((block) => {
      blocks.push({
        x: block.x,
        y: block.y,
        color: tetrisShape.color,
      });
    });


  return (
    <div ref={containerRef} style={screenStyle} >
      <div style={gameStyle}>

        <BlockRenderer
          rows={blockRows}
          columns={blockColumns}
          blockSize={dimensions.blockSize}
          blocks={blocks} 
          renderBorder={renderBorder}
          renderBlockBorder={renderBlockBorder}
        />
        
      </div>
      <div className='tetris-stats-desktop'>
        <div className='tetris-level'> Level {level} </div>
        <div>Score:{score}</div>
      </div>
      <TetrisMovementControl
        rows={blockRows}
        columns={blockColumns}
        handleMoveRight={handleMoveRight}
        handleMoveLeft={handleMoveLeft}
        handleSpeedUp={handleSpeedUp}
        handleSpeedDown={handleSpeedDown}
        score={score}
        flip={flip}
        setSpeed={setSpeed}
        speed={speed}
        resetGame={resetGame}
        desktopTetris = {desktopTetris}
      />
    </div>
  );
};

export default TetrisGame;