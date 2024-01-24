import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { peer } from './'
import intervalPeerList from './PeerPoling'
import main from './Main'

/**
 * Pure? function that acts like a hook. Maintains the global
 * states where each player is connected via WebSockets.
 */
const NetworkManager: React.FC = () => {
    const dispatch = useAppDispatch()
    const players = useAppSelector((state: RootState) => state.players)

    /** this is our main function initilization; this is where we're
     *  listening for incoming "transactions" / RTC events */
    useEffect(() => {
        const teardownMain = main(dispatch)
        return () => {
            teardownMain()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /** and here, we're syncing state remotely on some recurring pattern */
    useEffect(() => {
        if (!peer?.id) {
            return
        }
        const intervalId = intervalPeerList(players, dispatch)
        return () => {
            clearInterval(intervalId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [peer.id])

    return null
}

export default NetworkManager
