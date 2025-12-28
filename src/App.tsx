// import { useRef, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// // import { Torus, MeshDistortMaterial } from "@react-three/drei";
// import { Text, Float, Stars, PresentationControls } from "@react-three/drei";
// // import * as THREE from "three";

// const ParticleField = () => {
//   const starsRef = useRef<any>(null!);
//   useFrame(() => {
//     if (starsRef.current) {
//       starsRef.current.rotation.y += 0.0005;
//     }
//   });
//   return (
//     <Stars
//       ref={starsRef}
//       radius={100}
//       depth={50}
//       count={5000}
//       factor={4}
//       saturation={0}
//       fade
//       speed={1}
//     />
//   );
// };

// const Countdown3D = () => {
//   const [timeLeft, setTimeLeft] = useState("00:00:00:00");

//   useEffect(() => {
//     const target = new Date("January 25, 2026 00:00:00").getTime();
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const diff = target - now;
//       const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const s = Math.floor((diff % (1000 * 60)) / 1000);
//       setTimeLeft(`${d}d : ${h}h : ${m}m : ${s}s`);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (

//   );
// };

// export default function App() {
//   return (
//     <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
//       <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//         <color attach="background" args={["#000000"]} />
//         <ambientLight intensity={1} />
//         <pointLight position={[10, 10, 10]} intensity={2} />

//         {/* Simplified PresentationControls to avoid version errors */}
//         <PresentationControls
//           global
//           rotation={[0.1, 0.2, 0]}
//           polar={[-0.4, 0.4]}
//           azimuth={[-0.4, 0.4]}
//         >
//           <Countdown3D />
//         </PresentationControls>

//         <ParticleField />
//       </Canvas>

//       <div
//         style={{
//           position: "absolute",
//           bottom: "40px",
//           left: "40px",
//           color: "#00f3ff",
//           fontFamily: "monospace",
//           pointerEvents: "none",
//         }}
//       >
//         &gt; SYSTEM: NONYDEV_OS
//         <br />
//         &gt; STATUS: INITIALIZING_CHALLENGE_2026...
//       </div>
//     </div>
//   );
// }

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  Float,
  Stars,
  PresentationControls,
  // Torus,
  // MeshDistortMaterial,
} from "@react-three/drei";

// 1. Particle Field (The Stars)
const ParticleField = () => {
  const starsRef = useRef<any>(null!);
  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.y += 0.0005;
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

// 2. The 3D Circle & Countdown Logic
const Countdown3D = () => {
  const [timeLeft, setTimeLeft] = useState("00:00:00:00");
  const ringRef = useRef<any>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef.current.scale.x = 1 + Math.sin(t) * 0.05;
      ringRef.current.scale.y = 1 + Math.sin(t) * 0.05;
    }
  });

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
    <group>
      {/* The "Circle Thing" (Progress Ring) */}
      {/* <Torus
        ref={ringRef}
        args={[1.8, 0.02, 16, 100]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <MeshDistortMaterial
          color="#00f3ff"
          speed={2}
          distort={0.4}
          emissive="#00f3ff"
          emissiveIntensity={2}
        />
      </Torus> */}
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
    </group>
  );
};

// 3. Main App with Splash Screen
export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState("INITIALIZING_SYSTEM...");

  const logs = [
    "LOADING_KERNELS...",
    "ESTABLISHING_SECURE_CONNECTION...",
    "DECRYPTING_NONYDEV_LOGIC...",
    "FETCHING_3D_ASSETS...",
    "CALIBRATING_PARTICLE_FIELD...",
    "SYNCING_COUNTDOWN_CLOCK...",
    "PREPARING_ENVIRONMENT_2026...",
    "READY_FOR_DEPLOYMENT...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const logIndex = Math.floor((prev / 100) * logs.length);
        if (logs[logIndex]) setCurrentLog(logs[logIndex]);

        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsBooting(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 200); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (isBooting) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "monospace",
          color: "#00f3ff",
        }}
      >
        <div
          style={{
            marginBottom: "10px",
            letterSpacing: "4px",
            fontWeight: "bold",
          }}
        >
          NONYDEV_OS v1.0
        </div>
        <div
          style={{ marginBottom: "20px", fontSize: "0.8rem", color: "#888" }}
        >{`> ${currentLog}`}</div>
        <div
          style={{
            width: "300px",
            height: "4px",
            border: "1px solid #333",
            borderRadius: "2px",
            background: "#111",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#00f3ff",
              boxShadow: "0 0 10px #00f3ff",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>
        <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
          {progress}% COMPLETE
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
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

// import { useRef, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   Text,
//   Float,
//   Stars,
//   PresentationControls,
//   // Torus,
//   // MeshDistortMaterial,
// } from "@react-three/drei";

// const ParticleField = () => {
//   const starsRef = useRef<any>(null!);
//   useFrame(() => {
//     if (starsRef.current) starsRef.current.rotation.y += 0.0005;
//   });
//   return (
//     <Stars
//       ref={starsRef}
//       radius={100}
//       depth={50}
//       count={5000}
//       factor={4}
//       saturation={0}
//       fade
//       speed={1}
//     />
//   );
// };

// const Countdown3D = () => {
//   const [timeLeft, setTimeLeft] = useState("00:00:00:00");
//   const ringRef = useRef<any>(null!);

//   useFrame((state) => {
//     const t = state.clock.getElapsedTime();
//     if (ringRef.current) {
//       ringRef.current.rotation.z = t * 0.2;
//       ringRef.current.scale.x = 1 + Math.sin(t) * 0.05;
//       ringRef.current.scale.y = 1 + Math.sin(t) * 0.05;
//     }
//   });

//   useEffect(() => {
//     const target = new Date("January 25, 2026 00:00:00").getTime();
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const diff = target - now;
//       const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const s = Math.floor((diff % (1000 * 60)) / 1000);
//       setTimeLeft(`${d}d : ${h}h : ${m}m : ${s}s`);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <group>
//       <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
//         <Text fontSize={0.5} color="#00f3ff" anchorX="center" anchorY="middle">
//           {timeLeft}
//           <meshStandardMaterial emissive="#00f3ff" emissiveIntensity={2} />
//         </Text>
//         <Text position={[0, -0.8, 0]} fontSize={0.15} color="#ffffff">
//           NONYDEV: CODING THE FUTURE
//         </Text>
//       </Float>
//     </group>
//   );
// };

// export default function App() {
//   const [isBooting, setIsBooting] = useState(true);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setTimeout(() => setIsBooting(false), 500); // Small delay after 100%
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 10); // 100 steps * 300ms = 30,000ms (30 seconds)
//     return () => clearInterval(interval);
//   }, []);

//   if (isBooting) {
//     return (
//       <div
//         style={{
//           height: "100vh",
//           width: "100vw",
//           background: "#000",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           fontFamily: "monospace",
//           color: "#00f3ff",
//         }}
//       >
//         <div style={{ marginBottom: "20px", letterSpacing: "2px" }}>
//           INITIALIZING_NONYDEV_OS...
//         </div>
//         <div
//           style={{
//             width: "300px",
//             height: "10px",
//             border: "1px solid #00f3ff",
//             borderRadius: "5px",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               width: `${progress}%`,
//               height: "100%",
//               background: "#00f3ff",
//               transition: "width 0.3s ease",
//             }}
//           ></div>
//         </div>
//         <div style={{ marginTop: "10px", fontSize: "0.8rem" }}>
//           {progress}% COMPLETE
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
//       <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//         <color attach="background" args={["#000000"]} />
//         <ambientLight intensity={1} />
//         <pointLight position={[10, 10, 10]} intensity={2} />
//         <PresentationControls
//           global
//           rotation={[0.1, 0.2, 0]}
//           polar={[-0.4, 0.4]}
//           azimuth={[-0.4, 0.4]}
//         >
//           <Countdown3D />
//         </PresentationControls>
//         <ParticleField />
//       </Canvas>
//       <div
//         style={{
//           position: "absolute",
//           bottom: "40px",
//           left: "40px",
//           color: "#00f3ff",
//           fontFamily: "monospace",
//           pointerEvents: "none",
//           textShadow: "0 0 10px #00f3ff",
//         }}
//       >
//         &gt; SYSTEM: NONYDEV_OS
//         <br />
//         &gt; STATUS: ONLINE
//       </div>
//     </div>
//   );
// }
