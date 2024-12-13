import React, { useState, useEffect, useRef } from 'react';
import { SpotLight } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const DynamicLights = ({ targetMachine }) => {
  const [leftIntensity, setLeftIntensity] = useState(2000);
  const [centerIntensity, setCenterIntensity] = useState(4000);
  const [rightIntensity, setRightIntensity] = useState(3000);
  
  const targetIntensities = useRef({
    left: 2000,
    center: 4000,
    right: 3000
  });

  useEffect(() => {
    targetIntensities.current = {
      left: targetMachine === 'left' ? 5000 : targetMachine === 'initial' ? 2000 : 0,
      center: targetMachine === 'center' ? 6000 : targetMachine === 'initial' ? 4000 : 0,
      right: targetMachine === 'right' ? 6000 : targetMachine === 'initial' ? 3000 : 0
    };
  }, [targetMachine]);

  useFrame((state, delta) => {
    const lerpFactor = 1 - Math.pow(0.000001, delta); 

    setLeftIntensity(prev => 
      lerp(prev, targetIntensities.current.left, lerpFactor)
    );
    setCenterIntensity(prev => 
      lerp(prev, targetIntensities.current.center, lerpFactor)
    );
    setRightIntensity(prev => 
      lerp(prev, targetIntensities.current.right, lerpFactor)
    );
  });

  return (
    <>
        <SpotLight
        color={targetMachine ==='left'? 0xffe13e : targetMachine ==='center'? 0x61cc36 : targetMachine ==='right' ? 'magenta' : 0xA0A0FF}
        intensity={550}
        position={[5, 10, 5]}
        angle={Math.PI / 3}
        penumbra={0.3}
        decay={2}
        distance={0}
        target-position={[0, 0, -10]} 
      />
      {/* LEFT MACHINE */}
      <SpotLight
        color={0x9b870c}
        intensity={leftIntensity}
        position={[1, 15, 0]}
        angle={Math.PI / 25}
        penumbra={1}
        decay={2}
        distance={50}
        target-position={[-1.4, 0, -5.2]}
      />
      {/* MIDDLE MACHINE */}
      <SpotLight
        color={0x008000}
        intensity={centerIntensity}
        position={[0, 15, 0]}
        angle={Math.PI / 24}
        penumbra={1}
        decay={2}
        distance={50}
        target-position={[0, 0, -4.4]}
      />
      {/* RIGHT MACHINE */}
      <SpotLight
        color={0x800000}
        intensity={rightIntensity}
        position={[-1, 15, 0]}
        angle={Math.PI / 25}
        penumbra={1}
        decay={2}
        distance={50}
        target-position={[1.8, 0, -5.1]}
      />
      {/* BACKLIGHT */}
        <SpotLight
        color={0x387bba}
        intensity={200}
        position={[0, 2, -30]}
        angle={Math.PI / 25}
        penumbra={1}
        decay={2}
        distance={50}
        target-position={[0, 2, -5.5]}
      />
    </>
  );
};

export default DynamicLights;