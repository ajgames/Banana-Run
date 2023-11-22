import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector3 } from 'three'
import { useRef } from 'react'

type MonkeProps = {
    position?: Vector3 // You can specify more props as needed
}

const Monke: React.FC<MonkeProps> = ({ position = new Vector3(0, 0, 0) }) => {
    const gltf = useLoader(GLTFLoader, './assets/characters/monkey/scene.gltf')
    const ref = useRef()

    return <primitive object={gltf.scene} position={position} ref={ref} />
}

export default Monke
