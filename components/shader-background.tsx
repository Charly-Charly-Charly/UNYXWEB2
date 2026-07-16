"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export function ShaderBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-0"
      aria-hidden="true"
    >
      <MeshGradient
        colors={[
          "#050003",
          "#4A0014",
          "#D60035",
          "#FF1748",
          "#FF4B2B",

          "#D60035",

          "#FFFFFF",
        ]}
        distortion={0.95}
        swirl={0.22}
        grainMixer={0}
        grainOverlay={0}
        speed={0.3}
        style={{
          position: "absolute",
          top: "-10%",
          right: "-18%",
          width: "115%",
          height: "125%",
          opacity: 1,
          filter: "blur(10px)",
          transform: "scale(1.08)",
        }}
      />

      {/* Oscurecimiento ligero del lado izquierdo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.12) 58%, transparent 80%)",
        }}
      />

      {/* Curva inferior oscura más suave */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 12% 105%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 42%, transparent 72%)",
        }}
      />

      {/* Resplandor rojo central */}
      <div
        className="absolute right-[3%] top-[20%] h-[65%] w-[60%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,35,70,0.65) 0%, rgba(255,75,45,0.35) 40%, transparent 72%)",
          filter: "blur(35px)",
        }}
      />

      {/* Resplandor rosado derecho */}
      <div
        className="absolute right-[-10%] top-[15%] h-[75%] w-[42%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,170,200,0.68) 0%, rgba(255,80,130,0.25) 45%, transparent 75%)",
          filter: "blur(28px)",
        }}
      />

      {/* Viñeta sutil */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 67% 50%, transparent 25%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.48) 100%)",
        }}
      />
    </div>
  );
}
