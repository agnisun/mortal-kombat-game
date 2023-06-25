import { HEALTH_MAX } from '@constants/fighter'
import { FighterId } from '@ts/enums/fighter'

export interface FighterGameState {
    id: FighterId
    healthPoints: number
    rounds: number
}

export function createDefaultFighterState(fighterId: FighterId): FighterGameState {
    return {
        id: fighterId,
        healthPoints: HEALTH_MAX,
        rounds: 0,
    }
}
