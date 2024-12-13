import React from 'react';
import { useState } from 'react';
import './MobilePortal.css'
import ButtonCircle from './mobile-components/ButtonCircle';
import ButtonOval from './mobile-components/ButtonOval'
import ButtonArrow from './mobile-components/ButtonArrow'
import useInterface from './useInterface'
import SnakeGameMobile from '../snake/SnakeGameMobile';
import TetrisGameMobile from '../tetris/TetrisGameMobile';
import PongGameMobile from '../pong/PongGameMobile';

const colorText = [
  { letter: "C", color: "#98243f" },
  { letter: "O", color: "#7055ad" },
  { letter: "L", color: "#89b144" },
  { letter: "O", color: "#b2992e" },
  { letter: "R", color: "#1c8ba3" }
];


function MobilePortal({deviceType}) {
  const [gameControls, setGameControls] = useState({})
  const { screenStatus, buttonMap, Menu, optionList, setScreenStatus, setOptionList, welcomeScreenMobile } = useInterface(gameControls);
  

  const renderScreen = () => {
    switch (screenStatus) {
      case 'Welcome':
        return welcomeScreenMobile;
      case 'Menu':
        return <Menu header={optionList.header} subheader={optionList.subheader} optionsList={optionList.options} 
      />;
      case 'SnakeGame':
        return <SnakeGameMobile blockSize={20} setGameControls={setGameControls} setScreenStatus={setScreenStatus} setOptionList={setOptionList}/>;
      case 'TetrisGame':
        return <TetrisGameMobile setGameControls={setGameControls}  setScreenStatus={setScreenStatus} setOptionList={setOptionList} />;
      case 'PongGame':
        return <PongGameMobile blockSize={15} setGameControls={setGameControls}  setScreenStatus={setScreenStatus} setOptionList={setOptionList} />;
      default:
        return;
    }
  };


  return (
    deviceType === 'mobile-portrait' ? (
      <div className='base-container-portrait'>
        <section className='screen-container'>
          <div className='screen'>
            {renderScreen()}
          </div>
          <div className='logo'>
            <div className='main'>ILYA BOY</div>
            <div className='color'>
              {colorText.map((item, index) => (
                <div key={index} style={{color: item.color}}>{item.letter}</div>
              ))}
            </div>
          </div>
        </section>
        <a href="https://byilya.com" target="_blank" rel="noopener noreferrer" className="made-by">Made by Ilya</a>
        <section className='buttons'>
          <div className='arrows'>
            <div>
              <ButtonArrow
                type="vertical"
                direction="up"
                clickFunction={buttonMap.up}
                touchEnd={buttonMap.upTouchEnd}
              />
            </div>
            <div className='horizontal'>
              <div>
                <ButtonArrow
                  type="horizontal"
                  direction="left"
                  clickFunction={buttonMap.left}
                  touchEnd={buttonMap.leftTouchEnd}
                />
              </div>
              <div>
                <ButtonArrow
                  type="horizontal"
                  direction="right"
                  clickFunction={buttonMap.right}
                  touchEnd={buttonMap.rightTouchEnd}
                />
              </div>
            </div>
            <div>
              <ButtonArrow
                type="vertical"
                direction="down"
                clickFunction={buttonMap.down}
                touchEnd={buttonMap.downTouchEnd}
              />
            </div>
          </div>
          <div className='circle'>
            <div>
              <ButtonCircle
                buttonText="B"
                clickFunction={buttonMap.B}
                touchEnd={buttonMap.BTouchEnd}
              />
            </div>
            <div>
              <ButtonCircle
                buttonText="A"
                clickFunction={buttonMap.A}
                touchEnd={buttonMap.ATouchEnd}
              />
            </div>
          </div>
        </section>
        <section className='auxilary-buttons'>
          <div>
            <ButtonOval
              buttonText="EXIT"
              clickFunction={buttonMap.exit}
            />
          </div>
          <div>
            <ButtonOval
              buttonText="RESTART"
              clickFunction={buttonMap.restart}
            />
          </div>
        </section>
      </div>
    ) 
    : deviceType === 'mobile-landscape' ? (
        <div className='base-container-landscape'>
          <div className='left-section'>
            <div className='arrows-landscape'>
                <div>
                  <ButtonArrow
                    type="vertical"
                    direction="up"
                    clickFunction={buttonMap.up}
                    touchEnd={buttonMap.upTouchEnd}
                  />
                </div>
                <div className='horizontal'>
                  <div>
                    <ButtonArrow
                      type="horizontal"
                      direction="left"
                      clickFunction={buttonMap.left}
                      touchEnd={buttonMap.leftTouchEnd}
                    />
                  </div>
                  <div>
                    <ButtonArrow
                      type="horizontal"
                      direction="right"
                      clickFunction={buttonMap.right}
                      touchEnd={buttonMap.rightTouchEnd}
                    />
                  </div>
                </div>
                <div>
                  <ButtonArrow
                    type="vertical"
                    direction="down"
                    clickFunction={buttonMap.down}
                    touchEnd={buttonMap.downTouchEnd}
                  />
                  </div>
                </div>
            <div className='exit-landscape'>
              <ButtonOval
                buttonText="EXIT"
                clickFunction={buttonMap.exit}
              />
              </div>
            </div>
              
          <div className='center-section'>
            <section className='screen-container-landscape'>
              <div className='screen'>
                {renderScreen()}
              </div>
              <div className='logo'>
                <div className='main'>ILYA BOY</div>
                <div className='advance'> Advance</div>
              </div>
            </section>
              <a href="https://byilya.com" target="_blank" rel="noopener noreferrer" className="made-by-landscape">Made by Ilya</a>
          </div>
          <div className='right-section'> 
            <section className='circle-buttons-landscape'>
              <div>
                <ButtonCircle
                  buttonText="B"
                  clickFunction={buttonMap.B}
                  touchEnd={buttonMap.BTouchEnd}
                />
              </div>
              <div>
                <ButtonCircle
                  buttonText="A"
                  clickFunction={buttonMap.A}
                  touchEnd={buttonMap.ATouchEnd}
                />
              </div>

      
            </section>
            <div className='restart-landscape'>
                <ButtonOval
                  buttonText="RESTART"
                  clickFunction={buttonMap.restart}
                />
              </div>
          </div>
        </div>
    ) : null
  );
};


export default MobilePortal;

