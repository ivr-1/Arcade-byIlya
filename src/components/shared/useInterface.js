import { useState, useCallback, useEffect } from 'react';

const useInterface = (gameControls) => {
  const [screenStatus, setScreenStatus] = useState("Welcome");
  const [activeSelectionPath, setActiveSelectionPath] = useState("SnakeGame");
  const [activeSelectionIndex, setActiveSelectionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  

  const MainMenu = {
    header: "Select a Game",
    subheader: "and press A to start",
    options: [
      { optionName: 'Snake', optionPath: 'SnakeGame' },
      { optionName: 'Tetris', optionPath: 'TetrisGame' },
      { optionName: 'Pong', optionPath: 'PongGame' }
    ]
  }

  const welcomeScreenMobile = (
    <>
      <h1 className='welcome-title'>Welcome</h1>
      <p className='welcome-subtitle'>to the classic arcade</p>
      <p className='welcome-press-button'>Press any button to continue</p>
    </>
  );

  const Menu = ({ optionsList, header, subheader }) => (
    <>
      <h3>{header}</h3>
      <p>{subheader}</p>
      <ul className="menu-options">
        {optionsList.map((option, index) => (
          <li 
            key={index} 
            style={index === activeSelectionIndex ? { color: 'white' } : {}}
          >
            {option.optionName}
          </li>
        ))}
      </ul>
    </>
  );

  const [optionList, setOptionList] = useState(MainMenu)

  const updateSelection = (newPath, newIndex) => {
    setActiveSelectionPath(newPath);
    setActiveSelectionIndex(newIndex);
  };

  useEffect(() => {
    if (optionList.options.length > 0) {
      setActiveSelectionPath(optionList.options[0].optionPath);
      setActiveSelectionIndex(0);
    }
  }, [screenStatus, optionList]);


  const menuDown = useCallback(() => {
    const currentIndex = optionList.options.findIndex(option => option.optionPath === activeSelectionPath);
    const nextIndex = (currentIndex + 1) % optionList.options.length;
    updateSelection(optionList.options[nextIndex].optionPath, nextIndex);
  }, [optionList, activeSelectionPath]);

  const menuUp = useCallback(() => {
    const currentIndex = optionList.options.findIndex(option => option.optionPath === activeSelectionPath);
    const prevIndex = (currentIndex - 1 + optionList.options.length) % optionList.options.length;
    updateSelection(optionList.options[prevIndex].optionPath, prevIndex);
  }, [optionList, activeSelectionPath]);

  const goToMenu = useCallback(() => {
    setOptionList(MainMenu);
    setScreenStatus("Menu");
    updateSelection(MainMenu.options[0].optionPath, 0);
  }, []);

  const buttonMap = {
    Welcome: {
      up: goToMenu,
      down: goToMenu,
      left: goToMenu,
      right: goToMenu,
      A: goToMenu,
      B: goToMenu,
      exit: () => window.location.href = 'https://byilya.com',
      restart: goToMenu
    },
    Menu: {
      up: menuUp,
      down: menuDown,
      left: () => {},
      right: () => {},
      A: () => {
        const selectedOption = optionList.options.find(option => option.optionPath === activeSelectionPath);
        if (selectedOption) {
          setSelected(selectedOption.optionName);
          setScreenStatus(selectedOption.optionPath);
          updateSelection(optionList.options[0].optionPath, 0);
        }
      },
      B: () => {},
      exit: () => setScreenStatus("Welcome"),
      restart: () => {}
    },
    SnakeGame: {
      ...gameControls,
      exit: goToMenu,
    },
    TetrisGame: {
      ...gameControls,
      exit: goToMenu,
    },
    PongGame: {
      ...gameControls,
      exit: goToMenu,
    }
  };

  const currentButtonMap = buttonMap[screenStatus] || {};


  return {
    screenStatus,
    setScreenStatus,
    activeSelection: activeSelectionIndex,  
    activeSelectionPath, 
    selected,
    buttonMap: currentButtonMap,
    optionList,
    setOptionList,
    welcomeScreenMobile,
    Menu
  };
};

export default useInterface;