import { useFrame, type RootState } from '@react-three/fiber'
import { RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import * as THREE from 'three'

const getSpeed = () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)

export default function BlockSpike({
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
  const [speed] = useState(() => getSpeed())

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime()
    const quaternion = new THREE.Quaternion()
    quaternion.setFromEuler(new THREE.Euler(0, time * speed, 0))
    if (obstacle.current) {
      obstacle.current.setNextKinematicRotation(quaternion)
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
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}
