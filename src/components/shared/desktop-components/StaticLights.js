import React from 'react';
import { extend } from '@react-three/fiber';
import { RectAreaLight } from 'three';

extend({ RectAreaLight });



const StaticLights = () => {
  return (
    <>
  
      {/* Area Light */}
      <rectAreaLight
        color={0xA0A0FF}
        intensity={2}
        width={4}
        height={9}
        position={[2, 5, 0]}
        lookAt={[0, 0, 0]} 
      />
      
      {/* Camera Light */}
      <directionalLight color={0xFFFFFF} intensity={0.8} position={[0, 0, 1]} />
    </>
  );
};

export default StaticLights;