import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CustomObject from './CustomObject'

const Experience = () => {
  const cubeRef = useRef<THREE.Mesh | null>(null)
  const groupRef = useRef<THREE.Group | null>(null)

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta
    }
    // if (groupRef.current) {
    //   groupRef.current.rotation.y += delta
    // }

    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle) * 8
    // state.camera.position.z = Math.cos(angle) * 8
    // state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <OrbitControls />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <CustomObject />
    </>
  )
}

export default Experience
