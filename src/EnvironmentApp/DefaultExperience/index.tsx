import { useRef } from 'react'
import { OrbitControls, Stage } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function DefaultExperience() {
  const cube = useRef<THREE.Mesh>(null)

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls(
    'environment map',
    {
      envMapIntensity: { value: 3.5, min: 1, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 20, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    }
  )
  return (
    <>
      <OrbitControls makeDefault />

      <Perf position="top-left" />

      <Stage
        shadows={{
          type: 'contact',
          opacity: 0.2,
          blur: 3,
        }}
        environment={{
          files: './environmentMaps/the_sky_is_on_fire_2k.hdr',
          ground: {
            height: envMapHeight,
            radius: envMapRadius,
            scale: envMapScale,
          },
        }}
        intensity={2}
        preset="portrait"
      >
        <mesh castShadow position-x={-2} position-y={1}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh castShadow ref={cube} position-x={2} position-y={1} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh>
      </Stage>
    </>
  )
}
