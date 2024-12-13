import { useState, useEffect, useCallback, useRef } from 'react';

function useTetrisGame(blockColumns, blockRows, setScreenStatus, setOptionList) {
  const [speed, setSpeed] = useState(700);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [clutter, setClutter] = useState([]);
  const [score, setScore] = useState(0);
  const [speedBuffer, setSpeedBuffer] = useState(speed);

  const shapes = {
    square: {
      rotations: [
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
      ],
      color: 'rgba(255, 193, 7, 0.4)', // Amber (darker yellow) with opacity
    },
    line: {
      rotations: [
        [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
        [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }],
      ],
      color: 'rgba(33, 150, 243, 0.4)', // Blue with opacity
    },
    t: {
      rotations: [
        [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
        [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
        [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
      ],
      color: 'rgba(156, 39, 176, 0.4)', // Purple with opacity
    },
    gRight: {
      rotations: [
        [{ x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
        [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }],
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
      ],
      color: 'rgba(255, 87, 34, 0.4)', // Deep Orange with opacity
    },
    zRight: {
      rotations: [
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
      ],
      color: 'rgba(76, 175, 80, 0.4)', // Green with opacity
    },
    zLeft: {
      rotations: [
        [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
        [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
      ],
      color: 'rgba(233, 30, 99, 0.4)', // Pink with opacity
    },
  };

  const [tetrisShape, setTetrisShape] = useState(() => {
    const randomName = Object.keys(shapes)[Math.floor(Math.random() * Object.keys(shapes).length)];
    return {
      name: randomName,
      rotation: 0,
      position: { x: Math.floor(blockColumns / 2) - 1, y: -2 },
      color: shapes[randomName].color,
    };
  });

  // Helper function to compute the body blocks based on shape's position and rotation
  function getBody(shape) {
    return shapes[shape.name].rotations[shape.rotation].map(block => ({
      x: block.x + shape.position.x,
      y: block.y + shape.position.y,
    }));
  }

  // Checks collision for a given shape
  function isCollision(shape) {
    const newPosition = getBody(shape);
    return newPosition.some(segment =>
      segment.y >= blockRows ||
      segment.x < 0 ||
      segment.x >= blockColumns ||
      clutter.some(clutterPiece =>
        clutterPiece.x === segment.x && clutterPiece.y === segment.y
      )
    );
  }

  // Generates a new random shape
  function randomShape() {
    const shapeNames = Object.keys(shapes);
    const randomName = shapeNames[Math.floor(Math.random() * shapeNames.length)];
    const initialPosition = { x: Math.floor(blockColumns / 2) - 1, y: -2 };
    return {
      name: randomName,
      rotation: 0,
      position: initialPosition,
      color: shapes[randomName].color,
    };
  }

  // Game Over Menu configuration
  const GameOverMenu = {
    header: "Game Over",
    subheader: `Final Score: ${score}`,
    options: [
      { optionName: 'Try Again', optionPath: 'TetrisGame' },
      { optionName: 'Exit', optionPath: 'Welcome' },
    ],
  };

  // Check for game over condition
  useEffect(() => {
    if (clutter.some(piece => piece.y < 0)) {
      setGameOver(true);
    }
  }, [clutter]);

  // Handle game over state
  useEffect(() => {
    if (gameOver) {
      if (typeof setOptionList === 'function') {
        setOptionList(GameOverMenu);
      }
      if (typeof setScreenStatus === 'function') {
        setScreenStatus("Menu");
      }
    }
  }, [gameOver]);

  // Handle shapes falling and turning into clutter
  useEffect(() => {
    if (gameOver) return;
    const intervalId = setInterval(() => {
      setTetrisShape(prevShape => {
        const newPosition = { x: prevShape.position.x, y: prevShape.position.y + 1 };
        const newShape = { ...prevShape, position: newPosition };
        if (!isCollision(newShape)) {
          return newShape;
        } else {
          const body = getBody(prevShape);
          setClutter(prevClutter => [
            ...prevClutter,
            ...body.map(block => ({ ...block, color: prevShape.color })),
          ]);
          return randomShape();
        }
      });
    }, speed);

    return () => clearInterval(intervalId);
  }, [speed, blockRows, blockColumns, clutter, gameOver]);

  // Handle clutter row destruction and speed increase
  useEffect(() => {
    if (gameOver) return;
    const destroyClutter = () => {
      let newClutter = [...clutter];
      let rowsDestroyed = 0;
      for (let y = blockRows - 1; y >= 0; y--) {
        const row = newClutter.filter(piece => piece.y === y);
        if (row.length === blockColumns) {
          newClutter = newClutter.filter(piece => piece.y !== y);
          newClutter = newClutter.map(piece =>
            piece.y < y ? { ...piece, y: piece.y + 1 } : piece
          );
          rowsDestroyed++;
          y++;
        }
      }
      if (rowsDestroyed > 0) {
        setClutter(newClutter);
        setScore(prevScore => {
          const newScore = prevScore + rowsDestroyed * 10;
          if (newScore % 3 === 0 && newScore > 0) {
            // Increase speed
            setLevel(prevLevel => prevLevel + 1);
            setSpeed(prevSpeed => {
              if (prevSpeed > 500) return prevSpeed - 150;
              if (prevSpeed > 100) return prevSpeed - 50;
              return prevSpeed;
            });
          }
          return newScore;
        });
      }
    };
    destroyClutter();
  }, [clutter, blockColumns, blockRows, gameOver]);

  // Handle shape rotation (flip)
  function flip() {
    setTetrisShape(prevShape => {
      const { name, rotation, position } = prevShape;
      const maxRotations = shapes[name].rotations.length;
      const newRotation = (rotation + 1) % maxRotations;
      const kicks = [
        { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 },
        { x: -1, y: -1 }, { x: 1, y: -1 },
      ];
      for (let kick of kicks) {
        const newPosition = {
          x: position.x + kick.x,
          y: position.y + kick.y,
        };
        const newShape = {
          ...prevShape,
          rotation: newRotation,
          position: newPosition,
        };
        if (!isCollision(newShape)) {
          return newShape;
        }
      }
      // If all wall kicks fail, return the original shape
      return prevShape;
    });
  }

  // Handle horizontal movement
  function handleMove(direction) {
    setTetrisShape(prevShape => {
      const newPosition = { x: prevShape.position.x + direction, y: prevShape.position.y };
      const newShape = {
        ...prevShape,
        position: newPosition,
      };
      if (!isCollision(newShape)) {
        return newShape;
      }
      return prevShape;
    });
  }

  function handleMoveRight() {
    handleMove(1);
  }

  function handleMoveLeft() {
    handleMove(-1);
  }

  // Handle speed adjustments when dropping the shape faster
  const isSpeedUpPressedRef = useRef(false);
  const handleSpeedUp = useCallback(() => {
    if (!isSpeedUpPressedRef.current) {
      isSpeedUpPressedRef.current = true;
      setSpeedBuffer(speed);
      setSpeed(100);
    }
  }, [speed]);

  const handleSpeedDown = useCallback(() => {
    if (isSpeedUpPressedRef.current) {
      isSpeedUpPressedRef.current = false;
      setSpeed(speedBuffer);
    }
  }, [speedBuffer]);

  // Reset the game to initial state
  function resetGame() {
    setClutter([]);
    setScore(0);
    setLevel(1);
    setSpeed(700);
    setGameOver(false);
    setTetrisShape(randomShape());
  }

  return {
    handleMoveRight,
    handleMoveLeft,
    handleSpeedDown,
    handleSpeedUp,
    flip,
    clutter,
    setClutter,
    tetrisShape,
    setTetrisShape,
    getBody,
    score,
    setScore,
    setSpeed,
    speed,
    resetGame,
    level,
    gameOver,
  };
}

export default useTetrisGame;
