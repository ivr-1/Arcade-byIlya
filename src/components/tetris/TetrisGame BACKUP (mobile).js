import React, { useRef, useEffect, useState } from 'react';
import useTetrisGame from './useTetrisGame';
import BlockRenderer from '../shared/BlockRenderer';
import TetrisMovementControl from './TetrisMovementControl'

const TetrisGame = ({ bgColor, setGameControls, setScreenStatus, setOptionList }) => {
  const blockRows = 20;
  const blockColumns = 10;
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, blockSize: 0 });

  const screenStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgColor,
    width: '100%',
    height: '100%',
  };

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
  } = useTetrisGame(blockColumns, blockRows, setScreenStatus, setOptionList);

  const gameStyle = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    overflow: 'hidden',
  };

  return (
    <div className='game-container-mobile' ref={containerRef} style={screenStyle}>
      <div style={gameStyle}>
        <BlockRenderer
          rows={blockRows}
          columns={blockColumns}
          blockSize={dimensions.blockSize}
          clutter={clutter}
          tetrisShape={tetrisShape}
          game="tetris"
        />
      </div>
      <div className='tetris-stats'>
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
        setGameControls={setGameControls}
      />
    </div>
  );
};

export default TetrisGame;