import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import metalTexture from '/assets/banana-tag-2.png'
// import { useReducer } from 'react'
import { useFrame } from '@react-three/fiber'
import { Banana as BananaType } from './banana.state'

const Banana: React.FC<BananaType> = ({
    position,
    radius = 0.5,
    update,
    rotation,
}) => {
    // could also grab the banana from global state too
    // the question is: is this where I want to update the banana state?
    const texture = useLoader(TextureLoader, metalTexture)

    // const [, forceUpdate] = useReducer((x) => x + 1, 0)
    useFrame((_, delta) => {
        update(delta)
        // forceUpdate()
    })

    return (
        <mesh position={position} rotation={rotation}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial
                metalness={0.5}
                roughness={0.1}
                envMapIntensity={1.0}
                map={texture}
            />
        </mesh>
    )
}

export default Banana
