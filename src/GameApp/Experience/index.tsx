import { Physics } from '@react-three/rapier'
import Lights from './Lights'
import { Level, BlockSpike, BlockLimbo, BlockAxe } from './Level'
import Player from './Player'
import useGame from '@/stores/useGame'

export default function Experience() {
  const blocksCount = useGame(state => state.blocksCount)
  const blockSeed = useGame(state => state.blockSeed)

  return (
    <>
      <color args={['#bdedfc']} attach="background" />

      <Physics>
        <Lights />
        <Level count={blocksCount} types={[BlockSpike, BlockLimbo, BlockAxe]} seed={blockSeed} />
        <Player />
      </Physics>
    </>
  )
}
