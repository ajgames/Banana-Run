import { peer } from '.'
import onConnection from './onConnection'

/**
 * Poling the centralized peer server to try and
 * make sure all peers are always connected.
 * This might be a premature optimization.
 */
export default function intervalPeerList() {
    const getPeers = async () => {
        if (!peer.id) {
            //this peer needs to be connected before we should try to connect to others
            return
        }
        const peers = await (
            await fetch('http://192.168.6.46:9000/banana/haha/peers')
        ).json()
        const notMe = peers.filter((id: string) => id != peer.id)
        notMe.forEach((id: string) => {
            const conn = peer.connect(id)
            onConnection(conn)
        })
    }
    getPeers()
    const intervalId = setInterval(getPeers, 142_000_000)
    return intervalId
}
