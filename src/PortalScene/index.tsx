import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import './index.scss'

export default function PortalScene() {
  return (
    <div className="container">
      <Canvas
        flat
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [1, 2, 6],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}
