import { HeroesMenu } from '@entities/menus/heroes-menu'
import { MainMenu } from '@entities/menus/main-menu'
import { gameState } from '@states/game-state'
import { FrameTime } from '@ts/types/frame'

export class MenuScene {
    menus = [new MainMenu(), new HeroesMenu()]

    update(_context: CanvasRenderingContext2D, time: FrameTime) {
        this.menus[gameState.currentMenu].update(time)
    }
    draw(context: CanvasRenderingContext2D) {
        this.menus[gameState.currentMenu].draw(context)
    }
}
