import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { updateCameraPosition } from './networkManager/updateCameraPosition'
import { self } from '../players.state'

type KeyState = {
    [key: string]: boolean
}

const speed = 1
const CENTER = new Vector3(0, 1, 0)

const Move: React.FC = () => {
    const { camera } = useThree()
    // const velocity = useRef(new Vector3(0, 0, 0))
    // const direction = useRef(new Vector3())
    const keys = useRef<KeyState>({
        KeyD: false,
        KeyA: false,
        KeyS: false,
        KeyW: false,
    })
    const lastExecuted = useRef(0)
    const frameInterval = 1 / 60 // Interval for 30 FPS

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keys.current[e.code] = true
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            keys.current[e.code] = false
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useFrame((state, delta) => {
        camera.getWorldDirection(self.direction)

        // Lock y-axis
        self.direction.y = 0
        // Assuming 'keys' is an object that holds your keypress states
        if (keys.current['KeyW']) {
            self.velocity.add(
                self.direction.clone().multiplyScalar(delta * speed)
            )
        }
        if (keys.current['KeyS']) {
            self.velocity.add(
                self.direction.clone().multiplyScalar(-delta * speed)
            )
        }
        if (keys.current['KeyA']) {
            self.velocity.add(
                self.direction
                    .clone()
                    .cross(CENTER)
                    .multiplyScalar(-delta * speed)
            )
        }
        if (keys.current['KeyD']) {
            self.velocity.add(
                self.direction
                    .clone()
                    .cross(CENTER)
                    .multiplyScalar(delta * speed)
            )
        }
        camera.position.add(self.velocity)
        // Check if the interval since the last execution is greater than or equal to the frame interval
        if (state.clock.elapsedTime - lastExecuted.current >= frameInterval) {
            lastExecuted.current = state.clock.elapsedTime
            updateCameraPosition(camera.position)
        }
        // damp the velocity for next frame
        self.velocity.multiplyScalar(0.9)
    })

    return null
}

export default Move
