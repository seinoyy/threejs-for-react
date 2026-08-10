import { forwardRef } from 'react'
import DrunkEffect from './DrunkEffect'

const Drunk = (props: { frequency: number; amplitude: number; blendFunction: number }, ref) => {
  const effect = new DrunkEffect(props)

  return <primitive ref={ref} object={effect} />
}

export default forwardRef(Drunk)
