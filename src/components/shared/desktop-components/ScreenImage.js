import React, { useMemo } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const screenConfigs = {
  center: {
    position: [-0.264, 1.17, -3.97],
    rotation: [-0.4, 0, 0],
    scale: [0.534, 0.482, 1],
    cornerRadius: 0.09,
  },
  left: {
    position: [-1.95, 1.21, -4.8],
    rotation: [-0.2, 0, 0],
    scale: [0.7, 0.45, 1],
    cornerRadius: 0.02,
  },
  right: {
    position: [1.21, 1.21, -4.8],
    rotation: [-0.2, 0, 0],
    scale: [0.7, 0.45, 1],
    cornerRadius: 0.02,
  }
};

const ScreenImage = ({ config = 'center', image, customProps = {} }) => {
  const { position, rotation, scale, cornerRadius } = { ...screenConfigs[config], ...customProps };
  const texture = useLoader(TextureLoader, image);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 1;
    const height = 1;
    shape.moveTo(cornerRadius, 0);
    shape.lineTo(width - cornerRadius, 0);
    shape.quadraticCurveTo(width, 0, width, cornerRadius);
    shape.lineTo(width, height - cornerRadius);
    shape.quadraticCurveTo(width, height, width - cornerRadius, height);
    shape.lineTo(cornerRadius, height);
    shape.quadraticCurveTo(0, height, 0, height - cornerRadius);
    shape.lineTo(0, cornerRadius);
    shape.quadraticCurveTo(0, 0, cornerRadius, 0);
    const segments = 32;
    return new THREE.ShapeGeometry(shape, segments);
  }, [cornerRadius]);

  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default ScreenImage;