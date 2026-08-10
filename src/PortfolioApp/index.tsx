import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import './index.scss'

export default function PortfolioApp() {
  return (
    <div className="container">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [-3, 1.5, 4],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}
