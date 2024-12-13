import React, { useState, Suspense } from 'react';
import { Canvas, useLoader, extend } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Text, useProgress, Html } from '@react-three/drei';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import DynamicCamera from './desktop-components/DynamicCamera.js'
import StaticLights from './desktop-components/StaticLights.js';
import DynamicLights from './desktop-components/DynamicLights.js';
import environmentModel from './desktop-components/Environment.glb'
import Ground from './desktop-components/Ground.js';
import SelectorBoxes from './desktop-components/SelectorBoxes.js';
import SideButtons from './desktop-components/SideButtons.js';
import MachineCenter from './desktop-components/MachineCenter.js';
import MachineRight from './desktop-components/MachineRight.js';
import MachineLeft from './desktop-components/MachineLeft.js';
import ArcadeText from './desktop-components/ArcadeText.js';
import './DesktopPortal.css'
extend({ UnrealBloomPass });

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className='loading-screen'>
        <div>{progress.toFixed(0)}% loading </div>
      </div>
    </Html>
  );
}

function Environment() {
  const gltf = useLoader(GLTFLoader, environmentModel)
  return <primitive object={gltf.scene} scale={[1, 1, 1]} position={[0, 0, 0]} />
}

const VignetteOverlay = () => {
  const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1000,
    animation: 'vignette-fade-in 1s forwards',
  };

  return (
    <>
      <style>
        {`
          @keyframes vignette-fade-in {
            from { box-shadow: inset 0 0 250px rgba(0,0,0,0); }
            to { box-shadow: inset 0 0 300px rgba(0,0,0,1); }
          }
        `}
      </style>
      <div style={style} />
    </>
  );
};

function DesktopPortal({deviceType}) {
  const machinePositions = ['left', 'center', 'right'];
  const [targetMachine, setTargetMachine] = useState('initial')
  const [cameraPosition, setCameraPosition] = useState('initial');
  const [machineScreen, setMachineScreen] = useState({
    left: 'off',
    center: 'off',
    right: 'off'
  });

  const arcadeReset = () => {
    setCameraPosition('initial');
    setMachineScreen({
      left: 'off',
      center: 'off',
      right: 'off'
    });
  };

  const focusMachine = (position) => {
    setCameraPosition(position);
    setMachineScreen(prevMachine => {
      const newMachine = { ...prevMachine };
      machinePositions.forEach(pos => {
        newMachine[pos] = pos === position ? 'active' : 'off';
      });
      return newMachine;
    });
  };

  return (
    <div className='base-container-desktop'>


      <Canvas style={{ background: 'black' }}>
        <Suspense fallback={<Loader />}>


          {/* LIGHTING */}
          <StaticLights />
          <DynamicLights targetMachine={targetMachine}/>
          <EffectComposer>
            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={450} intensity={0.15} />
          </EffectComposer>

          {/* CAMERA */}
          <DynamicCamera position={cameraPosition} targetMachine={targetMachine} />

          {/* STATIC ASSETS */}
          <Environment />
          <Ground />
          <ArcadeText targetMachine={targetMachine}/>
          <Text
            position={[0.01, 0.03, -2.41]}
            rotation={[-1.6, 0, 0]}
            color="white"
            material-toneMapped={false}
            fontSize={0.25}
            font='/screaming_neon.ttf'
            letterSpacing={0.1}
          >
            Choose  your  machine
          </Text>

          {/* INTERACTIVE ELEMENTS */}
          <MachineLeft machineScreen={machineScreen.left} setMachineScreen={setMachineScreen}/>
          <MachineCenter machineScreen={machineScreen.center} setMachineScreen={setMachineScreen} />
          <MachineRight machineScreen={machineScreen.right} setMachineScreen={setMachineScreen}/>
            

          {/* UTILITY */}
          {cameraPosition === 'initial' && (          
            <SelectorBoxes 
              setTargetMachine={setTargetMachine} 
              targetMachine={targetMachine}
              cameraPosition={cameraPosition}
              focusMachine={focusMachine}
              setMachineScreen={setMachineScreen}
              machineScreen={machineScreen}
            />
          )}

        </Suspense>
      </Canvas>

      {/* 2D ELEMENTS */}
      {cameraPosition !== 'initial' && (
        <>
        <SideButtons
          setTargetMachine={setTargetMachine}
          focusMachine={focusMachine}
          currentPosition={cameraPosition}
        />
        <VignetteOverlay />
        <button className="exit-machine" onClick={arcadeReset}>
          Back
        </button>
      </>
      )}

    </div>
  )
}

export default DesktopPortal;
