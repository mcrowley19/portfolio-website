import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function NotifyReady({ onReady }) {
  const frameCount = useRef(0);
  useFrame(() => {
    frameCount.current += 1;
    if (frameCount.current === 3) {
      onReady?.();
    }
  });
  return null;
}
