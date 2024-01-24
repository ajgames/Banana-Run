import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import metalTexture from '/assets/banana-tag-2.png'
import { Banana as BananaType } from './banana.state'
import { RigidBody } from '@react-three/rapier'

/**
 * This component renders a banana.
 * @param position The position of the banana.
 * @param radius The radius of the banana.
 * @param update A function that updates the banana's state.
 * @param rotation The rotation of the banana.
 */
const Banana: React.FC<BananaType> = ({ position, rotation }) => {
    const texture = useLoader(TextureLoader, metalTexture)

    return (
        <RigidBody
            colliders="cuboid"
            restitution={0.5}
            friction={0.8}
            mass={20}
        >
            <mesh position={position} rotation={rotation}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    metalness={0.5}
                    roughness={0.1}
                    envMapIntensity={1.0}
                    map={texture}
                />
            </mesh>
        </RigidBody>
    )
}

export default Banana
