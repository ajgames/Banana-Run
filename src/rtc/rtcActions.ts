import { Vector3 } from 'three'

// This function creates a connection and sends data to the connected peer
function connectAndSendData(
    peer: Peer,
    remotePeerId: string,
    playerId: string,
    position: Vector3
) {
    const conn = peer.connect(remotePeerId)
    conn.on('open', () => {
        // Regularly send the player position data
        setInterval(() => {
            const playerPositionUpdate = {
                playerId: playerId,
                position: position,
            }
            conn.send(playerPositionUpdate)
        }, 100) // Adjust the interval as appropriate for your game's needs
    })

    // Handle the data reception from another peer
    conn.on('data', (data) => {
        // Update the remote player's position in your game
        updatePlayerPosition(
            data.playerId,
            new Vector3(data.position.x, data.position.y, data.position.z)
        )
    })
}

// This function updates a player's position based on received data
function updatePlayerPosition(playerId: string, newPosition: Vector3) {
    // Implementation of how you update the player's position in your game's state
}
