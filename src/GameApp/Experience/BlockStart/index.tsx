import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'

export default function BlockStart({
  position = [0, 0, 0],
  geometry,
  material,
}: {
  position?: [number, number, number]
  geometry: THREE.BufferGeometry
  material: THREE.Material
}) {
  return (
    <group position={position}>
      <Float>
        <Text
          font="./fonts/bebas-neue-v9-latin-regular.woff"
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        geometry={geometry}
        material={material}
        position={[0, -0.1, 0]}
        receiveShadow
        scale={[4, 0.2, 4]}
      />
    </group>
  )
}
