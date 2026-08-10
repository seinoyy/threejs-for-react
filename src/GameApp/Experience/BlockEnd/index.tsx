import { Text, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

export default function BlockEnd({
  position = [0, 0, 0],
  geometry,
  material,
}: {
  position?: [number, number, number]
  geometry: THREE.BufferGeometry
  material: THREE.Material
}) {
  const hamburger = useGLTF('./models/hamburger.glb')

  hamburger.scene.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true
    }
  })

  return (
    <group position={position}>
      <Text font="./fonts/bebas-neue-v9-latin-regular.woff" scale={1} position={[0, 2.25, 2]}>
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh
        geometry={geometry}
        material={material}
        position={[0, 0, 0]}
        receiveShadow
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        restitution={0.2}
        friction={0}
        position={[0, 0.25, 0]}
      >
        <primitive object={hamburger.scene} position={[0.34, 0.25, -0.2]} scale={0.4} />
      </RigidBody>
    </group>
  )
}
