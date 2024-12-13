import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropleft, IoMdArrowDropright, IoMdArrowDropup } from "react-icons/io";


const ButtonArrow = ({ type, clickFunction, touchEnd, direction }) => {
  const [isPressed, setIsPressed] = useState(false);



  const arrowLogo = (direction) => {
    switch (direction) {
      case 'up':
        return <IoMdArrowDropup size={30} />;
      case 'left':
        return <IoMdArrowDropleft size={30} />;
      case 'right':
        return <IoMdArrowDropright size={30} />;
      case 'down':
        return <IoMdArrowDropdown size={30} />;
      default:
        return null;
    }
  };


  const baseStyle = {
    backgroundColor: isPressed ? '#5a5c5d' : '#424344',
    borderRadius: '7px',
    border: '2px solid black',
    color: '#000000',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    boxShadow: isPressed ? "" : '0 2px 4px rgba(0, 0, 0, 0.7)',
    touchAction: 'manipulation',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitUserDrag: 'none',
    userDrag: 'none',
    WebkitTouchCallout: 'none',
  };

  const verticalStyle = {
    ...baseStyle,
    width: '2.3rem',
    height: '3.2rem',
  };

  const horizontalStyle = {
    ...baseStyle,
    width: '3.2rem',
    height: '2rem',
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
    style={type === 'horizontal' ? horizontalStyle : verticalStyle}
    onTouchStart={handlePressStart}
    onTouchEnd={handlePressEnd}
    onTouchCancel={handlePressEnd}

    // onMouseDown={handlePressStart}
    // onMouseUp={handlePressEnd}
    // onMouseLeave={handlePressEnd}
    > {arrowLogo(direction)} 
    </button>

    
  );
};

export default ButtonArrow;