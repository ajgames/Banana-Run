import Peer from 'peerjs'

/*     Hook-Able - greater ability to compensate for outside context.           */
/*      Purely Functional - only cares about the current state this has.        */
/*      There's one more - but I can't remember what it was...                  */

export const PEER_ID = '123' + Math.floor(Math.random() * 310000)

// Initialize Peer object with your desired options
export const peer = new Peer(PEER_ID, {
    // host: 'localhost',
    host: '192.168.6.46',
    port: 9000,
    path: '/banana',
    key: 'haha',
})
