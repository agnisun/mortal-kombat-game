import { HEALTH_MAX } from '@constants/fighter'
import { FighterId } from '@ts/enums/fighter'
import { PlayerId } from '@ts/types'
import { FighterHero } from '@ts/types/fighter'
import { createFighter } from '@utils/create-fighter'

export interface FighterGameState {
    id: FighterId
    healthPoints: number
    rounds: number
    fighter: FighterHero
}

export function createDefaultFighterState(fighterId: FighterId, playerId: PlayerId): FighterGameState {
    return {
        id: fighterId,
        healthPoints: HEALTH_MAX,
        rounds: 0,
        fighter: createFighter(fighterId, playerId),
    }
}
