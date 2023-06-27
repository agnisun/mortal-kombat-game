import '@assets/styles/style.css'
import { getContext } from '@utils/context'
import { FrameTime } from '@ts/types/frame'
import { registerKeyboardEvents } from '@handlers/input-register'
import { gameState } from '@states/game-state'

export class MortalKombatGame {
    context: CanvasRenderingContext2D = getContext()
    frameTime: FrameTime = {
        secondsPassed: 0,
        previous: 0,
    }

    frame(time: DOMHighResTimeStamp) {
        this.frameTime.secondsPassed = (time - this.frameTime.previous) / 1000
        this.frameTime.previous = time

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)

        gameState.currentScene.update(this.context, this.frameTime)
        gameState.currentScene.draw(this.context)

        requestAnimationFrame(this.frame.bind(this))
    }

    start() {
        registerKeyboardEvents()

        requestAnimationFrame(this.frame.bind(this))
    }
}
