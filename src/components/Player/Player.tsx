import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { RapierRigidBody, RigidBody, quat, vec3 } from '@react-three/rapier'
import { self } from '../../players.state'
import { Mesh } from 'three'

const Player = () => {
    const ref = useRef<Mesh>(null)
    useFrame(() => {
        ref?.current?.position.set(2, 2, 2)
        // ref?.current?.position.set(
        //     self.position.x,
        //     self.position.y - 10,
        //     self.position.z - 10
        // )
    })
    return (
        <RigidBody colliders="cuboid">
            <mesh ref={ref}>
                <boxGeometry args={[1, 1, 1]} />
            </mesh>
        </RigidBody>
    )
}

export default Player

const JakePlayer = () => {
    const rigidBody = useRef<RapierRigidBody>(null)

    useEffect(() => {
        if (rigidBody.current) {
            const position = vec3(rigidBody.current.translation())
            const quaternion = quat(rigidBody.current.rotation())
            // const eulerRot = euler().setFromQuaternion(
            //     quat(rigidBody.current.rotation())
            // )

            rigidBody.current.setTranslation(position, true)
            rigidBody.current.setRotation(quaternion, true)
            rigidBody.current.setAngvel({ x: 0, y: 2, z: 0 }, true)
        }
    }, [])

    return (
        <RigidBody ref={rigidBody}>
            <mesh>
                <boxBufferGeometry />
                <meshStandardMaterial />
            </mesh>
        </RigidBody>
    )
}
