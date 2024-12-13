import React, { useState } from "react";

const ButtonOval = ({ buttonText, clickFunction }) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '4rem',
    height: '1.5rem',
    backgroundColor: isPressed ? '#5a5c5d' : '#424344',
    border: '1px solid black',
    borderRadius: '33px',
    cursor: 'pointer',
    color: 'rgb(148, 144, 144)',
    fontSize: '0.6rem',
    boxShadow: isPressed ? "" : '0 2px 4px rgba(0, 0, 0, 0.3)',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    touchAction: 'manipulation',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitUserDrag: 'none',
    userDrag: 'none',
    WebkitTouchCallout: 'none',
  };

  const handlePressStart = () => {
    setIsPressed(true);
    if (clickFunction) clickFunction(); // Call the passed function if it exists
  };

  const handlePressEnd = () => setIsPressed(false);

  return (
    <button
      style={buttonStyle}
      aria-label={buttonText}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}

      // onMouseDown={handlePressStart}
      // onMouseUp={handlePressEnd}
      // onMouseLeave={handlePressEnd}
    >
      {buttonText}
    </button>
  );
};

export default ButtonOval;