import React, { useState, useEffect, useRef } from 'react';
import usePongGame from './usePongGame';
import BlockRenderer from '../shared/BlockRenderer';
import PongMovementControl from './PongMovementControl';

const PongGame = ({ bgColor, blockSize, setGameControls, setScreenStatus, setOptionList }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: Math.floor(clientWidth / blockSize) * blockSize,
          height: Math.floor(clientHeight / blockSize) * blockSize
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
    ball,
    resetGame,
    score,
  } = usePongGame(blockColumns, blockRows, setScreenStatus, setOptionList);

  const screenStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgColor,
    width: '100%',
    height: '90%',
  };

  return (
    <div className='game-container-mobile'>
      <div className='pong-stats'>Score: {score}</div>
      <div style={screenStyle} ref={containerRef}>
        <BlockRenderer
          rows={blockRows}
          columns={blockColumns}
          blockSize={blockSize}
          paddle={paddle}
          ball={ball}
          game="pong"
        />
      </div>
      <PongMovementControl
        setGameControls = {setGameControls}
        handleMoveLeft={handleMoveLeft}
        handleMoveRight={handleMoveRight}
        resetGame={resetGame}
      />
    </div>
  );
};

export default PongGame;