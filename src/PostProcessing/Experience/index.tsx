import { useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import Drunk from './Drunk'

export default function Experience() {
  const drunkRef = useRef(null)

  const drunkProps = useControls('Drunk Effect', {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  })

  return (
    <>
      <color args={['#ffffff']} attach="background" />

      <EffectComposer>
        {/* <Vignette offset={0.3} darkness={0.9} blendFunction={BlendFunction.NORMAL} /> */}
        {/* <Glitch
          delay={new THREE.Vector2(0.5, 1)}
          duration={new THREE.Vector2(0.1, 0.3)}
          strength={new THREE.Vector2(0.2, 0.4)}
          mode={GlitchMode.CONSTANT_WILD}
        /> */}
        {/* <Noise premultiply blendFunction={BlendFunction.AVERAGE} /> */}
        {/* <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} /> */}
        {/* <DepthOfField focusDistance={0.025} focalLength={0.025} bokehScale={6} /> */}
        <Drunk ref={drunkRef} {...drunkProps} blendFunction={BlendFunction.DARKEN} />
      </EffectComposer>

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  )
}
