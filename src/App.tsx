import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { Torus, MeshDistortMaterial } from "@react-three/drei";
import { Text, Float, Stars, PresentationControls } from "@react-three/drei";
// import * as THREE from "three";

const ParticleField = () => {
  const starsRef = useRef<any>(null!);
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005;
    }
  });
  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
};

const Countdown3D = () => {
  const [timeLeft, setTimeLeft] = useState("00:00:00:00");

  useEffect(() => {
    const target = new Date("January 25, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${d}d : ${h}h : ${m}m : ${s}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <Text fontSize={0.5} color="#00f3ff" anchorX="center" anchorY="middle">
        {timeLeft}
        <meshStandardMaterial emissive="#00f3ff" emissiveIntensity={2} />
      </Text>
      {/* <Text position={[0, -0.8, 0]} fontSize={0.15} color="#ffffff">
        NONYDEV: CODING THE FUTURE
      </Text> */}

      <Text position={[0, -0.8, 0]} fontSize={0.3} color="#ffffff">
        {"🛠️Debugging the Present, Compiling the Future🌍"}
      </Text>

      <Text position={[0, 0.91, 0]} fontSize={0.5} color="#00f3ff">
        {"👾"}
      </Text>
    </Float>
  );
};

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />

        {/* Simplified PresentationControls to avoid version errors */}
        <PresentationControls
          global
          rotation={[0.1, 0.2, 0]}
          polar={[-0.4, 0.4]}
          azimuth={[-0.4, 0.4]}
        >
          <Countdown3D />
        </PresentationControls>

        <ParticleField />
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "40px",
          color: "#00f3ff",
          fontFamily: "monospace",
          pointerEvents: "none",
        }}
      >
        &gt; SYSTEM: NONYDEV_OS
        <br />
        &gt; STATUS: INITIALIZING_CHALLENGE_2026...
      </div>
    </div>
  );
}
