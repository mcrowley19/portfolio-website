import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import NotifyReady from "./NotifyReady";

const vertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uOpacity;
  uniform vec3 uLightDir;
  uniform vec3 uLight2Dir;
  uniform float uAmbient;
  uniform float uDiffuse;
  uniform float uSpecular;
  uniform float uShininess;
  uniform float uEnvIntensity;
  uniform float uFresnelPower;
  uniform vec3 uRimColor;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;

  void main() {
    vec3 red = vec3(0.937, 0.267, 0.267);
    vec3 white = vec3(1.0, 1.0, 1.0);
    vec3 baseCol = vPosition.y >= 0.0 ? red : white;

    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPosition);

    float NdotL = max(0.0, dot(N, normalize(uLightDir)));
    float NdotL2 = max(0.0, dot(N, normalize(uLight2Dir)));
    float diffuse = uAmbient + uDiffuse * (NdotL + 0.4 * NdotL2);
    vec3 lit = baseCol * diffuse;

    vec3 H = normalize(normalize(uLightDir) + V);
    float NdotH = max(0.0, dot(N, H));
    float spec = pow(NdotH, uShininess);
    lit += vec3(1.0, 1.0, 1.0) * uSpecular * spec;

    float NdotV = max(0.0, dot(N, V));
    float fresnel = pow(1.0 - NdotV, uFresnelPower);
    vec3 reflectDir = reflect(-V, N);
    float y = reflectDir.y;
    vec3 envCol = vec3(0.52 + 0.22 * y, 0.55 + 0.22 * y, 0.62 + 0.18 * y);
    lit = mix(lit, lit + envCol * uEnvIntensity, fresnel);
    lit = mix(lit, uRimColor, fresnel * 0.25);

    gl_FragColor = vec4(lit, uOpacity);
  }
`;

function Capsule() {
  const groupRef = useRef();

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uOpacity: { value: 1 },
          uLightDir: { value: new THREE.Vector3(0.35, 0.6, 0.7).normalize() },
          uLight2Dir: { value: new THREE.Vector3(-0.4, 0.3, 0.5).normalize() },
          uAmbient: { value: 0.28 },
          uDiffuse: { value: 0.52 },
          uSpecular: { value: 0.35 },
          uShininess: { value: 48.0 },
          uEnvIntensity: { value: 0.42 },
          uFresnelPower: { value: 2.6 },
          uRimColor: { value: new THREE.Vector3(0.92, 0.92, 0.96) },
        },
        vertexShader,
        fragmentShader,
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.45;
    groupRef.current.rotation.x = -0.22;
    groupRef.current.rotation.z = 0.18;
  });

  return (
    <group
      ref={groupRef}
      position={[0.95, 0, 0]}
      rotation-order="YXZ"
      scale={0.975}
    >
      <mesh material={shaderMat}>
        <capsuleGeometry args={[0.5, 1.2, 24, 48]} />
      </mesh>
    </group>
  );
}

export default function MetricareScene({ onReady }) {
  return (
    <div className="absolute inset-0" style={{ background: "#ffffff" }}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 38 }}
        style={{ width: "100%", height: "100%" }}
        dpr={[1, 1.5]}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "low-power",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color(0xffffff);
          const canvas = gl.domElement;
          canvas.addEventListener("webglcontextlost", (e) =>
            e.preventDefault(),
          );
        }}
      >
        <ambientLight intensity={0.26} />
        <directionalLight position={[4, 5, 6]} intensity={1.05} castShadow />
        <directionalLight
          position={[-4, 2, 3]}
          intensity={0.48}
          color="#e8ecf4"
        />
        <directionalLight position={[0, 3, -5]} intensity={0.38} />
        <Capsule />
        <NotifyReady onReady={onReady} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-start justify-center pl-[12%] max-w-xl pointer-events-none">
        <h3
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
          style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}
        >
          Metricare
        </h3>
        <p
          className="mt-3 text-xs sm:text-sm text-gray-600 max-w-55 leading-relaxed"
          style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}
        >
          Patient history and AI in one place. A medical dashboard that stays
          clear and up to date.
        </p>
      </div>
    </div>
  );
}
