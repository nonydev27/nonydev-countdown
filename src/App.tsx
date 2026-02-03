import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, PresentationControls, Html } from "@react-three/drei";
import { Analytics } from "@vercel/analytics/react";

const ParticleField = () => {
  const starsRef = useRef<any>(null!);
  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.y += 0.0005;
  });
  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
};

const ProjectHub = () => {
  const startDate = new Date("2026-01-25T00:00:00");
  const today = new Date();
  const diffTime = Math.max(0, today.getTime() - startDate.getTime());
  const currentDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  
  const totalDays = 101; 
  const journeyPercentage = Math.min(100, Math.round((currentDay / totalDays) * 100));

  const projects = [
    { id: "P-1", name: "Calculator", range: [1, 10], date: "Jan 25 - Feb 03" },
    { id: "P-2", name: "QR Generator", range: [11, 12], date: "Feb 04 - Feb 05" },
    { id: "P-3", name: "Color Flipper", range: [13, 15], date: "Feb 06 - Feb 08" },
    { id: "P-4", name: "Login System", range: [16, 23], date: "Feb 09 - Feb 16" },
    { id: "P-5", name: "E-Commerce", range: [24, 40], date: "Feb 17 - Mar 05" },
    { id: "P-6", name: "School Mgmt", range: [41, 60], date: "Mar 06 - Mar 25" },
    { id: "P-7", name: "Portfolio Hub", range: [61, 101], date: "Mar 26 - May 05" },
  ];

  return (
    <Html position={[0, 0, 0]} center distanceFactor={10}>
      <style>
        {`
          @keyframes glowPulse {
            0% { box-shadow: 0 0 5px #ffea00; transform: scale(1); }
            50% { box-shadow: 0 0 15px #ffea00; transform: scale(1.05); }
            100% { box-shadow: 0 0 5px #ffea00; transform: scale(1); }
          }
          .active-badge {
            animation: glowPulse 2s infinite ease-in-out;
          }
        `}
      </style>
      <div style={{
        background: 'rgba(0, 0, 0, 0.85)',
        color: '#00f3ff',
        padding: '25px',
        borderRadius: '12px',
        border: '1px solid #00f3ff',
        fontFamily: 'monospace',
        width: '320px',
        fontSize: '11px',
        boxShadow: `0 0 ${20 + (journeyPercentage / 5)}px rgba(0, 243, 255, 0.15)`,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(4px)',
        position: 'relative'
      }}>
        <div style={{ borderBottom: '1px solid #00f3ff', paddingBottom: '10px', marginBottom: '15px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
          <span>&gt; MISSION_MAP_v2</span>
          <span style={{ color: '#ffea00' }}>DAY_{currentDay}</span>
        </div>

        {projects.map((p) => {
          const isActive = currentDay >= p.range[0] && currentDay <= p.range[1];
          const isFinished = currentDay > p.range[1];
          const isPending = currentDay < p.range[0];

          // Color Logic: Active=Yellow, Finished=Cyan, Pending=Purple
          const statusColor = isActive ? '#ffea00' : (isFinished ? '#00f3ff' : '#bd00ff');
          const borderColor = isActive ? '#ffea00' : (isFinished ? '#00f3ff' : '#331a4d');

          return (
            <div key={p.id} style={{ 
              marginBottom: '12px', 
              borderLeft: `2px solid ${borderColor}`, 
              paddingLeft: '12px',
              opacity: isPending ? 0.6 : 1,
              transition: 'all 0.4s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: statusColor
                }}>
                  {p.id}: {p.name}
                </span>
                {isActive && (
                  <span className="active-badge" style={{ 
                    fontSize: '8px', background: '#ffea00', color: '#000', padding: '1px 4px', borderRadius: '2px', fontWeight: 'bold' 
                  }}>
                    ACTIVE
                  </span>
                )}
                {isFinished && <span style={{ color: '#00f3ff', fontWeight: 'bold' }}>✓</span>}
                {isPending && (
                  <span style={{ 
                    fontSize: '8px', color: '#bd00ff', border: '1px solid #bd00ff', padding: '0px 3px', borderRadius: '2px' 
                  }}>
                    PENDING
                  </span>
                )}
              </div>
              <div style={{ fontSize: '10px', color: isPending ? '#4b306b' : '#888', marginTop: '2px' }}>
                {p.date}
              </div>
            </div>
          );
        })}

        <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '9px' }}>
            <span>TOTAL_COMPLETION_OS</span>
            <span style={{ color: '#ffea00' }}>{journeyPercentage}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#111', borderRadius: '4px', border: '1px solid #333', overflow: 'hidden' }}>
            <div style={{ 
              width: `${journeyPercentage}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #00f3ff, #ffea00)',
              boxShadow: '0 0 10px #00f3ff',
              transition: 'width 1s ease-in-out'
            }}></div>
          </div>
        </div>
      </div>
    </Html>
  );
};

const Countdown3D = () => {
  const { viewport } = useThree();
  const mobileScale = viewport.width < 6 ? 0.75 : 1;
  return (
    <group scale={mobileScale}>
      <ProjectHub />
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
        return prev + 2;
      });
    }, 30); 
    return () => clearInterval(interval);
  }, []);

  if (isBooting) {
    return (
      <div style={{ height: "100vh", width: "100vw", background: "#000", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "monospace", color: "#00f3ff" }}>
        <div style={{ marginBottom: "15px", letterSpacing: "5px" }}>NONYDEV_OS v1.0</div>
        <div style={{ width: "200px", height: "2px", border: "1px solid #333", background: "#111" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "#00f3ff", boxShadow: "0 0 10px #00f3ff" }}></div>
        </div>
        <div style={{ marginTop: "12px", fontSize: '10px' }}>INITIALIZING_SYSTEM_{progress}%</div>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={1} />
        <PresentationControls 
          global 
          rotation={[0, 0, 0]} 
          polar={[-0.1, 0.1]} 
          azimuth={[-0.1, 0.1]}
        >
          <Countdown3D />
        </PresentationControls>
        <ParticleField />
      </Canvas>
      <Analytics />
    </div>
  );
}