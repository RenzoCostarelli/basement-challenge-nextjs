"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const TEXT = "404 - Page Not Found";

type LetterState = {
  position: THREE.Vector2;
  velocity: THREE.Vector2;
  target: THREE.Vector2;
};

function Letter({
  char,
  index,
  total,
}: {
  char: string;
  index: number;
  total: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport, pointer, size } = useThree();

  // 🧠 responsive scale
  const isMobile = size.width < 768;
  const spacing = isMobile ? 0.4 : 0.6;
  const fontSize = isMobile ? 0.4 : 0.6;

  // 🧠 track if user has moved mouse
  const hasPointerMoved = useRef(false);

  useEffect(() => {
    const handleMove = () => {
      hasPointerMoved.current = true;
    };

    window.addEventListener("pointermove", handleMove, { once: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const stateRef = useRef<LetterState>({
    position: new THREE.Vector2((index - total / 2) * spacing, 0),
    velocity: new THREE.Vector2(0, 0),
    target: new THREE.Vector2((index - total / 2) * spacing, 0),
  });

  useFrame(() => {
    const state = stateRef.current;
    const mesh = meshRef.current;
    if (!mesh) return;

    // 👉 Only activate interaction after real movement
    if (hasPointerMoved.current) {
      const mousePos = new THREE.Vector2(
        pointer.x * (viewport.width / 2),
        pointer.y * (viewport.height / 2),
      );

      const dir = state.position.clone().sub(mousePos);
      const dist = dir.length();

      const interactionRadius = size.width < 768 ? 1 : 1.5;

      if (dist < interactionRadius) {
        dir.normalize();
        state.velocity.add(dir.multiplyScalar(0.05));
      }
    }

    // 🎯 spring to target
    const toTarget = state.target.clone().sub(state.position);
    state.velocity.add(toTarget.multiplyScalar(0.01));

    // 🌊 damping
    state.velocity.multiplyScalar(0.92);

    // move
    state.position.add(state.velocity);

    // 🧱 bounds
    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;

    state.position.x = THREE.MathUtils.clamp(
      state.position.x,
      -halfW + 0.3,
      halfW - 0.3,
    );
    state.position.y = THREE.MathUtils.clamp(
      state.position.y,
      -halfH + 0.3,
      halfH - 0.3,
    );

    // apply
    mesh.position.set(state.position.x, state.position.y, 0);

    // ✨ rotation
    mesh.rotation.z = state.velocity.x * 0.1;
  });

  return (
    <group ref={meshRef}>
      <Text fontSize={fontSize} color="white" anchorX="center" anchorY="middle">
        {char === " " ? "\u00A0" : char}
      </Text>
    </group>
  );
}

function Scene() {
  const letters = TEXT.split("");

  return (
    <>
      {letters.map((char, i) => (
        <Letter key={i} char={char} index={i} total={letters.length} />
      ))}
    </>
  );
}

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <Scene />
      </Canvas>
    </div>
  );
}
