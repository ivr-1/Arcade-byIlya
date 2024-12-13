import ScreenImage from "./ScreenImage"
import TopperImage from './TopperImage';
import ScreenHTML from './ScreenHTML';
import snakeSplashImage from './images/snake_splash.jpg'
import snakeTopperImage from './images/snake_topper.jpg'
import snakeLogo from './images/snake_logo.png'
import snakeOff from './images/snake_off.jpg'
import SnakeGame from "../../snake/SnakeGame";
import { useState, useEffect } from "react";



function MachineLeft ({machineScreen, setMachineScreen}) {

  const [displayScore, setDisplayScore] = useState(0) 

  const updateScreen = (newState) => {
        setMachineScreen(prevState => ({
          ...prevState,
          left: newState
        }));
    }

  const activeScreenLeft = () => {
        return (
            <>
                <div className="logo">
                    <img src={snakeLogo} alt="pixelated snake"></img>
                </div>
                <h1>Snake</h1>
                <div className="text">
                <div>
                    <span className="arrow">↑</span> <span className="arrow-horizontal">↑</span> <span className="arrow">↓</span> <span className="arrow-horizontal">↓</span> Move</div>
                </div>
                <p>Press any key to start</p>
                <a href="https://byilya.com" target="_blank" rel="noopener noreferrer" className="made-by">Made by Ilya</a>
            </>
          )
        }


  const gameoverScreenLeft = () => {
        return (
            <>
                <h1>Game Over </h1>
                <div className="text">Total Score: {displayScore}</div>
                <p> Press any key to restart </p>
                <a href="https://byilya.com" target="_blank" rel="noopener noreferrer" className="made-by">Made by Ilya</a>
            </>
        )
    }
  
    useEffect(() => {
      let timeoutId;
    
      const handleKeyPress = (event) => {
        if (machineScreen === 'active' || machineScreen === 'gameover') {
          updateScreen('game');
        }
      };
    
      const setupEventListener = () => {
        timeoutId = setTimeout(() => {
          window.addEventListener('keydown', handleKeyPress);
        }, 1200);
      };
    
      setupEventListener();
    
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [machineScreen]);


    return (
        <>
          <TopperImage config="left" image={snakeTopperImage} />
          {(() => {
            switch (machineScreen) {
              case 'clickMe':
                return (
                    <ScreenImage config="left" image={snakeSplashImage} />
                )  
              case 'active':
                return (
                  <ScreenHTML config="left">
                    <div className="MachineScreenContainer">
                      {activeScreenLeft()}
                    </div>
                  </ScreenHTML>
                )
              case 'game': 
                return (
                  <ScreenHTML config='left'>
                    <SnakeGame blockSize={20} updateScreen={updateScreen} setDisplayScore={setDisplayScore}/>
                  </ScreenHTML>
                )
              case 'gameover':
                return (
                  <ScreenHTML config="left">
                    <div className="MachineScreenContainer">
                      {gameoverScreenLeft()}
                    </div>
                  </ScreenHTML>
                );
              case 'off':
                return (
                  <ScreenImage config="left" image={snakeOff} />
                )  
              default:
                return null;
            }
          })()}
        </>
      );
    }

export default MachineLeft



