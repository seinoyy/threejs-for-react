import ElementaryPractice from '@/ElementaryPractice/ElementaryPractice'
import FiberApp from '@/FiberApp/FiberApp'
import DreiApp from './DreiApp'

export default function App() {
  const getApp = (appMode: 'ELEMENTARY' | 'FIBER' | 'DREI') => {
    switch (appMode) {
      case 'ELEMENTARY':
        return <ElementaryPractice />
      case 'FIBER':
        return <FiberApp />
      case 'DREI':
        return <DreiApp />
      default:
        return null
    }
  }

  return getApp('DREI')
}
