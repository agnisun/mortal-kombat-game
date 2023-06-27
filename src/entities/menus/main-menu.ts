import { BackgroundAnimation } from '@entities/stages/shared/background-animation'
import { FrameTime } from '@ts/types/frame'
import { drawFrame } from '@utils/context'
import * as control from '@handlers/input-register'
import { gameState } from '@states/game-state'
import { Fade } from '@entities/stages/shared/fade'

export class MainMenu extends Fade {
    image = document.querySelector('img[alt="main-menu"]') as HTMLImageElement
    frames: Map<string, number[]> = new Map([
        ['background', [1056, 178, 320, 240]],
        ['logo', [827, 253, 187, 93]],
        ['logo-border', [272, 240, 240, 116]],
        ['tablet', [807, 360, 226, 93]],
    ])
    startButton: BackgroundAnimation = new BackgroundAnimation(
        this.image,
        [
            ['start-button-1', [560, 367, 85, 59]],
            ['start-button-2', [296, 367, 85, 59]],
        ],
        [
            ['start-button-1', 24],
            ['start-button-2', 24],
        ]
    )

    update(time: FrameTime) {
        if (!this.fadeIn) super.update(time)
        else {
            if (control.isKeyPressed('Enter')) {
                gameState.currentMenu = 1
            }

            this.startButton.update(time)
        }
    }

    drawFrame(context: CanvasRenderingContext2D, frameKey: string, x: number, y: number, width?: number, height?: number) {
        drawFrame(context, this.image, this.frames.get(frameKey) as number[], x, y, width, height)
    }

    draw(context: CanvasRenderingContext2D) {
        this.drawFrame(context, 'background', 0, 0, context.canvas.width, context.canvas.height)
        this.drawFrame(context, 'logo', Math.floor(context.canvas.width / 2 - 93.5), 18)
        this.drawFrame(context, 'logo-border', Math.floor(context.canvas.width / 2 - 120), 5)
        this.drawFrame(context, 'tablet', Math.floor(context.canvas.width / 2 - 113), 133)
        this.startButton.draw(context, Math.floor(context.canvas.width / 2 - 42.5), 150)

        super.draw(context)
    }
}
