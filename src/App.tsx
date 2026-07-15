import ElementaryPractice from '@/ElementaryPractice/ElementaryPractice'
import FiberApp from '@/FiberApp/FiberApp'
import DreiApp from './DreiApp'
import DebugApp from './DebugApp'

export default function App() {
  const getApp = (appMode: 'ELEMENTARY' | 'FIBER' | 'DREI' | 'DEBUG') => {
    switch (appMode) {
      case 'ELEMENTARY':
        return <ElementaryPractice />
      case 'FIBER':
        return <FiberApp />
      case 'DREI':
        return <DreiApp />
      case 'DEBUG':
        return <DebugApp />
      default:
        return null
    }
  }

  return getApp('DEBUG')
}
