import React, { useState } from "react";

const ButtonCircle = ({ buttonText, clickFunction, touchEnd }) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '3rem',
    height: '3rem',
    backgroundColor: isPressed ? '#5a5c5d' : '#424344',
    border: '2px solid black',
    borderRadius: '33px',
    cursor: 'pointer',
    color: 'rgb(148, 144, 144)',
    fontSize: '1.4rem',
    boxShadow: isPressed ? "" : '0 2px 4px rgba(0, 0, 0, 0.7)',
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
    if (clickFunction) clickFunction(); 
  };

  const handlePressEnd = () => {
    setIsPressed(false); 
    if(touchEnd)touchEnd();}

  return (
    <button
      style={buttonStyle}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
      aria-label={buttonText}

      // onMouseDown={handlePressStart}
      // onMouseUp={handlePressEnd}
      // onMouseLeave={handlePressEnd}
    >
      {buttonText}
    </button>
  );
};

export default ButtonCircle;