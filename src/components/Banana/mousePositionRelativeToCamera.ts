import { RootState } from 'react-three-fiber'
import { Camera, Vector3 } from 'three'

/**
 * Calculates the direction vector from the camera to a given point in 3D space.
 *
 * The function uses the mouse coordinates from the state to determine the point in 3D space
 * and then calculates the direction vector from the camera position to this point.
 *
 * @param {RootState} state - The current state of the react-three-fiber scene.
 * @param {Camera} camera - The camera from which the direction is calculated.
 * @returns {Vector3} The normalized direction vector from the camera to the 3D point.
 */
export function mousePositionRelativeToCamera(
    state: RootState,
    camera: Camera
) {
    // Normalize mouse coordinates
    const mouse3D = new Vector3(state.mouse.x, state.mouse.y, 0.5)
    mouse3D.unproject(camera)

    // Calculate the direction vector
    const dir = mouse3D.sub(camera.position).normalize()

    return dir
}
