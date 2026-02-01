import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Text,
  Float,
  Stars,
  PresentationControls,
  Torus,
  MeshDistortMaterial,
  Html
} from "@react-three/drei";
import { Analytics } from "@vercel/analytics/react";

const ParticleField = () => {
  const starsRef = useRef<any>(null!);
  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.y += 0.0005;
  });
  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
};

const ProjectHub = () => {
  // Timeline updated for Jan 25 - May 05 schedule
  const projects = [
    { id: "P-1", name: "Calculator", duration: "10 Days", date: "Jan 25 - Feb 03", active: true },
    { id: "P-2", name: "QR Generator", duration: "2 Days", date: "Feb 04 - Feb 05", active: false },
    { id: "P-3", name: "Color Flipper", duration: "3 Days", date: "Feb 06 - Feb 08", active: false },
    { id: "P-4", name: "Login System", duration: "8 Days", date: "Feb 09 - Feb 16", active: false },
    { id: "P-5", name: "E-Commerce", duration: "17 Days", date: "Feb 17 - Mar 05", active: false },
    { id: "P-6", name: "School Mgmt", duration: "20 Days", date: "Mar 06 - Mar 25", active: false },
    { id: "P-7", name: "Portfolio Hub", duration: "41 Days", date: "Mar 26 - May 05", active: false },
  ];

  // Journey Progress Calculation (8 days completed out of 101 total)
  const totalDays = 101; 
  const currentDay = 8;
  const journeyPercentage = Math.round((currentDay / totalDays) * 100);

  return (
    <Html position={[3.8, 0, 0]} distanceFactor={10}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.85)',
        color: '#00f3ff',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #00f3ff',
        fontFamily: 'monospace',
        width: '300px',
        fontSize: '11px',
        boxShadow: '0 0 25px rgba(0, 243, 255, 0.2)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ borderBottom: '1px solid #00f3ff', paddingBottom: '8px', marginBottom: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
          <span>&gt; MISSION_MAP_v2</span>
          <span style={{ color: '#ffea00' }}>END: MAY_05</span>
        </div>

        {projects.map((p) => (
          <div key={p.id} style={{ 
            marginBottom: '12px', 
            borderLeft: p.active ? '3px solid #ffea00' : '2px solid #333', 
            paddingLeft: '12px',
            opacity: p.active ? 1 : 0.6
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: p.active ? '#ffea00' : '#00f3ff' }}>
                {p.id}: {p.name}
              </span>
              {p.active && <span style={{ fontSize: '8px', background: '#ffea00', color: '#000', padding: '1px 4px', borderRadius: '2px' }}>ACTIVE</span>}
            </div>
            <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>{p.date} ({p.duration})</div>
          </div>
        ))}

        {/* Journey Progress Tracker */}
        <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '9px' }}>
            <span>TOTAL_PROGRESS</span>
            <span style={{ color: '#ffea00' }}>{journeyPercentage}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#111', borderRadius: '3px', border: '1px solid #333', overflow: 'hidden' }}>
            <div style={{ 
              width: `${journeyPercentage}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #00f3ff, #ffea00)',
              boxShadow: '0 0 8px #00f3ff'
            }}></div>
          </div>
        </div>
      </div>
    </Html>
  );
};

const Countdown3D = () => {
  const [statusText, setStatusText] = useState("DAY 8 / 100");
  const ringRef = useRef<any>(null!);
  const { viewport } = useThree();
  const mobileScale = viewport.width < 6 ? 0.5 : 1;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef.current.scale.setScalar(1 + Math.sin(t) * 0.05);
    }
  });

  return (
    <group scale={mobileScale}>
      <Torus ref={ringRef} args={[2.6, 0.012, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <MeshDistortMaterial 
          color="#00f3ff" 
          speed={2} 
          distort={0.3} 
          emissive="#00f3ff" 
          emissiveIntensity={2} 
        />
      </Torus>

      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <Text fontSize={0.6} color="#00f3ff" anchorX="center" anchorY="middle">
          {statusText}
          <meshStandardMaterial emissive="#00f3ff" emissiveIntensity={2} />
        </Text>
        <Text position={[0, -0.9, 0]} fontSize={0.14} color="#ffffff" maxWidth={3.5} textAlign="center">
          {"🛠️ Debugging the Present, Compiling the Future 🌍"}
        </Text>
        <Text position={[0, 0.9, 0]} fontSize={0.4}>{"👾"}</Text>
      </Float>

      {viewport.width > 7 && <ProjectHub />}
    </group>
  );
};

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsBooting(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40); 
    return () => clearInterval(interval);
  }, []);

  if (isBooting) {
    return (
      <div style={{ height: "100vh", width: "100vw", background: "#000", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "monospace", color: "#00f3ff" }}>
        <div style={{ marginBottom: "15px", letterSpacing: "5px" }}>NONYDEV_OS v1.0</div>
        <div style={{ width: "250px", height: "4px", border: "1px solid #333", background: "#111" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "#00f3ff", boxShadow: "0 0 10px #00f3ff" }}></div>
        </div>
        <div style={{ marginTop: "12px" }}>{progress}% LOADED</div>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 55 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={2.5} />
        <PresentationControls global rotation={[0.1, 0, 0]} polar={[-0.2, 0.2]} azimuth={[-0.2, 0.2]}>
          <Countdown3D />
        </PresentationControls>
        <ParticleField />
      </Canvas>
      <Analytics />
    </div>
  );
}