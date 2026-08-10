import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import './index.scss'

export default function PostProcessing() {
  return (
    <div className="container">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 2, 6],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}
