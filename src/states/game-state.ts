import { GameState } from '@ts/types/game-types'
import { createDefaultFighterState } from './fighter-state'
import { FighterId } from '@ts/enums/fighter-enums'
import { PlayerId } from '@ts/types'

const fighter1 = createDefaultFighterState(FighterId.RAIDEN, PlayerId.FIRST)
const fighter2 = createDefaultFighterState(FighterId['LIU-KANG'], PlayerId.SECOND)

export const gameState: GameState = {
    fighters: [fighter1, fighter2],
}

fighter1.fighter.opponent = fighter2.fighter
fighter2.fighter.opponent = fighter1.fighter
