import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, type RootState } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
  type InstancedRigidBodyProps,
  type RapierRigidBody,
} from '@react-three/rapier'

const getInstancedRigidBodyProps = (index: number): InstancedRigidBodyProps => ({
  key: `instance-${index}`,
  position: [(Math.random() - 0.5) * 8, 6 + index * 2, (Math.random() - 0.5) * 8],
  rotation: [Math.random(), Math.random(), Math.random()],
})

export default function Experience() {
  const cubesCount = 300

  const cube = useRef<RapierRigidBody>(null)
  const twister = useRef<RapierRigidBody>(null)
  const hitSoundRef = useRef<HTMLAudioElement>(null)

  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = []

    for (let i = 0; i < cubesCount; i++) {
      instances.push(getInstancedRigidBodyProps(i))
    }

    return instances
  }, [])

  const hamburger = useGLTF('./models/hamburger.glb')

  const cubeJump = () => {
    if (cube.current) {
      const mass = cube.current.mass()
      cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 }, false)
      cube.current.applyTorqueImpulse(
        { x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 },
        false
      )
    }
  }

  const collisionEnter = () => {
    if (hitSoundRef.current) {
      hitSoundRef.current.currentTime = 0
      hitSoundRef.current.volume = Math.random()
      hitSoundRef.current.play()
    }
  }

  useEffect(() => {
    if (!hitSoundRef.current) {
      hitSoundRef.current = new Audio()
      hitSoundRef.current.src = './sound/hit.mp3'
    }
    return () => {
      if (hitSoundRef.current) {
        hitSoundRef.current.pause()
        hitSoundRef.current = null
      }
    }
  }, [])

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime()

    const eulerRotation = new THREE.Euler(0, time * 3, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)
    const angle = time * 0.5
    const x = Math.cos(angle) * 2
    const z = Math.sin(angle) * 2
    if (twister.current) {
      twister.current.setNextKinematicRotation(quaternionRotation)
      twister.current.setNextKinematicTranslation({ x, y: -0.8, z })
    }
  })

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug={false} gravity={[0, -9.08, 0]}>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
          onCollisionEnter={collisionEnter}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={2} />
        </RigidBody>

        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody ref={twister} position={[0, -0.8, 0]} friction={0} type="kinematicPosition">
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive object={hamburger.scene} scale={0.5} />
          <CylinderCollider args={[0.5, 1.25]} position={[-0.42, 0.74, 0.28]} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        <InstancedRigidBodies instances={instances}>
          <instancedMesh castShadow args={[undefined, undefined, cubesCount]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  )
}
