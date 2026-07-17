import { useGLTF, Clone } from '@react-three/drei'

useGLTF.preload('./models/hamburger.glb')

export default function SceneModel() {
  const model = useGLTF('./models/hamburger.glb')

  return (
    <>
      <Clone object={model.scene} scale={0.7} position-x={-4} />
      <Clone object={model.scene} scale={0.7} position-x={0} />
      <Clone object={model.scene} scale={0.7} position-x={4} />
    </>
  )
}
