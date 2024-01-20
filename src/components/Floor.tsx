import { Plane } from '@react-three/drei'
import { RepeatWrapping, TextureLoader } from 'three'
import pitGround from '/assets/maps/forest-map/textures/pitground.001_baseColor.png'
import { RigidBody } from '@react-three/rapier'

const Floor: React.FC = () => {
    // Load the texture
    const texture = new TextureLoader().load(pitGround)

    // Tile the texture
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.repeat.set(60, 30) // Repeat 20 times on the x-axis and 10 times on the y-axis

    return (
        <RigidBody friction={0.5}>
            {/* ...other components */}
            <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial attach="material" map={texture} />
            </Plane>
        </RigidBody>
    )
}

export default Floor
