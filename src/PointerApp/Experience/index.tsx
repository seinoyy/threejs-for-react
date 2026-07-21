import { useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls, useGLTF, meshBounds } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Experience() {
  const cube = useRef<THREE.Mesh>(null)
  const hamburger = useGLTF('./models/hamburger.glb')

  useFrame((state, delta) => {
    if (cube.current) {
      cube.current.rotation.y += delta * 0.2
    }
  })

  const eventHandler = () => {
    if (cube.current) {
      ;(cube.current.material as THREE.MeshStandardMaterial).color.set(
        `hsl(${Math.random() * 360}, 100%, 75%)`
      )
    }
  }

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2} onClick={event => event.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={eventHandler}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        position-y={0.5}
        scale={0.4}
        onClick={event => {
          console.log('hamburger click' + event.object.name)
          event.stopPropagation()
        }}
      />
    </>
  )
}
