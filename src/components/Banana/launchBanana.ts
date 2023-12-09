import { banana } from './banana.state'
import { self } from '../../players.state'
import { MouseDirectionState } from './ThrowBanana'
import getRotationalVelocity from './getRotationalVelocity'

const BANANA_SPEED_MIN = 1
const BANANA_SPEED_MAX = 10
const BANANA_SPEED_MULTIPLIER = 2
const BANANA_SPEED_MOUSE_HOLD_MULTIPLIER = 2
/**
 * Launches a banana from the player's position in the direction the camera is facing.
 * The banana is launched with a velocity based on the length of time the mouse was held down.
 * The banana is also given a rotational velocity based on the mouse start and end positions.
 *
 * @param mousePositions - The mouse positions and times.
 * @param camera - The camera from which the banana is launched.
 * @returns - The ID of the banana that was launched.
 */
export const launchBanana = (mousePositions: MouseDirectionState[]) => {
    if (mousePositions.length < 1) {
        return
    }
    const mouseStart = mousePositions[0]
    const mouseEnd = mousePositions[mousePositions.length - 1]
    const mouseHoldLength = mouseEnd.time - mouseStart.time

    const distanceInFront = 1 // The distance in front of the object
    const positionInFrontScaler = self.direction.multiplyScalar(distanceInFront)
    const startingPosition = self.position.clone().add(positionInFrontScaler)

    const speedOfBanana = clamp(
        BANANA_SPEED_MULTIPLIER *
            Math.exp(BANANA_SPEED_MOUSE_HOLD_MULTIPLIER * mouseHoldLength),
        BANANA_SPEED_MIN,
        BANANA_SPEED_MAX
    )
    const velocityScaler = self.direction.multiplyScalar(speedOfBanana)
    const startingVelocity = self.velocity.clone().add(velocityScaler)

    const rotationVelocity = getRotationalVelocity(mouseStart, mouseEnd)
    return banana.throw(startingPosition, startingVelocity, rotationVelocity)
}

/**
 * Clamps a value between a minimum and maximum value.
 * @param value
 * @param min
 * @param max
 * @returns
 */
const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max)
