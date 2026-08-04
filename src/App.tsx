import ElementaryPractice from '@/ElementaryPractice/ElementaryPractice'
import FiberApp from '@/FiberApp/FiberApp'
import DreiApp from './DreiApp'
import DebugApp from './DebugApp'
import EnvironmentApp from './EnvironmentApp'
import ModelApp from './ModelApp'
import TextApp from './TextApp'
import PortalScene from './PortalScene'
import PointerApp from './PointerApp'
import PostProcessing from './PostProcessing'
import PortfolioApp from './PortfolioApp'
import PhysicsApp from './PhysicsApp'

export default function App() {
  const getApp = (
    appMode:
      | 'ELEMENTARY'
      | 'FIBER'
      | 'DREI'
      | 'DEBUG'
      | 'ENVIRONMENT'
      | 'MODEL'
      | 'TEXT'
      | 'PORTALSSCENE'
      | 'POINTER'
      | 'POSTPROCESSING'
      | 'PORTFOLIO'
      | 'PHYSICS'
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
      case 'PORTALSSCENE':
        return <PortalScene />
      case 'POINTER':
        return <PointerApp />
      case 'POSTPROCESSING':
        return <PostProcessing />
      case 'PORTFOLIO':
        return <PortfolioApp />
      case 'PHYSICS':
        return <PhysicsApp />
      default:
        return null
    }
  }

  return getApp('PHYSICS')
}
