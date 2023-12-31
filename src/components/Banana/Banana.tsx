import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import metalTexture from '/assets/banana-tag-2.png'
import { useFrame } from '@react-three/fiber'
import { Banana as BananaType } from './banana.state'

/**
 * This component renders a banana.
 * @param position The position of the banana.
 * @param radius The radius of the banana.
 * @param update A function that updates the banana's state.
 * @param rotation The rotation of the banana.
 * @returns A React Three Fiber mesh.
 */
const Banana: React.FC<BananaType> = ({
    position,
    radius = 0.5,
    update,
    rotation,
}) => {
    // could also grab the banana from global state too
    // the question is: is this where I want to update the banana state?
    const texture = useLoader(TextureLoader, metalTexture)

    useFrame((_, delta) => {
        update(delta)
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
