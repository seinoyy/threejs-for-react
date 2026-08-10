import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Center, OrbitControls, Text3D, useTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'

const getPosition = () => {
  return (Math.random() - 0.5) * 10
}
const getScale = () => {
  return 0.2 + Math.random() * 0.2
}
const getAngle = () => {
  return Math.random() * Math.PI
}

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)

export default function Experience() {
  const matcapTexture = useTexture('./textures/7B5254_E9DCC7_B19986_C8AC91-512px.png', texture => {
    texture.colorSpace = THREE.SRGBColorSpace
  })

  const donuts = useRef<THREE.Mesh[]>([])

  const material = useMemo(
    () =>
      new THREE.MeshMatcapMaterial({
        matcap: matcapTexture,
      }),
    [matcapTexture]
  )

  const toruses = [...Array(100)].map((_, i) => (
    <mesh
      ref={element => {
        if (element) {
          donuts.current[i] = element
        }
      }}
      key={`torus-${i}`}
      geometry={torusGeometry}
      material={material}
      position={[getPosition(), getPosition(), getPosition()]}
      scale={getScale()}
      rotation={[getAngle(), getAngle(), 0]}
    />
  ))

  useFrame((_, delta) => {
    if (donuts.current) {
      for (const donut of donuts.current) {
        donut.rotation.y += delta * 0.2
      }
    }
  })

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          material={material}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          HELLO R3F
        </Text3D>
      </Center>

      {toruses}
    </>
  )
}
