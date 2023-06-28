import { HEALTH_MAX } from '@constants/fighter'
import { FighterId } from '@ts/enums/fighter'
import { PlayerId } from '@ts/types'

export interface FighterGameState {
    id: FighterId
    playerId: PlayerId
    healthPoints: number
    rounds: number
}

export function createDefaultFighterState(fighterId: FighterId, playerId: PlayerId): FighterGameState {
    return {
        id: fighterId,
        playerId,
        healthPoints: HEALTH_MAX,
        rounds: 0,
    }
}
