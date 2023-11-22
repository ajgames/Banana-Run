import { Euler, Vector3 } from 'three'
import { self } from '../../players.state'

function throwBanana(
    startPosition: Vector3,
    launchVelocity: Vector3,
    rotationalVelocity: Vector3
) {
    const id = Date.now().toString() // Simple unique ID
    bananas[id] = {
        id,
        playerId: self.id,
        position: startPosition,
        velocity: launchVelocity,
        rotation: new Euler().setFromVector3(rotationalVelocity),
        rotationalVelocity,
        update: (delta: number) => {
            bananaUpdateFn(delta, bananas[id])
        },
    }
    // @todo - broadcast the banana to call peers
    // console.log(bananas[id].position)
    return id
}

function bananaUpdateFn(delta: number, self: Banana) {
    const { position, id, velocity, rotationalVelocity, rotation } = self
    // Update position based on velocity and delta
    self.position = new Vector3(
        position.x + velocity.x * delta,
        position.y + velocity.y * delta,
        position.z + velocity.z * delta
    )
    // Update rotation based on rotational velocity and delta
    // The rotation for each axis is increased by the rotational velocity for that axis times delta
    self.rotation = new Euler(
        rotation.x + rotationalVelocity.x * delta,
        rotation.y + rotationalVelocity.y * delta,
        rotation.z + rotationalVelocity.z * delta
    )
    if (position.y <= 0) {
        // @todo - broadcast banana removed to all peers
        return removeBanana(id)
    }
    // @todo - broadcast banana position to all peers
    return position
}

function removeBanana(id: string) {
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
