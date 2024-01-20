import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Scene from './components/Scene'
import { Suspense, useEffect } from 'react'
import {} from './redux/store'

function App() {
    useEffect(() => {
        document.getElementById('stars-bg')?.remove()
    }, [])
    return (
        <div id="canvas-container" style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [0, 1.6, 3], fov: 70 }}>
                <Suspense>
                    <Physics gravity={[0, -9.8, 0]}>
                        <Scene />
                    </Physics>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default App
