import { FRAME_TIME } from '@constants/game'
import { FrameTime } from '@ts/types/frame'

export class Fade {
    animationTimer = 0
    animationFrame = 0
    frameDelay = 0
    alpha = 1
    fadeIn = false

    update(time: FrameTime) {
        if (time.previous > this.animationTimer + this.frameDelay * FRAME_TIME) {
            if (!this.fadeIn) {
                this.alpha -= 0.01
                if (this.alpha < 0) {
                    this.alpha = 0
                    this.fadeIn = true
                }
            }
        }
    }
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = `rgba(0,0,0, ${this.alpha})`
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }
}
