import { Canvas } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import * as THREE from 'three'
import Experience from './Experience'
import DefaultExperience from './DefaultExperience'

const type: 0 | 1 = 1

export default function EnvironmentApp() {
  const created = (state: RootState) => {
    // state.gl.shadowMap.type = THREE.PCFShadowMap
  }

  return (
    <Canvas
      shadows={false}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      onCreated={created}
    >
      {type === 0 ? <Experience /> : <DefaultExperience />}
    </Canvas>
  )
}
