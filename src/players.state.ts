import { PEER_ID } from './components/networkManager'
import { Vector3 } from 'three'
import { DataConnection } from 'peerjs'

export type Player = {
    id: string
    position: Vector3
    velocity: { current: Vector3 }
    connection: DataConnection | null
}
export type PlayersState = Record<string, Player>

export const players: PlayersState = {}

export const self: Pick<Player, 'id' | 'position' | 'velocity'> = {
    id: PEER_ID,
    position: new Vector3(0, 1, 0),
    velocity: { current: new Vector3(0, 0, 0) },
}
