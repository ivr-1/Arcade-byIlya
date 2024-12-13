
import { useEffect, useState, useCallback, useRef } from 'react';

function usePongGame(
  blockColumns,
  blockRows,
  setScreenStatus,
  setOptionList,
  desktopPong
) {
  const initialSpeed = 8;
  const lastUpdateTimeRef = useRef(Date.now());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize paddle and ball only when dimensions are known
  const [paddle, setPaddle] = useState(null);
  const [ball, setBall] = useState(null);

  // Initialize game whenever dimensions change and are valid
  useEffect(() => {
    if (blockColumns > 0 && blockRows > 0) {
      const initializePaddle = () => ({
        body: [
          { x: Math.floor(blockColumns / 2) + 1, y: blockRows - 1 },
          { x: Math.floor(blockColumns / 2), y: blockRows - 1 },
          { x: Math.floor(blockColumns / 2) - 1, y: blockRows - 1 },
        ],
      });
      setPaddle(initializePaddle());
      setBall({
        x: Math.floor(blockColumns / 2),
        y: Math.floor(blockRows / 2),
        dx: (Math.random() < 0.5 ? -1 : 1) * initialSpeed,
        dy: (Math.random() < 0.5 ? -1 : 1) * initialSpeed,
      });
      setScore(0);
      setGameOver(false);
      lastUpdateTimeRef.current = Date.now();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockColumns, blockRows]);

  // Game loop
  useEffect(() => {
    if (!paddle || !ball) return;

    let animationFrameId;
    lastUpdateTimeRef.current = Date.now();

    const updateGame = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTimeRef.current;
      const deltaTimeInSeconds = deltaTime / 800;

      // Update ball position and handle collisions
      setBall((prevBall) => {
        let { x, y, dx, dy } = prevBall;

        // Update position
        x += dx * deltaTimeInSeconds;
        y += dy * deltaTimeInSeconds;

        // Collision with top wall
        if (y <= 0) {
          dy = Math.abs(dy); // Bounce down
          y = 0;
        }

        // Collision with side walls
        if (x <= 0) {
          dx = Math.abs(dx); // Bounce right
          x = 0;
        }
        if (x >= blockColumns - 1) {
          dx = -Math.abs(dx); // Bounce left
          x = blockColumns - 1;
        }

        // Collision with paddle
        const paddleTop = paddle.body[0].y;
        const paddleLeft = paddle.body[paddle.body.length - 1].x;
        const paddleRight = paddle.body[0].x;

        if (dy > 0 && y + 1 >= paddleTop) {
          if (x + 0.5 >= paddleLeft && x - 0.5 <= paddleRight) {
            dy = -Math.abs(dy); // Bounce up
            y = paddleTop - 1; // Position the ball above the paddle

            // Adjust dx based on where it hit the paddle
            const hitPosition =
              (x - paddleLeft) / (paddleRight - paddleLeft || 1);
            if (hitPosition < 0.33) {
              dx = -Math.abs(dx);
            } else if (hitPosition > 0.67) {
              dx = Math.abs(dx);
            }

            setScore((prevScore) => prevScore + 5);
            dx *= 1.05;
            dy *= 1.05;
          }
        }

        // Check if ball fell below the bottom
        if (y > blockRows - 1) {
          setGameOver(true);
          return prevBall;
        }

        return { x, y, dx, dy };
      });

      lastUpdateTimeRef.current = currentTime;
      animationFrameId = requestAnimationFrame(updateGame);
    };

    animationFrameId = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animationFrameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paddle, ball, blockColumns, blockRows]);

  // Game Over Menu
  useEffect(() => {
    if (gameOver && desktopPong === false) {
      const GameOverMenu = {
        header: 'Game Over',
        subheader: `Final Score: ${score}`,
        options: [
          { optionName: 'Try Again', optionPath: 'PongGame' },
          { optionName: 'Exit', optionPath: 'Welcome' },
        ],
      };
      setOptionList(GameOverMenu);
      setScreenStatus('Menu');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  // Handle paddle movement
  const handleMove = useCallback(
    (direction) => {
      if (!paddle) return;
      setPaddle((prevPaddle) => {
        const newBody = prevPaddle.body.map((item) => ({
          ...item,
          x: item.x + direction,
        }));
        if (
          newBody[0].x < blockColumns &&
          newBody[newBody.length - 1].x >= 0
        ) {
          return { ...prevPaddle, body: newBody };
        }
        return prevPaddle;
      });
    },
    [paddle, blockColumns]
  );

  const handleMoveRight = useCallback(() => handleMove(1), [handleMove]);
  const handleMoveLeft = useCallback(() => handleMove(-1), [handleMove]);

  const resetGame = useCallback(() => {
    if (blockColumns > 0 && blockRows > 0) {
      const initializePaddle = () => ({
        body: [
          { x: Math.floor(blockColumns / 2) + 1, y: blockRows - 1 },
          { x: Math.floor(blockColumns / 2), y: blockRows - 1 },
          { x: Math.floor(blockColumns / 2) - 1, y: blockRows - 1 },
        ],
      });
      setPaddle(initializePaddle());
      setBall({
        x: Math.floor(blockColumns / 2),
        y: Math.floor(blockRows / 2),
        dx: (Math.random() < 0.5 ? -1 : 1) * initialSpeed,
        dy: -Math.abs(initialSpeed),
      });
      setScore(0);
      setGameOver(false);
      lastUpdateTimeRef.current = Date.now();
    }
  }, [blockColumns, blockRows]);

  return {
    paddle,
    ball,
    handleMoveLeft,
    handleMoveRight,
    resetGame,
    score,
    gameOver,
  };
}

export default usePongGame;