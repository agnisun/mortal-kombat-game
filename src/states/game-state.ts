import { GameState } from '@ts/types/game'
import { createDefaultFighterState } from './fighter-state'
import { FighterId } from '@ts/enums/fighter'

const fighter1 = createDefaultFighterState(FighterId.RAIDEN)
const fighter2 = createDefaultFighterState(FighterId['LIU-KANG'])

export const gameState: GameState = {
    fighters: [fighter1, fighter2],
}
