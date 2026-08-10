import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

useGLTF.preload('./models/hamburger.glb')

export default function Hamburger(props) {
  const { nodes, materials } = useGLTF('./models/hamburger.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes['立方体'] as THREE.Mesh).geometry}
        material={materials['面包材质']}
        position={[-0.824, 0.261, 0.489]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes['立方体001'] as THREE.Mesh).geometry}
        material={materials['肉饼材质']}
        position={[-0.824, 1.131, 0.489]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes['平面'] as THREE.Mesh).geometry}
        material={materials['奶酪材质']}
        position={[-0.824, 1.544, 0.489]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes['立方体002'] as THREE.Mesh).geometry}
        material={materials['面包材质']}
        position={[-0.824, 2.407, 0.489]}
        rotation={[0, 0, 3.138]}
      />
    </group>
  )
}
