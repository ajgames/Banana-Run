import { Vector3 } from 'three'
import { MouseDirectionState } from './ThrowBanana'

/**
 * Calculates the rotational velocity of a banana based on the mouse start and end positions.
 * @param {MouseDirectionState} mouseStart - The mouse start position and time.
 * @param {MouseDirectionState} mouseEnd - The mouse end position and time.
 * @returns {Vector3} The rotational velocity of the banana.
 */
export default function getRotationalVelocity(
    mouseStart: MouseDirectionState,
    mouseEnd: MouseDirectionState
) {
    const { direction: startDir, time: startTime } = mouseStart
    const { direction: endDir, time: endTime } = mouseEnd

    const timeDelta = endTime - startTime
    const rotationAxis = new Vector3(0, 0, 0)
        .crossVectors(startDir, endDir)
        .normalize()

    const rotationAngle = startDir.angleTo(endDir)

    const rotationalVelocity = rotationAxis.multiplyScalar(rotationAngle)

    return rotationalVelocity
}
