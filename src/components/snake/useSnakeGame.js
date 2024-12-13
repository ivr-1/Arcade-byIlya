import { useState, useEffect } from 'react';

function useSnakeGame({ dimensionX, dimensionY, setScreenStatus, setOptionList, desktopSnake}) {
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState({
    body: [{x: 1, y: 5}],
    speed: 150,
    direction: null,
    alive: true,
  });
  const [food, setFood] = useState({
    positionX: 4,
    positionY: 4,
  });
  
  const [dimensions, setDimensions] = useState({
    dimensionX,
    dimensionY,
  });
  const [growing, setGrowing] = useState(false);
  const score = (snake.body.length - 1) * 100;

  // LOGIC OF GOING SNAKE THROUGH THE WALLS
  useEffect(() => {
    const head = snake.body[0];
    if (head.x < 0) {
      setSnake(prev => ({
        ...prev,
        body: [{ x: dimensions.dimensionX - 1, y: head.y }, ...prev.body.slice(1)]
      }));
    } else if (head.x >= dimensions.dimensionX) {
      setSnake(prev => ({
        ...prev,
        body: [{ x: 0, y: head.y }, ...prev.body.slice(1)]
      }));
    }
    if (head.y < 0) {
      setSnake(prev => ({
        ...prev,
        body: [{ x: head.x, y: dimensions.dimensionY - 1 }, ...prev.body.slice(1)]
      }));
    } else if (head.y >= dimensions.dimensionY) {
      setSnake(prev => ({
        ...prev,
        body: [{ x: head.x, y: 0 }, ...prev.body.slice(1)]
      }));
    }
  }, [snake.body, dimensions.dimensionX, dimensions.dimensionY]);

  // SNAKE MOVEMENT BASED ON SET DIRECTION
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSnake(prev => {
        const newHead = { ...prev.body[0] };
        switch (prev.direction) {
          case "up":
            newHead.y -= 1;
            break;
          case "down":
            newHead.y += 1;
            break;
          case "left":
            newHead.x -= 1;
            break;
          case "right":
            newHead.x += 1;
            break;
          default:
            return prev;
        }
        if (growing) {
          setGrowing(false);
          return {
            ...prev,
            body: [newHead, ...prev.body]
          };
        } else {
          return {
            ...prev,
            body: [newHead, ...prev.body.slice(0, -1)]
          };
        }
      });
    }, snake.speed);
    return () => clearInterval(intervalId);
  }, [snake.speed, growing]);

  // LOGIC FOR SNAKE EATING FOOD AND GROWING
  useEffect(() => {
    const head = snake.body[0];
    if (head.x === food.positionX && head.y === food.positionY) {
      setFood(prev => ({
        ...prev,
        positionX: Math.floor((Math.random() * dimensions.dimensionX)),
        positionY: Math.floor((Math.random() * dimensions.dimensionY))
      }));
      setGrowing(true);
    }
  }, [snake.body, food.positionX, food.positionY, dimensions.dimensionX, dimensions.dimensionY]);

  // LOGIC FOR SNAKE DYING
  const GameOverMenu = {
    header: "Game Over",
    subheader: `Final Score: ${score}`,
    options: [
      { optionName: 'Try Again', optionPath: 'SnakeGame' },
      { optionName: 'Exit', optionPath: 'Welcome' },
    ]
  };

  useEffect(() => {
    const head = snake.body[0];
    if (snake.body.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
    }
  }, [snake.body]);

  useEffect(() => {
    if (gameOver === true && desktopSnake === false) {
      setSnake(prev => ({ ...prev, alive: false, direction: null }));
      resetGame();
      setOptionList(GameOverMenu);
      setScreenStatus("Menu");
    }
  }, [gameOver, setOptionList, setScreenStatus, desktopSnake]);

  const changeDirection = (newDirection) => {
    setSnake(prev => {
      const isValidDirection = (
        (newDirection === 'up' && prev.direction !== 'down') ||
        (newDirection === 'down' && prev.direction !== 'up') ||
        (newDirection === 'left' && prev.direction !== 'right') ||
        (newDirection === 'right' && prev.direction !== 'left') ||
        newDirection === null
      );
      return isValidDirection ? {
        ...prev,
        direction: newDirection
      } : prev;
    });
  };

  function resetGame() {
    setFood(prev => ({
      ...prev,
      positionX: Math.floor((Math.random() * dimensions.dimensionX)),
      positionY: Math.floor((Math.random() * dimensions.dimensionY))
    }));
    setSnake(prev => ({
      ...prev,
      body: [{
        x: Math.floor(Math.random() * dimensions.dimensionX),
        y: Math.floor(Math.random() * dimensions.dimensionY)
      }],
      speed: 150,
      direction: null,
      alive: true,
    }));
    setGameOver(false);
    setGrowing(false);
  }

  return {
    snake,
    setSnake,
    food,
    setFood,
    dimensions,
    setDimensions,
    changeDirection,
    resetGame,
    score,
    gameOver
  };
}

export default useSnakeGame;