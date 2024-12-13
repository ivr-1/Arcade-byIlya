import ScreenImage from "./ScreenImage"
import TopperImage from './TopperImage';
import ScreenHTML from './ScreenHTML';
import pongSplashImage from './images/pong_splash.jpg'
import pongTopperImage from './images/pong_topper.jpg'
import pongLogo from './images/pong_logo.png'
import pongOff from './images/pong_off.jpg'
import PongGame from '../../pong/PongGame';
import { useState, useEffect } from "react";


function MachineRight ({machineScreen, setMachineScreen}) {
  const [displayScore, setDisplayScore] = useState(0)

    const updateScreen = (newState) => {
        setMachineScreen(prevState => ({
          ...prevState,
          right: newState
        }));
    }

    const activeScreenRight = () => {
        return (
            <>
                <div className="logo">
                   <img src={pongLogo} alt="pixelated ball and paddle"></img>
                </div>
                <h1>Pong</h1>
                <div className="text">
                <div>
                    <span className="arrow-horizontal">↓</span><span className="arrow-horizontal">↑</span> Move
                </div>
                </div>
                <p>Press any key to start</p>
                <a href="https://byilya.com" target="_blank" rel="noopener noreferrer" className="made-by">Made by Ilya</a>

            </>
          )
        }

    const gameoverScreenRight = () => {
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

          <TopperImage config="right" image={pongTopperImage} />
          {(() => {
            switch (machineScreen) {
              case 'clickMe':
                return (
                    <ScreenImage config="right" image={pongSplashImage} />
                )  
              case 'active':
                return (
                  <ScreenHTML config="right">
                    <div className="MachineScreenContainer">
                      {activeScreenRight()}
                    </div>
                  </ScreenHTML>
                );
                case 'game':
                  return (
                    <ScreenHTML config='right'>
                        <PongGame blockSize={15} updateScreen={updateScreen} setDisplayScore={setDisplayScore}/>
                    </ScreenHTML>
                  )
                case 'gameover':
                return (
                  <ScreenHTML config="right">
                    <div className="MachineScreenContainer">
                      {gameoverScreenRight()}
                    </div>
                  </ScreenHTML>
                );
              case 'off':
                return (
                  <ScreenImage config="right" image={pongOff} />
                )  
              default:
                return null;
            }
          })()}
        </>
      );
    }

export default MachineRight
