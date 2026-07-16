import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import Experience from './Experience'
import './index.scss'

export default function DebugApp() {
  return (
    <div className="container">
      <Leva collapsed />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}
