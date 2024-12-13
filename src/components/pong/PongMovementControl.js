import React, { useEffect, useRef, useCallback, useMemo } from 'react';

function PongMovementControl({
  handleMoveRight,
  handleMoveLeft,
  resetGame,
  setGameControls,
  desktopPong,
}) {

  const intervalRefLeft = useRef(null);
  const intervalRefRight = useRef(null);

  const startMovingLeft = useCallback(() => {
    if (!intervalRefLeft.current) {
      intervalRefLeft.current = setInterval(() => {
        handleMoveLeft();
      }, 100);
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
      }, 70);
    }
  }, [handleMoveRight]);

  const stopMovingRight = useCallback(() => {
    if (intervalRefRight.current) {
      clearInterval(intervalRefRight.current);
      intervalRefRight.current = null;
    }
  }, []);

  // DESKTOP CONTROLS
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          handleMoveLeft();
          break;
        case 'ArrowRight':
          handleMoveRight();
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
  }, [handleMoveLeft, handleMoveRight, resetGame]);

  // MOBILE CONTROLS
  const gameControls = useMemo(
    () => ({
      up: () => {},
      down: () => {},
      left: startMovingLeft,
      leftTouchEnd: stopMovingLeft,
      right: startMovingRight,
      rightTouchEnd: stopMovingRight,
      A: () => {},
      B: () => {},
      restart: resetGame,
    }),
    [
      startMovingLeft,
      stopMovingLeft,
      startMovingRight,
      stopMovingRight,
      resetGame,
    ]
  );

  useEffect(() => {
    if (!desktopPong) {
      setGameControls(gameControls);
    }
  }, [desktopPong, setGameControls, gameControls]);

  return null;
}

export default React.memo(PongMovementControl);