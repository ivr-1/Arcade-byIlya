import React from 'react';

const POSITIONS = ['left', 'center', 'right'];

function SideButtons({ setTargetMachine, focusMachine, currentPosition }) {
  const currentIndex = POSITIONS.indexOf(currentPosition);

  const handleMove = (direction) => {
    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    const newPosition = POSITIONS[newIndex];
    setTargetMachine(newPosition);
    focusMachine(newPosition);
  };

  return (
    <div className='side-buttons-container'>
      {currentIndex > 0 ? (
        <button className='side-button' onClick={() => handleMove('left')}>
          ←
        </button>) : <div></div>
      }
      {currentIndex < POSITIONS.length - 1 && (
        <button className='side-button' onClick={() => handleMove('right')}>
          →
        </button>
      )}
    </div>
  );
}

export default SideButtons;