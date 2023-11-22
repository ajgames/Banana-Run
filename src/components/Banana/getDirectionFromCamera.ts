import { RootState } from 'react-three-fiber'
import { Camera, Vector3 } from 'three'

export function getDirectionFromCamera(state: RootState, camera: Camera) {
    // Normalize mouse coordinates
    const mouse3D = new Vector3(state.mouse.x, state.mouse.y, 0.5) // z = 0.5 for projecting into the scene
    mouse3D.unproject(camera)

    // Calculate the direction vector
    const dir = mouse3D.sub(camera.position).normalize()

    return dir
}
