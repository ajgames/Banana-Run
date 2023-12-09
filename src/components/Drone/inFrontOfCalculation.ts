import { Vector3 } from 'three'

export default function inFrontOfCalculation(
    currentPosition: Vector3,
    direction: Vector3,
    distance: number
) {
    const scaledDirection = direction.normalize().multiplyScalar(distance)
    return currentPosition.add(scaledDirection)
}
