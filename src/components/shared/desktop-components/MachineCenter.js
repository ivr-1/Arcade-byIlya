import ScreenImage from "./ScreenImage"
import TopperImage from './TopperImage';
import ScreenHTML from './ScreenHTML'
import tetrisSplashImage from './images/tetris_splash.jpg'
import tetrisTopperImage from './images/tetris_topper.jpg'
import tetrisLogo from './images/tetris_logo.png'
import tetrisOff from './images/tetris_off.jpg'
import TetrisGame from "../../tetris/TetrisGame";
import { useState, useEffect } from "react";
import './MachineScreen.css'


function MachineCenter ({machineScreen, setMachineScreen}) {
    const [displayScore, setDisplayScore] = useState(0) 

    const updateScreen = (newState) => {
        setMachineScreen(prevState => ({
          ...prevState,
          center: newState
        }));
    }

    const activeScreenCenter = () => {
        return (
            <>
                <div className="logo">
                    <img src={tetrisLogo} alt="pixelated tetromino piece"></img>
                </div>
                <h1>Tetris</h1>
                    <div className="text">
                    <div><span className="arrow-horizontal">↓</span><span className="arrow-horizontal">↑</span> Move</div>
                    <div><span className="arrow">↑</span> Rotate</div>
                    <div><span className="arrow">↓</span> Drop</div>
                    <div><span className="letter">r</span>Restart</div>
                </div>
                <p>Press any key to start</p>
                <a href="https://byilya.com" target="_blank" rel="noopener noreferrer" className="made-by">Made by Ilya</a>

            </>
          )
        }

    const gameoverScreenCenter = () => {
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

          <TopperImage config="center" image={tetrisTopperImage} />
          {(() => {
            switch (machineScreen) {
              case 'clickMe':
                return (
                    <ScreenImage config="center" image={tetrisSplashImage} />
                )  
              case 'active':
                return (
                  <ScreenHTML config="center">
                    <div className="MachineScreenContainer">
                      {activeScreenCenter()}
                    </div>
                  </ScreenHTML>
                );
              case 'game':
                return (
                  <ScreenHTML config='center'>
                      <TetrisGame updateScreen={updateScreen} setDisplayScore={setDisplayScore}/>
                  </ScreenHTML>
                )
              case 'gameover':
                return (
                  <ScreenHTML config="center">
                    <div className="MachineScreenContainer">
                      {gameoverScreenCenter()}
                    </div>
                  </ScreenHTML>
                );
              case 'off':
                return (
                  <ScreenImage config="center" image={tetrisOff} />
                )  
              default:
                return null;
            }
          })()}
        </>
      );
    }

export default MachineCenter


