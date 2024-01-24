import {
    PointerLockControls,
    PointerLockControlsProps,
    Sky,
    Stars,
} from '@react-three/drei'
import NetworkManager from './networkManager/NetworkManager'
import Jump from './Jump'
import Floor from './Floor'
import Move from './Move'
import { useEffect, useReducer, useRef } from 'react'
import Monke from './Monke'
import { players } from '../players.state'
import { bananas } from './Banana/banana.state'
import { useFrame } from '@react-three/fiber'
import Banana from './Banana/Banana'
import ThrowBanana from './Banana/ThrowBanana'
import Drone from './Drone/Drone'
import Player from './Player/Player'

const RenderMonkes = () => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    useFrame(() => {
        forceUpdate()
    })
    return Object.values(players).map((monke) => (
        <Monke key={monke.id} position={monke.position} />
    ))
}

const RenderBananas = () => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    useFrame(() => {
        forceUpdate()
    })
    return Object.values(bananas).map((banana) => (
        <Banana key={banana.id} {...banana} />
    ))
}

const Scene: React.FC = () => {
    const pointerLock = useRef<PointerLockControlsProps>({})
    // Render Monke components for each player

    //this was to get "Pause" working and unlocking the mouse
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code == 'KeyP') {
                if (pointerLock.current.isLocked) {
                    //@ts-ignore we know it exists
                    pointerLock.current.unlock()
                } else {
                    //@ts-ignore we know for sure this exists
                    pointerLock.current.lock()
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [pointerLock])

    return (
        <>
            <NetworkManager />
            {/* Skybox */}
            <Sky sunPosition={[100, 100, 100]} />
            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={1}
                fade
            />

            {/* Lighting */}
            <directionalLight position={[10, 10, 5]} intensity={1.0} />
            <ambientLight intensity={0.7} />

            <Drone />

            <Player />

            <RenderMonkes />
            <RenderBananas />

            {/* Floor */}
            <Floor />
            {/* @ts-ignore some mis-matching with the ref types, no big deal */}
            <PointerLockControls ref={pointerLock} />

            <Jump />
            <Move />
            <ThrowBanana />
        </>
    )
}

export default Scene
