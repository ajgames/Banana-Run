import { Vector3 } from 'three'
import { PEER_ID } from '.'
import { players, self } from '../../players.state'

// The action payload as per your definition
type UpdatePlayerPositionPayload = {
    action: 'updatePlayerPosition'
    id: string
    position: Vector3
}

// Redux action for updating the camera position
export function updateCameraPosition(newPosition: Vector3) {
    // Check if the position is different from the current position
    if (vectorsEqual(self.position, newPosition)) {
        // Position hasn't changed, so just return
        return
    }
    self.position.setX(newPosition.x)
    self.position.setY(newPosition.y)
    self.position.setZ(newPosition.z)
    // Broadcast the new position to all peers
    for (const playerId in players) {
        if (!players[playerId].connection) {
            return
        }
        const payload: UpdatePlayerPositionPayload = {
            action: 'updatePlayerPosition',
            id: PEER_ID,
            position: newPosition,
        }
        // Here you need to serialize your Vector3 if your method of communication requires it
        // For example, converting Vector3 to an array:
        const message = {
            ...payload,
            position: [
                payload.position.x,
                payload.position.y,
                payload.position.z,
            ],
        }
        // Send the message through the WebRTC connection
        // This assumes you have a data channel already established for sending the data
        players[playerId].connection?.send(JSON.stringify(message))
    }
}

// Helper function to compare Vector3 objects
function vectorsEqual(v1: Vector3, v2: Vector3) {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z
}
