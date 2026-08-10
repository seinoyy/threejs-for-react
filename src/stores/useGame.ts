import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export type GameState = {
  blocksCount: number
  startTime: number
  endTime: number
  phase: 'ready' | 'playing' | 'ended'
  blockSeed: number
  start: () => void
  end: () => void
  restart: () => void
}

export default create(
  subscribeWithSelector((set): GameState => ({
    blocksCount: 10,
    startTime: 0,
    endTime: 0,
    phase: 'ready',
    blockSeed: 0,
    start: () => {
      set(state => {
        if (state.phase === 'ready') {
          return { phase: 'playing', startTime: Date.now() }
        } else {
          return {}
        }
      })
    },
    end: () => {
      set(state => {
        if (state.phase === 'playing') {
          return { phase: 'ended', endTime: Date.now() }
        } else {
          return {}
        }
      })
    },
    restart: () => {
      set(state => {
        if (state.phase === 'ended' || state.phase === 'playing') {
          return { phase: 'ready', blockSeed: Math.random() }
        } else {
          return {}
        }
      })
    },
  }))
)
