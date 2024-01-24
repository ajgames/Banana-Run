import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { mousePositionRelativeToCamera } from './mousePositionRelativeToCamera'
import { launchBanana } from './launchBanana'

/**
 * This is the state of the mouse position relative to the camera
 * at a given time.
 */
export type MouseDirectionState = {
    direction: Vector3
    time: number
}

/**
 * This component listens for mouse clicks and records the mouse position
 * relative to the camera at a given time.
 */
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
            launchBanana(mousePositions.current)
        }
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [camera])

    useFrame((state) => {
        if (clickState.current.holding) {
            mousePositions.current.push({
                time: state.clock.getElapsedTime(),
                direction: mousePositionRelativeToCamera(state, camera),
            })
        }
    })

    return null
}

export default ThrowBanana
