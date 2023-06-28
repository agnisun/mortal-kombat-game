import { Fade } from '@entities/stages/shared/fade'
import { drawFrame } from '@utils/context'
import * as control from '@handlers/input-register'
import { gameState } from '@states/game-state'
import { MenusId } from '@ts/enums'

export class GameOverMenu {
    image = document.querySelector('img[alt="misc"]') as HTMLImageElement
    frames: Map<string, number[]> = new Map([['background', [4010, 1551, 320, 240]]])
    fade = new Fade()

    update() {
        if (!this.fade.fadeIn) this.fade.update()
        else {
            if (control.isKeyPressed('Enter')) {
                gameState.currentMenu = MenusId.HEROES
            }
        }
    }

    drawFrame(context: CanvasRenderingContext2D, frameKey: string, x: number, y: number, width?: number, height?: number) {
        drawFrame(context, this.image, this.frames.get(frameKey) as number[], x, y, width, height)
    }

    draw(context: CanvasRenderingContext2D) {
        this.drawFrame(context, 'background', 0, 0)
        this.fade.draw(context)
    }
}
