import { useMemo } from 'react'
import * as THREE from 'three'
import BlockStart from '../BlockStart'
import BlockSpike from '../BlockSpike'
import BlockLimbo from '../BlockLimbo'
import BlockAxe from '../BlockAxe'
import BlockEnd from '../BlockEnd'
import Bounds from '../Bounds'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategray' })

const getIndex = (length: number) => Math.floor(Math.random() * length)

const Level = ({ count = 5, types = [BlockSpike, BlockLimbo, BlockAxe], seed = 0 }) => {
  const blocks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const Block = types[getIndex(types.length)]
        return (
          <Block
            key={`block-${seed}-${i + 1}`}
            position={[0, 0, -4 * (i + 1)]}
            geometry={boxGeometry}
            floorMaterial={floor2Material}
            obstacleMaterial={obstacleMaterial}
          />
        )
      }),
    [count, types, seed]
  )
  return (
    <>
      <BlockStart position={[0, 0, 0]} geometry={boxGeometry} material={floor1Material} />

      {blocks}

      <BlockEnd
        position={[0, 0, -4 * (count + 1)]}
        geometry={boxGeometry}
        material={floor1Material}
      />

      <Bounds length={count + 2} geometry={boxGeometry} material={wallMaterial} />
    </>
  )
}

export { Level, BlockSpike, BlockLimbo, BlockAxe }
