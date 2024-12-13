import { useEffect, useRef, useCallback } from 'react';

const TetrisMovementControl = ({
  handleMoveRight,
  handleMoveLeft,
  flip,
  handleSpeedUp,
  handleSpeedDown,
  resetGame,
  setGameControls,
  desktopTetris,
}) => {
  /// DESKTOP CONTROLS
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          flip();
          break;
        case 'ArrowLeft':
          handleMoveLeft();
          break;
        case 'ArrowRight':
          handleMoveRight();
          break;
        case 'ArrowDown':
          handleSpeedUp();
          break;
        case 'r':
          resetGame();
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowDown') {
        handleSpeedDown();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
    // Include all dependencies
  }, [flip, handleMoveLeft, handleMoveRight, handleSpeedUp, handleSpeedDown, resetGame]);

  /// MOBILE CONTROLS
  // Use separate refs for left and right intervals
  const intervalRefLeft = useRef(null);
  const intervalRefRight = useRef(null);

  // Wrap functions with useCallback and include dependencies
  const startMovingLeft = useCallback(() => {
    if (!intervalRefLeft.current) {
      intervalRefLeft.current = setInterval(() => {
        handleMoveLeft();
      }, 75);
    }
  }, [handleMoveLeft]);

  const stopMovingLeft = useCallback(() => {
    if (intervalRefLeft.current) {
      clearInterval(intervalRefLeft.current);
      intervalRefLeft.current = null;
    }
  }, []);

  const startMovingRight = useCallback(() => {
    if (!intervalRefRight.current) {
      intervalRefRight.current = setInterval(() => {
        handleMoveRight();
      }, 75);
    }
  }, [handleMoveRight]);

  const stopMovingRight = useCallback(() => {
    if (intervalRefRight.current) {
      clearInterval(intervalRefRight.current);
      intervalRefRight.current = null;
    }
  }, []);

  const gameControls = useCallback(
    {
      up: flip,
      down: handleSpeedUp,
      downTouchEnd: handleSpeedDown,
      left: startMovingLeft,
      leftTouchEnd: stopMovingLeft,
      right: startMovingRight,
      rightTouchEnd: stopMovingRight,
      A: handleSpeedUp,
      ATouchEnd: handleSpeedDown,
      B: flip,
      restart: resetGame,
    },
    [
      flip,
      handleSpeedUp,
      handleSpeedDown,
      startMovingLeft,
      stopMovingLeft,
      startMovingRight,
      stopMovingRight,
      resetGame,
    ]
  );

  useEffect(() => {
    if (!desktopTetris) {
      setGameControls(gameControls);
    }
  }, [desktopTetris, gameControls, setGameControls]);

  return null; // Since this component doesn't render anything
};

export default TetrisMovementControl;