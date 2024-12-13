import React, { useState, useEffect, useRef } from 'react';
import useSnakeGame from './useSnakeGame';
import BlockRenderer from '../shared/BlockRenderer';
import SnakeMovementControl from './SnakeMovementControl';

const SnakeGame = ({ blockSize, updateScreen, setDisplayScore }) => {
  const desktopSnake = true;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const blockColumns = dimensions.width / blockSize;
  const blockRows = dimensions.height / blockSize;

  const {
    snake,
    food,
    setDimensions: setGameDimensions,
    changeDirection,
    resetGame,
    score,
    gameOver,
  } = useSnakeGame({ dimensionX: blockColumns, dimensionY: blockRows, desktopSnake });

  useEffect(() => {
    setGameDimensions({
      dimensionX: blockColumns,
      dimensionY: blockRows,
    });
  }, [blockColumns, blockRows, setGameDimensions]);

  
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


  // TRIGGER GAMEOVER SCREEN IN ARCADE MACHINE
  useEffect(() => {
    if (gameOver === true) {
      setDisplayScore(score);
      updateScreen('gameover');
    }
  }, [gameOver]);


  // CONTAINER RENDER SETTINGS // 
  const screenStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: '100%',
    height: '90%'
  };

  // BLOCK RENDER SETTINGS //
  const blocks = [];

  // Snake Blocks
  snake.body.forEach(segment => {
    blocks.push({
      x: segment.x,
      y: segment.y,
      color: 'rgba(230, 230, 255, 0.7)', // Snake color
    });
  });

  // Food Blocks
  blocks.push({
    x: food.positionX,
    y: food.positionY,
    color: 'rgba(237, 233, 157, 0.5)', // Food color
  });


  return (
    <div className='game-container-desktop'>
      <div className='snake-stats-desktop'> Score: {score}</div>
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
        score={score}
        food={food}
        snake={snake}
        desktopSnake={desktopSnake}
      />

    </div>
  );
};

export default SnakeGame;
