import onConnection from './onConnection'
import { DataConnection } from 'peerjs'
import { peer } from '.'
/**
 * Runs
 * @param setPeer
 * @param dispatch
 * @returns
 */

export default function main() {
    // Listen for incoming connections
    peer.on('connection', (conn: DataConnection) => onConnection(conn))

    // Listen for errors
    peer.on('error', (err) => {
        // Handle errors here
        console.error('Peer connection error:', err)
    })

    peer.on('open', (id) => {
        console.log('my peer id is: ', id)
    })

    // Cleanup on unmount
    return () => {
        peer.destroy()
    }
}
