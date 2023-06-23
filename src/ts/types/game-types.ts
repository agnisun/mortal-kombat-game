import { FighterGameState } from '@states/fighter-state'

export interface GameState {
    fighters: [FighterGameState, FighterGameState]
}
