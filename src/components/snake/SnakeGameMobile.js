import React, { useState, useEffect, useRef } from 'react';
import useSnakeGame from './useSnakeGame';
import BlockRenderer from '../shared/BlockRenderer';
import SnakeMovementControl from './SnakeMovementControl';

const SnakeGameMobile = ({ blockSize, setGameControls, setScreenStatus, setOptionList }) => {
  const desktopSnake = false
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
  } = useSnakeGame({ dimensionX: blockColumns, dimensionY: blockRows, setScreenStatus, setOptionList, desktopSnake });

  useEffect(() => {
    setGameDimensions({
      dimensionX: blockColumns,
      dimensionY: blockRows,
    });
  }, [blockColumns, blockRows, setGameDimensions]);

    // CONTAINER RENDER SETTINGS // 
  const screenStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
    marginLeft: '-1.5vw',
    width: '100%',
    height: '90%',
    // width: `${screenWidth}px`,
    // height: `${screenHeight}px`,
  };

    // BLOCK RENDER SETTINGS //
    const blocks = [];
  
    // Snake Blocks
    snake.body.forEach(segment => {
      blocks.push({
        x: segment.x,
        y: segment.y,
        color: 'rgba(0, 0, 0, 0.6)', // Snake color
      });
    });
  
    // Food Blocks
    blocks.push({
      x: food.positionX,
      y: food.positionY,
      color: 'rgba(237, 233, 157, 0.5)', // Food color
    });
  

  return (
    <div className='game-container-mobile'>
      <div className='snake-stats'> Score: {score}</div>
      <div style={screenStyle} ref={containerRef}>
        
        <BlockRenderer
          rows={blockRows}
          columns={blockColumns}
          blockSize={blockSize}
          blocks={blocks} 
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

export default SnakeGameMobile;