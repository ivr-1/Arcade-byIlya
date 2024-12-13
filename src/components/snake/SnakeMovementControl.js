import { useEffect, useCallback } from 'react';

function SnakeMovementControl({ changeDirection, resetGame, setGameControls, desktopSnake, food, snake }) {
  // DESKTOP CONTROLS
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          changeDirection('up');
          break;
        case 'ArrowDown':
          changeDirection('down');
          break;
        case 'ArrowLeft':
          changeDirection('left');
          break;
        case 'ArrowRight':
          changeDirection('right');
          break;
        case ' ':
          changeDirection(null);
          break;
        case 'r':
          resetGame();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeDirection, resetGame]);

  // MOBILE CONTROLS
  const memoizedChangeDirection = useCallback(
    (direction) => {
      changeDirection(direction);
    },
    [changeDirection]
  );

  const memoizedResetGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  // Memoize gameControls object
  const gameControls = useCallback(
    {
      up: () => memoizedChangeDirection('up'),
      down: () => memoizedChangeDirection('down'),
      left: () => memoizedChangeDirection('left'),
      right: () => memoizedChangeDirection('right'),
      A: () => {},
      B: () => {},
      restart: memoizedResetGame,
    },
    [memoizedChangeDirection, memoizedResetGame]
  );

  useEffect(() => {
    if (!desktopSnake) {
      setGameControls(gameControls);
    }
  }, [food, snake]);

  return null;
}

export default SnakeMovementControl;