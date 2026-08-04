import { Canvas } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import * as THREE from 'three'
import Experience from './Experience'
import './index.scss'

export default function PhysicsApp() {
  const created = (state: RootState) => {
    state.gl.shadowMap.type = THREE.PCFShadowMap
  }

  return (
    <div className="container">
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 2, 6],
        }}
        onCreated={created}
      >
        <Experience />
      </Canvas>
    </div>
  )
}
