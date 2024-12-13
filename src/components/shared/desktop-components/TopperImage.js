import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const topperConfigs = {
  center: {
    position: [0, 2.03, -4.01],
    rotation: [0.05, 0, 0],
    scale: [0.655, 0.15, 1],
  },
  left: {
    position: [-1.6, 1.95, -4.67],
    rotation: [-0.55, 0, 0],
    scale: [0.76, 0.18, 1],
  },
  right: {
    position: [1.58, 1.93, -4.68],
    rotation: [-0.5, 0, 0],
    scale: [0.76, 0.18, 1],
  }
};

const TopperImage = ({ config = 'center', image, customProps = {} }) => {
  const { position, rotation, scale } = { ...topperConfigs[config], ...customProps };
  const texture = useLoader(TextureLoader, image);

  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default TopperImage;