import ElementaryPractice from '@/ElementaryPractice/ElementaryPractice'
import FiberApp from '@/FiberApp/FiberApp'
import DreiApp from './DreiApp'
import DebugApp from './DebugApp'
import EnvironmentApp from './EnvironmentApp'

export default function App() {
  const getApp = (appMode: 'ELEMENTARY' | 'FIBER' | 'DREI' | 'DEBUG' | 'ENVIRONMENT') => {
    switch (appMode) {
      case 'ELEMENTARY':
        return <ElementaryPractice />
      case 'FIBER':
        return <FiberApp />
      case 'DREI':
        return <DreiApp />
      case 'DEBUG':
        return <DebugApp />
      case 'ENVIRONMENT':
        return <EnvironmentApp />
      default:
        return null
    }
  }

  return getApp('ENVIRONMENT')
}
