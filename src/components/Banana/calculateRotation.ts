import { Euler, Quaternion, Vector3 } from 'three'

export function calculateRotation(startVec: Vector3, endVec: Vector3) {
    // Assuming startVec and endVec are Vector3 and normalized

    // Project onto a virtual sphere
    const startProjected = projectToSphere(startVec)
    const endProjected = projectToSphere(endVec)

    // Calculate axis (cross product) and angle (dot product and arccosine)
    const axis = new Vector3().crossVectors(startProjected, endProjected)
    const angle = Math.acos(startProjected.dot(endProjected))

    // Create a quaternion or Euler rotation based on this axis and angle
    const quaternion = new Quaternion().setFromAxisAngle(
        axis.normalize(),
        angle
    )
    return new Euler().setFromQuaternion(quaternion)
}

function projectToSphere(vec: Vector3) {
    // Implement the logic to project the 2D point onto the 3D sphere
    // This is an example; actual implementation may vary based on sphere radius and other factors
    const radius = 1 // Radius of the virtual trackball
    const x = vec.x,
        y = vec.y
    const lengthSquared = x * x + y * y
    const z =
        lengthSquared <= (radius * radius) / 2
            ? Math.sqrt(radius * radius - lengthSquared) // On sphere
            : (radius * radius) / 2 / Math.sqrt(lengthSquared) // On hyperbola

    return new Vector3(x, y, z)
}
