import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useKeyboardControls } from '@react-three/drei'
import { useFrame, type RootState } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, useRapier } from '@react-three/rapier'
import useGame from '@/stores/useGame'

export default function Player() {
  const body = useRef<RapierRigidBody>(null)
  const smoothedCameraPosition = useRef(new THREE.Vector3(10, 10, 10))
  const smoothedCameraTarget = useRef(new THREE.Vector3())
  const { rapier, world } = useRapier()
  const [subscribeKeys, getKeys] = useKeyboardControls()

  const start = useGame(state => state.start)
  const end = useGame(state => state.end)
  const restart = useGame(state => state.restart)
  const blocksCount = useGame(state => state.blocksCount)

  const jump = () => {
    if (body.current) {
      const origin = body.current.translation()
      origin.y -= 0.31
      const direction = new THREE.Vector3(0, -1, 0)
      const ray = new rapier.Ray(origin, direction)
      const hit = world.castRay(ray, 10, true)

      if (hit && hit.timeOfImpact < 0.15) {
        body.current.applyImpulse(new THREE.Vector3(0, 0.5, 0), true)
      }
    }
  }

  const playerControls = (delta: number) => {
    const { forward, backward, leftward, rightward } = getKeys()

    const impulse = new THREE.Vector3(0, 0, 0)
    const torque = new THREE.Vector3(0, 0, 0)

    const impulseStrength = 0.6 * delta
    const torqueStrength = 0.2 * delta

    if (forward) {
      impulse.z -= impulseStrength
      torque.x -= torqueStrength
    }

    if (rightward) {
      impulse.x += impulseStrength
      torque.z -= torqueStrength
    }

    if (backward) {
      impulse.z += impulseStrength
      torque.x += torqueStrength
    }

    if (leftward) {
      impulse.x -= impulseStrength
      torque.z += torqueStrength
    }

    if (body.current) {
      body.current.applyImpulse(impulse, true)
      body.current.applyTorqueImpulse(torque, true)
    }
  }

  const cameraControls = () => {
    const cameraPosition = new THREE.Vector3()
    const cameraTarget = new THREE.Vector3()
    if (body.current) {
      const bodyPosition = body.current.translation()
      cameraPosition.copy(bodyPosition)
      cameraPosition.y += 0.65
      cameraPosition.z += 2.25

      cameraTarget.copy(bodyPosition)
      cameraTarget.y += 0.25
    }
    return {
      cameraPosition,
      cameraTarget,
    }
  }

  const reset = () => {
    if (body.current) {
      body.current.setTranslation(new THREE.Vector3(0, 1, 0), true)
      body.current.setLinvel(new THREE.Vector3(0, 0, 0), true)
      body.current.setAngvel(new THREE.Vector3(0, 0, 0), true)
    }
  }

  useEffect(() => {
    useGame.subscribe(
      state => state.phase,
      value => {
        switch (value) {
          case 'ready':
            reset()
            break
          case 'playing':
            break
          case 'ended':
            break
          default:
            break
        }
      }
    )
    const unsubscribeJump = subscribeKeys(
      state => state.jump,
      value => {
        if (value) {
          jump()
        }
      }
    )
    const unsubscribeAny = subscribeKeys(() => {
      start()
    })
    return () => {
      unsubscribeJump()
      unsubscribeAny()
    }
  }, [])

  useFrame((state: RootState, delta: number) => {
    playerControls(delta)
    const { cameraPosition, cameraTarget } = cameraControls()
    smoothedCameraPosition.current.lerp(cameraPosition, 5 * delta)
    smoothedCameraTarget.current.lerp(cameraTarget, 5 * delta)
    state.camera.position.copy(smoothedCameraPosition.current)
    state.camera.lookAt(smoothedCameraTarget.current)
    if (body.current) {
      const bodyPosition = body.current.translation()
      if (bodyPosition.z < -blocksCount * 4 - 2) {
        end()
      }
      if (bodyPosition.y < -4) {
        restart()
      }
    }
  })

  return (
    <RigidBody
      ref={body}
      colliders="ball"
      position={[0, 1, 0]}
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  )
}
