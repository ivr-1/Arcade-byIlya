import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const screenConfigs = {
  center: {
    position: [0.003, 1.393, -4.07],
    rotation: [-0.42, 0, 0],
    scale: [0.03, 0.03, 1],
    cornerRadius: 0.09,
    width: '670px',
    height: '600px',
  },
  left: {
    position: [-1.601, 1.431, -4.84],
    rotation: [-0.2, 0, 0],
    scale: [0.04, 0.04, 1],
    cornerRadius: 0.035,
    width: '636px',
    height: '398px',
  },
  right: {
    position: [1.559, 1.431, -4.84],
    rotation: [-0.2, 0, 0],
    scale: [0.04, 0.04, 1],
    cornerRadius: 0.035,
    width: '636px',
    height: '398px',
  },
};

const ScreenHTML = ({ config = 'left', customProps = {}, children }) => {
  const {
    position,
    rotation,
    scale,
    cornerRadius,
    width,
    height,
  } = { ...screenConfigs[config], ...customProps };

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 1;
    const h = 1;
    shape.moveTo(cornerRadius, 0);
    shape.lineTo(w - cornerRadius, 0);
    shape.quadraticCurveTo(w, 0, w, cornerRadius);
    shape.lineTo(w, h - cornerRadius);
    shape.quadraticCurveTo(w, h, w - cornerRadius, h);
    shape.lineTo(cornerRadius, h);
    shape.quadraticCurveTo(0, h, 0, h - cornerRadius);
    shape.lineTo(0, cornerRadius);
    shape.quadraticCurveTo(0, 0, cornerRadius, 0);
    const segments = 32;
    return new THREE.ShapeGeometry(shape, segments);
  }, [cornerRadius]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>
      <Html
        transform
        position={[0, 0, 0.01]}
        style={{
          width: width,
          height: height,
          backgroundColor: '#181140',
          color: 'white',
          padding: '20px',
          borderRadius: `${cornerRadius * 100}%`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 1)'
        }}
      >
        {children}
      </Html>
    </group>
  );
};

export default ScreenHTML;

