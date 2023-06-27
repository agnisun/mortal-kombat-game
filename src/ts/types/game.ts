import { FighterGameState } from '@states/fighter-state'
import { Scenes } from './index'

export interface GameState {
    fighters: FighterGameState[]
    currentMenu: number
    currentScene: Scenes
}
