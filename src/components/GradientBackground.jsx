import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export default function GradientBackground() {
  return (
    <div className="gradient-bg">
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0 }}
        pixelDensity={1}
        fov={45}
      >
        <ShaderGradient
          animate="on"
          brightness={1.1}
          cAzimuthAngle={0}
          cDistance={7.1}
          cPolarAngle={140}
          cameraZoom={17.3}
          color1="#ffffff"
          color2="#ffbb00"
          color3="#0700ff"
          envPreset="city"
          grain="off"
          lightType="3d"
          reflection={0.1}
          shader="defaults"
          type="sphere"
          uAmplitude={1.4}
          uDensity={1.1}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={1}
          uTime={0}
          wireframe={false}
          enableTransition={true}
        />
      </ShaderGradientCanvas>
    </div>
  )
}
