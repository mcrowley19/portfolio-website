import { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import NotifyReady from "./NotifyReady";

function Stars({ count = 500 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.003;
      ref.current.rotation.x += delta * 0.001;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.25} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function Mars({ onReady }) {
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, "/mars-texture.jpg");

  useMemo(() => {
    texture.anisotropy = 4;
  }, [texture]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06;
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[1.6, 48, 48]} />
        <meshStandardMaterial map={texture} roughness={0.9} metalness={0.05} />
      </mesh>
      <NotifyReady onReady={onReady} />
    </>
  );
}

export default function SolScene({ onReady }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 55% 50%, #1a0c08 0%, #080306 45%, #020103 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          canvas.addEventListener("webglcontextlost", (e) => e.preventDefault());
        }}
      >
        <ambientLight intensity={0.08} />
        <directionalLight position={[5, 2, 5]} intensity={2.2} color="#fff0dc" />
        <directionalLight position={[-4, -1, 3]} intensity={0.15} color="#ff8050" />
        <pointLight position={[-6, 3, -4]} intensity={0.4} color="#ffd4b8" />
        <Stars />
        <Mars onReady={onReady} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col justify-center pl-[5%] pointer-events-none">
        <p className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-[#c8a080] mb-2 font-mono">
          Simulation Platform
        </p>
        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Sol-450
        </h3>
        <p className="text-[9px] sm:text-[10px] text-[#b0a090] mt-2 max-w-[180px] leading-relaxed opacity-75">
          Modeling sustainable agriculture for humanity&apos;s next frontier.
        </p>
      </div>
    </div>
  );
}
