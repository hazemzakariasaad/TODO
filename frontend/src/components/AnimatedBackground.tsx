import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import React, { useRef } from 'react';
import * as THREE from 'three';

function RotatingCube() {
  const cubeRef = useRef<THREE.Mesh>(null!);

  // Rotate the cube on each frame
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef} position={[0, 0, 2]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00bcd4" wireframe />
    </mesh>
  );
}

export default function AnimatedBackground() {
  console.log('AnimatedBackground component rendered');
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <RotatingCube />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
