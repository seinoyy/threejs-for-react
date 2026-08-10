import {
  shaderMaterial,
  Center,
  OrbitControls,
  Sparkles,
  useGLTF,
  useTexture,
} from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import portalVertexShader from '@/shaders/portal/vertex.glsl'
import portalFragmentShader from '@/shaders/portal/fragment.glsl'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000'),
  },
  portalVertexShader,
  portalFragmentShader
)

const CustMaterial = extend(PortalMaterial)

export default function Experience() {
  const { nodes } = useGLTF('./models/bake-scene/bake-scene.glb')
  const bakedTexture = useTexture('./models/bake-scene/baked.jpg', texture => {
    texture.flipY = false
  })

  const portalMaterial = useRef<any>(null)

  useFrame((_, delta) => {
    if (portalMaterial.current) {
      portalMaterial.current.uTime += delta
    }
  })

  const scene = () => {
    const baked = nodes.baked as THREE.Mesh
    const poleLightA = nodes.poleLightA as THREE.Mesh
    const poleLightB = nodes.poleLightB as THREE.Mesh
    const portalLight = nodes.portalLight as THREE.Mesh

    const poleLightMaterial = new THREE.MeshBasicMaterial({
      color: '#ffffe5',
    })

    return (
      <Center>
        <mesh geometry={baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh
          geometry={poleLightA.geometry}
          material={poleLightMaterial}
          position={poleLightA.position}
        />

        <mesh
          geometry={poleLightB.geometry}
          material={poleLightMaterial}
          position={poleLightB.position}
        />

        <mesh
          geometry={portalLight.geometry}
          position={portalLight.position}
          rotation={portalLight.rotation}
        >
          <CustMaterial ref={portalMaterial} />
        </mesh>
      </Center>
    )
  }

  return (
    <>
      <color args={['#030202']} attach="background" />

      <OrbitControls makeDefault />

      {scene()}

      <Sparkles size={6} scale={[4, 2, 4]} position-y={0.2} speed={0.2} count={40} />
    </>
  )
}
