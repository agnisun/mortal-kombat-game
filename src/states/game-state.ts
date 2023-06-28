import { GameState } from '@ts/types/game'
import { MenuScene } from '@scenes/menu-scene'
import { MenusId } from '@ts/enums'

export const gameState: GameState = {
    fighters: [],
    currentMenu: MenusId.MAIN,
    currentScene: new MenuScene(),
}

export function getWinner() {
    if (getLoser()) {
        return gameState.fighters.filter((fighter) => fighter.healthPoints > 0)[0]
    }
}

export function getLoser() {
    const loseFighter = gameState.fighters.filter((fighter) => fighter.healthPoints === 0)[0]

    return loseFighter
}
