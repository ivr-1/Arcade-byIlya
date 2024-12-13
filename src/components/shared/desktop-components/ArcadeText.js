import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import * as THREE from 'three';


const getColor = (targetMachine, defaultColor) => {
  switch (targetMachine) {
    case 'left': return "#7c682a";
    case 'center': return "#337619";
    case 'right': return "#7c2a73";
    default: return defaultColor;
  }
};

const NeonText3D = ({ targetMachine, text, position, rotation, size, defaultColor }) => {
  const meshRef = useRef();
  
  const color = getColor(targetMachine, defaultColor);

  const textOptions = useMemo(() => ({
    font: '/screaming_neon.json',
    size,
    height: 0.2,
    curveSegments: 1,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.015,
    bevelSegments: 5
  }), [size]);

  const materials = useMemo(() => [
    new THREE.MeshPhongMaterial({
      color,
      emissive: color,
      emissiveIntensity: 1.2,
      shininess: 100,
      specular: color
    }),
    new THREE.MeshPhongMaterial({
      color: 'white',
      emissive: 'white',
      emissiveIntensity: 0.2,
      shininess: 100,
      specular: 'white'
    })
  ], [color]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <Text3D {...textOptions} material={materials}>
        {text}
      </Text3D>
    </mesh>
  );
};

const TextLines = ({ targetMachine }) => (
  <>
    <NeonText3D
      targetMachine={targetMachine}
      text="W e l c o m e    t o"
      position={[-1.1, 4.9, -6]}
      rotation={[0.25, 0, 0]}
      size={0.25}
      defaultColor="#71437e"
    />
    <NeonText3D
      targetMachine={targetMachine}
      text="I l y a's    C l a s s i c    A r c a d e"
      position={[-2.8, 4.1, -6]}
      rotation={[0.2, 0, 0]}
      size={0.4}
      defaultColor="#2a8187"
    />
  </>
);

const ArcadeText = ({ targetMachine }) => (
  <>
    <TextLines targetMachine={targetMachine} />
  </>
);

export default ArcadeText;