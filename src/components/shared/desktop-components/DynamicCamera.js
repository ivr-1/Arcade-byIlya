import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';



export function DynamicCamera({ position, targetMachine }) {
  const { camera } = useThree();
  const cameraRef = useRef();

  const cameraPositions = {
    initial: {
      position: new THREE.Vector3(0, 1.5, 0),
      rotation: targetMachine === 'left' ? new THREE.Euler(0, 0.03, 0) : targetMachine === 'right' ? new THREE.Euler(0, -0.03, 0) :  new THREE.Euler(0, 0, 0)
    },
    left: {
      position: new THREE.Vector3(-1.6, 1.5, -4.25),
      rotation: new THREE.Euler(-0.2, 0, 0)
    },
    center: {
      position: new THREE.Vector3(0.001, 1.6, -3.6),
      rotation: new THREE.Euler(-0.5, 0, 0)
    },
    right: {
      position: new THREE.Vector3(1.55, 1.5, -4.25),
      rotation: new THREE.Euler(-0.2, 0, 0)
    }
  };

  const { pos, rot } = useSpring({
    pos: cameraPositions[position].position.toArray(),
    rot: [
      cameraPositions[position].rotation.x,
      cameraPositions[position].rotation.y,
      cameraPositions[position].rotation.z
    ],
    config: { 
      mass: 1,
      tension: 80,
      friction: 26,
      clamp: true,
      precision: 0.001
    }
  });

  useFrame(() => {
    camera.position.fromArray(pos.get());
    const [x, y, z] = rot.get();
    camera.rotation.set(x, y, z);
    camera.updateProjectionMatrix();
  });

  useEffect(() => {
    if (cameraRef.current) {
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  return <animated.primitive object={camera} ref={cameraRef} />;
}

export default DynamicCamera;