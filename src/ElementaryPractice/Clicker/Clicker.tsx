import { useState, useEffect, useRef } from 'react'

const Clicker = ({
  keyName,
  color,
  increment,
}: {
  keyName: string
  color: string
  increment?: () => void
}) => {
  const keyNameRef = useRef('')
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = 'papayawhip'
      buttonRef.current.style.color = 'salmon'
    }
    return () => {
      localStorage.removeItem(keyNameRef.current)
    }
  }, [])

  useEffect(() => {
    keyNameRef.current = keyName
    const savedCount = localStorage.getItem(keyNameRef.current) ?? '0'
    setCount(parseFloat(savedCount))
  }, [keyName])

  useEffect(() => {
    localStorage.setItem(keyNameRef.current, count.toString())
  }, [count])

  const handleClick = (): void => {
    setCount(count + 1)
    increment?.()
  }

  return (
    <div>
      <div style={{ color }}>Clicks count: {count}</div>
      <button ref={buttonRef} onClick={handleClick}>
        Click me
      </button>
    </div>
  )
}

export default Clicker
