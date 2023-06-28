import { FighterGameState } from '@states/fighter-state'
import { Scenes } from './index'
import { MenusId } from '@ts/enums'

export interface GameState {
    fighters: FighterGameState[]
    currentMenu: MenusId
    currentScene: Scenes
}
