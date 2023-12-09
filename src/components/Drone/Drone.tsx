import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import metalTexture from '/assets/banana-tag-2.png'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { self } from '../../players.state'
import { Vector3 } from 'three'
import inFrontOfCalculation from './inFrontOfCalculation'

/**
 * @todo fill in this description
 */
const Drone: React.FC = () => {
    const texture = useLoader(TextureLoader, metalTexture)
    const meshRef = useRef<THREE.Mesh>(null!)
    const initialPosition = inFrontOfCalculation(
        self.position,
        self.direction,
        100
    )
    const velocity = new Vector3(0, 0, 0)
    const gravity = new Vector3(0, -9.81, 0)
    const bounceFactor = 0.3
    const halfHeight = 1

    const outsideForce = new Vector3(0, 0, 0)
    const thrustPercentage = useRef(0)
    const maxForce = 35
    const maxVelocity = 5
    const forceIncreaseRate = 2000
    const forceDecreaseRate = 10000

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'k') {
                thrustPercentage.current = 100 // Full thrust
            }
        }
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'k') {
                thrustPercentage.current = 0 // No thrust
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useFrame((_, delta) => {
        const targetForce = (maxForce * thrustPercentage.current) / 100
        if (outsideForce.length() < targetForce) {
            outsideForce.setY(
                Math.min(
                    outsideForce.y + forceIncreaseRate * delta,
                    targetForce
                )
            )
        } else {
            outsideForce.setY(
                Math.max(
                    outsideForce.y - forceDecreaseRate * delta,
                    targetForce
                )
            )
        }
        const newVelocity = velocity
            .clone()
            .add(outsideForce.clone().multiplyScalar(delta))
        if (newVelocity.length() > maxVelocity) {
            //do nothing
            console.log('max velocity reached, bro')
        } else {
            velocity.copy(newVelocity)
        }
        velocity.add(gravity.clone().multiplyScalar(delta))

        const newPos = meshRef.current.position
            .clone()
            .add(velocity.clone().multiplyScalar(delta))
        if (newPos.y > 10) {
            console.log('you hit the ceiling bro')
        } else {
            meshRef.current.position.copy(newPos)
        }
        if (meshRef.current.position.y - halfHeight <= 0) {
            meshRef.current.position.y = halfHeight
            velocity.y = -velocity.y * bounceFactor
        }
    })

    return (
        <mesh position={initialPosition} ref={meshRef}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
                metalness={0.5}
                roughness={0.1}
                envMapIntensity={1.0}
                map={texture}
            />
        </mesh>
    )
}

export default Drone
