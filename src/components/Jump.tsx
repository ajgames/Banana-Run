import { useEffect, useState, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'

const Jump: React.FC = () => {
    const { camera } = useThree()
    const [isJumping, setIsJumping] = useState(false)
    const [totalTime, setTotalTime] = useState(0)
    const startHeight = useRef(camera.position.y)

    useFrame((_, delta) => {
        if (!isJumping) return

        setTotalTime((prevTime) => prevTime + delta)
        // Simulate a simple jump using a parabola: y = ax^2 + bx + c
        const height = -4 * Math.pow(totalTime, 2) + 4 * totalTime
        camera.position.y = startHeight.current + height

        if (totalTime >= 1) {
            // Reset
            setIsJumping(false)
            setTotalTime(0) // Reset totalTime to 0
            camera.position.y = startHeight.current
        }
    })

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && !isJumping) {
                setIsJumping(true)
                setTotalTime(0) // Reset the totalTime
                startHeight.current = camera.position.y
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isJumping, camera.position.y])

    return null
}

export default Jump
