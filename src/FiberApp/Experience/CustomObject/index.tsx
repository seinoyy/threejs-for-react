import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const getPosition = (verticesCount: number) => {
  const positions = new Float32Array(verticesCount * 3)

  for (let i = 0; i < verticesCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 3
    positions[i3 + 1] = (Math.random() - 0.5) * 3
    positions[i3 + 2] = (Math.random() - 0.5) * 3
  }
  return positions
}

const CustomObject = () => {
  const verticesCount = 10 * 3
  const geometryRef = useRef<THREE.BufferGeometry | null>(null)
  const positions = useMemo(() => getPosition(verticesCount), [verticesCount])

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.computeVertexNormals()
    }
  }, [])

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" count={verticesCount} args={[positions, 3]} />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default CustomObject
