import ElementaryPractice from '@/ElementaryPractice/ElementaryPractice'
import FiberApp from '@/FiberApp/FiberApp'

const APP_MODE: 'ELEMENTARY' | 'FIBER' = 'FIBER' // 'ELEMENTARY' | 'FIBER'

const App = () => {
  return APP_MODE === 'FIBER' ? <FiberApp /> : <ElementaryPractice />
}

export default App
