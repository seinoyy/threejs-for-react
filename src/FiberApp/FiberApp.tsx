import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import './FiberApp.scss'

const FiberApp = () => {
  return (
    <div className="container">
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3, 2, 6],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}

export default FiberApp
