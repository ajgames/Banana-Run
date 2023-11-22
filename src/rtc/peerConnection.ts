import Peer from 'peerjs'

export const initializePeer = (id: string): Peer => {
    const peer = new Peer(id, {
        host: 'your-peerjs-server-host',
        port: your - peerjs - server - port,
        path: '/peerjs',
        secure: true, // use true if you're on https
        config: {
            iceServers: [
                { url: 'stun:stun.l.google.com:19302' },
                {
                    url: 'turn:your.turn.servers.here',
                    credential: 'turnpassword',
                    username: 'turnusername',
                },
            ],
        },
    })

    // Error handling
    peer.on('error', (err) => {
        console.error(err)
    })

    return peer
}
