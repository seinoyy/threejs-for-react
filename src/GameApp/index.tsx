import { Canvas } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import * as THREE from 'three'
import Experience from './Experience'
import './index.scss'
import { KeyboardControls } from '@react-three/drei'
import GamePanel from './GamePanel'

export default function GameApp() {
  const created = (state: RootState) => {
    state.gl.shadowMap.type = THREE.PCFShadowMap
  }

  return (
    <div className="container">
      <KeyboardControls
        map={[
          {
            name: 'forward',
            keys: ['ArrowUp', 'KeyW'],
          },
          {
            name: 'backward',
            keys: ['ArrowDown', 'KeyS'],
          },
          {
            name: 'leftward',
            keys: ['ArrowLeft', 'KeyA'],
          },
          {
            name: 'rightward',
            keys: ['ArrowRight', 'KeyD'],
          },
          {
            name: 'jump',
            keys: ['Space'],
          },
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
          onCreated={created}
        >
          <Experience />
        </Canvas>
        <GamePanel />
      </KeyboardControls>
    </div>
  )
}
