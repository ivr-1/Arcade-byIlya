import React, { useState, useEffect, useRef } from 'react';
import useSnakeGame from './useSnakeGame';
import BlockRenderer from '../shared/BlockRenderer';
import SnakeMovementControl from './SnakeMovementControl';

const SnakeGame = ({ bgColor, blockSize, setGameControls, setScreenStatus, setOptionList }) => {
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
  }, []);

  const blockColumns = dimensions.width / blockSize;
  const blockRows = dimensions.height / blockSize;

  const {
    snake,
    food,
    setDimensions: setGameDimensions,
    changeDirection,
    resetGame,
    score
  } = useSnakeGame({ dimensionX: blockColumns, dimensionY: blockRows, setScreenStatus, setOptionList });

  useEffect(() => {
    setGameDimensions({
      dimensionX: blockColumns,
      dimensionY: blockRows,
    });
  }, [blockColumns, blockRows, setGameDimensions]);

  const screenStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgColor,
    width: '100%',
    height: '90%',
    // width: `${screenWidth}px`,
    // height: `${screenHeight}px`,
  };


  return (
    <div className='game-container-mobile'>
      <div className='snake-stats'> Score: {score}</div>
      <div style={screenStyle} ref={containerRef}>
        <BlockRenderer
          rows={blockRows}
          columns={blockColumns}
          blockSize={blockSize}
          snake={snake}
          food={food}
          game="snake"
        />
   
      </div>
      <SnakeMovementControl
        changeDirection={changeDirection}
        resetGame={resetGame}
        score={snake.body.length - 1}
        setGameControls={setGameControls}
        food={food}
        snake={snake}
      />
    </div>

  );
};

export default SnakeGame;