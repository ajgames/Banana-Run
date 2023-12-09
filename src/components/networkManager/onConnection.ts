import { DataConnection } from 'peerjs'
import { Vector3 } from 'three'
import { Player, players } from '../../players.state'

type UpdatePlayerPositionPayload = {
    action: 'updatePlayerPosition'
    position: number[]
}

//@note - not using this one but leaving here as the example for the TS Union option
type AddPlayerPayload = {
    action: 'addPlayer'
    data: Player // Assuming 'Player' is a type defined elsewhere
}
export type NetworkPayload = UpdatePlayerPositionPayload | AddPlayerPayload

/**
 * Handles setting connections for other peers currently online. This handles
 * both sides of the paths in that users can call this peer by ID then `peer.onConnection`
 * gets called, and then when we're connecting to other discovered peers we do
 * `peer.call('id', onConnection)`. So it's kind of like outgoing and incoming.
 * @param conn
 * @returns
 */
export default function onConnection(conn: DataConnection) {
    players[conn.peer] = {
        id: conn.peer,
        connection: conn,
        position: new Vector3(),
        velocity: new Vector3(),
        direction: new Vector3(),
    }
    // Handle new connection
    conn.on('open', () => console.log('Connected to: ' + conn.peer))

    // When data is received from <a connection
    //@ts-expect-error - the callback here is "unknown" and we're overriding because we know better
    conn.on('data', (data: string) => {
        let dataJson
        try {
            dataJson = JSON.parse(data)
        } catch (err) {
            console.log('Choked on {data}: ', data)
            //do nothing
            return
        }
        // console.log('Did not choke {dataJson} ', dataJson)
        // console.log(`player: `, players[conn.peer])
        if (dataJson.action === 'updatePlayerPosition') {
            players[conn.peer].position = new Vector3(
                dataJson.position[0],
                dataJson.position[1],
                dataJson.position[2]
            )
        } else {
            console.log('Received', data)
        }
    })

    // Give this guy the boot when he's outtie
    conn.on('close', () => {
        console.log(`yo, dawg, this guy left: `, conn.peer)
        delete players[conn.peer]
    })
    return
}
