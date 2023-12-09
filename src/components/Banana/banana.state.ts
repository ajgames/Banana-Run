import { Euler, Quaternion, Vector3 } from 'three'
import { self } from '../../players.state'
import bananaUpdateFn from './bananaUpdateFn'

function throwBanana(
    startPosition: Vector3,
    launchVelocity: Vector3,
    rotationalVelocity: Vector3
) {
    const id = Date.now().toString() // Simple unique ID
    const rotation = new Euler(
        rotationalVelocity.x,
        rotationalVelocity.y,
        rotationalVelocity.z
    )
    bananas[id] = {
        id,
        playerId: self.id,
        position: startPosition,
        velocity: launchVelocity,
        quaternion: new Quaternion().setFromEuler(rotation),
        rotation,
        rotationalVelocity,
        update: (delta: number) => {
            bananaUpdateFn(delta, bananas[id])
        },
    }
    // @todo - broadcast the banana to call peers
    // console.log(bananas[id].position)
    return id
}

export function removeBanana(id: string) {
    delete bananas[id]
}

export const banana = {
    throw: throwBanana,
    remove: removeBanana,
}

export type Banana = {
    id: string
    position: Vector3
    velocity: Vector3
    rotation: Euler
    quaternion: Quaternion
    rotationalVelocity: Vector3
    /** Used to hold onto which player threw this banana */
    playerId: string
    /** called when we're ready to increment the banana's current state/position */
    update: (delta: number) => Vector3 | void
    /** Adding a section for custome properties to style a banana uniquely */
    radius?: number // Optional prop for radius
}

export type BananaState = Record<string, Banana>

export const bananas: BananaState = {}
