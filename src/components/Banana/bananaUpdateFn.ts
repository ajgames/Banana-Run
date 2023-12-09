import { Euler, Matrix4, Quaternion, Vector3 } from 'three'
import { Banana, removeBanana } from './banana.state'

const ROTATION_POSITION_SCALER = 0.1
const ROTATION_SCALER = 40.1

/**
 * Updates the position and rotation of a banana based on its velocity
 * and rotational velocity.
 * @warning - This function mutates the banana object.
 * @param {number} delta - The time delta since the last update.
 * @param {Banana} self - The banana to update.
 * @returns {Vector3} The new position of the banana.
 * @todo - broadcast banana position to all peers
 * @todo - broadcast banana removed to all peers
 */
export default function bananaUpdateFn(delta: number, self: Banana) {
    const { position, id, velocity, rotationalVelocity, quaternion } = self

    const rotationMatrix = new Matrix4().makeRotationFromEuler(
        new Euler(
            rotationalVelocity.x * delta,
            rotationalVelocity.y * delta,
            rotationalVelocity.z * delta
        )
    )

    const rotatedVelocity = velocity.clone().applyMatrix4(rotationMatrix)
    const newPosition = position
        .clone()
        .add(rotatedVelocity.multiplyScalar(delta))

    const rotationQuaternion = new Quaternion().setFromEuler(
        new Euler(
            rotationalVelocity.x * delta * ROTATION_SCALER,
            rotationalVelocity.y * delta * ROTATION_SCALER,
            rotationalVelocity.z * delta * ROTATION_SCALER
        )
    )
    const newQuaternion = quaternion.clone().multiply(rotationQuaternion)

    self.position = newPosition
    self.quaternion = newQuaternion
    self.rotation = new Euler().setFromQuaternion(self.quaternion)

    if (position.y <= 0) {
        removeBanana(id)
        return
    }
    return position
}
