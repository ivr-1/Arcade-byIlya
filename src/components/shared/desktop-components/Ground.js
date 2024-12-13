import { useRef } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'

function Ground() {
  const meshRef = useRef()

  return (
    <mesh
      ref={meshRef}
      scale={[1, 1, 1]}
      position={[0, 0.01, 0]}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        blur={[1000, 300]}
        resolution={1024}
        mirror={1}
        mixBlur={6}
        mixStrength={3}
        color="#a0a0a0"
        metalness={0}
        roughness={0.2}
        transparent={true}
        opacity={0.6}
      />
    </mesh>
  )
}

export default Ground