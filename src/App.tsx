import ElementaryPractice from '@/ElementaryPractice/ElementaryPractice'
import FiberApp from '@/FiberApp/FiberApp'
import DreiApp from './DreiApp'
import DebugApp from './DebugApp'
import EnvironmentApp from './EnvironmentApp'
import ModelApp from './ModelApp'
import TextApp from './TextApp'

export default function App() {
  const getApp = (
    appMode: 'ELEMENTARY' | 'FIBER' | 'DREI' | 'DEBUG' | 'ENVIRONMENT' | 'MODEL' | 'TEXT'
  ) => {
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
      case 'MODEL':
        return <ModelApp />
      case 'TEXT':
        return <TextApp />
      default:
        return null
    }
  }

  return getApp('TEXT')
}
