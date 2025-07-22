'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Car({ scrollY }: { scrollY: number }) {
  const { scene } = useGLTF('/rb20.glb');
  const ref = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = scrollY * 0.001; // Adjust sensitivity
    }
  });

  return <primitive object={scene} ref={ref} scale={1} />;
}

export default function CarScene() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [2, 3, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Car scrollY={scrollY} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
