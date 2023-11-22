import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { banana } from './banana.state'
import { self } from '../../players.state'
// import { calculateRotation } from './calculateRotation'
import { getDirectionFromCamera } from './getDirectionFromCamera'

type MouseDirectionState = {
    direction: Vector3
    time: number
}

function getRotationalVelocity(
    endPos: Vector3,
    startPos: Vector3,
    timeDelta: number
) {
    return new Vector3().subVectors(endPos, startPos).divideScalar(timeDelta)
}

const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max)

const ThrowBanana: React.FC = () => {
    const { camera } = useThree()
    const mousePositions = useRef<MouseDirectionState[]>([])
    const clickState = useRef({
        holding: false,
    })

    useEffect(() => {
        const handleMouseDown = () => {
            clickState.current.holding = true
            mousePositions.current = []
        }

        const handleMouseUp = () => {
            clickState.current.holding = false
            launchBanana()
        }

        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    const launchBanana = () => {
        const positions = mousePositions.current
        if (positions.length < 1) {
            return
        }
        const mouseStart = positions[0]
        const mouseEnd = positions[positions.length - 1]
        const mouseHoldLength = mouseEnd.time - mouseStart.time

        /** Get starting position */
        // Step 1: Get the direction the camera is facing
        const cameraDirection = new Vector3()
        camera.getWorldDirection(cameraDirection) // i think this could be grabbed from the self:Player
        // Step 2: Normalize the direction vector
        // cameraDirection.normalize()
        // Step 3: Scale the direction vector
        const distanceInFront = 1 // The distance in front of the object
        const positionInFrontScaler =
            cameraDirection.multiplyScalar(distanceInFront)
        const startingPosition = self.position
            .clone()
            .add(positionInFrontScaler)

        const speedOfBanana = clamp(2 * Math.exp(2 * mouseHoldLength), 1, 100)
        const velocityScaler = cameraDirection.multiplyScalar(speedOfBanana)
        const startingVelocity = self.velocity.current
            .clone()
            .add(velocityScaler)

        const rotationVelocity = getRotationalVelocity(
            mouseStart.direction,
            mouseEnd.direction,
            mouseEnd.time - mouseStart.time
        )
        banana.throw(startingPosition, startingVelocity, rotationVelocity)
    }

    useFrame((state) => {
        if (clickState.current.holding) {
            // Convert the 2D mouse position to a 3D vector
            // const mouse3D = new Vector3(state.mouse.x, state.mouse.y, 0)
            // camera.localToWorld(mouse3D)
            mousePositions.current.push({
                time: state.clock.getElapsedTime(),
                direction: getDirectionFromCamera(state, camera),
            })
        }
    })

    return null
}

export default ThrowBanana
