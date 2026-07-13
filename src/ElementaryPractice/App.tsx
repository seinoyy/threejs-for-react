import { useMemo, useState } from 'react'
import Clicker from '@/ElementaryPractice/Clicker/Clicker'
import People from '@/ElementaryPractice/People/People'

const getColor = (): string => {
  return `hsl(${Math.random() * 360}, 100%, 70%)`
}

const App = ({
  clickersCount,
  children,
}: {
  clickersCount: number
  children?: React.ReactNode
}) => {
  const [hasClicker, setHasClicker] = useState(true)
  const [count, setCount] = useState(0)

  const list = useMemo(() => {
    return Array.from({ length: clickersCount }, (_, i) => ({
      name: `Count${String.fromCharCode(65 + i)}`,
      color: getColor(),
    }))
  }, [clickersCount])

  const toggleClickerClick = (): void => {
    setHasClicker(!hasClicker)
  }

  const increment = (): void => {
    setCount(count + 1)
  }

  const clickerElements = list.map(item => (
    <Clicker key={item.name} keyName={item.name} color={item.color} increment={increment} />
  ))

  return (
    <>
      {children}
      <div>Total count: {count}</div>
      <button onClick={toggleClickerClick}>{hasClicker ? 'Hide' : 'Show'}</button>
      {hasClicker && <>{clickerElements}</>}
      <People />
    </>
  )
}

export default App
