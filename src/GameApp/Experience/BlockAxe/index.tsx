import { useFrame, type RootState } from '@react-three/fiber'
import { RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import * as THREE from 'three'

const getOffset = () => Math.random() * Math.PI * 2

export default function BlockAxe({
  position = [0, 0, 0],
  geometry,
  floorMaterial,
  obstacleMaterial,
}: {
  position?: [number, number, number]
  geometry: THREE.BufferGeometry
  floorMaterial: THREE.Material
  obstacleMaterial?: THREE.Material
}) {
  const obstacle = useRef<RapierRigidBody>(null)
  const [timeOffset] = useState(() => getOffset())

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime()
    const x = Math.sin(time + timeOffset) * 1.25
    if (obstacle.current) {
      obstacle.current.setNextKinematicTranslation(
        new THREE.Vector3(position[0] + x, position[1] + 0.75, position[2])
      )
    }
  })

  return (
    <group position={position}>
      <mesh
        geometry={geometry}
        material={floorMaterial}
        position={[0, -0.1, 0]}
        receiveShadow
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={geometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}
