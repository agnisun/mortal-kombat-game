import { GameState } from '@ts/types/game'
import { MenuScene } from '@scenes/menu-scene'

export const gameState: GameState = {
    fighters: [],
    currentMenu: 0,
    currentScene: new MenuScene(),
}
