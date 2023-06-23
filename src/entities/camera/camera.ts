import { SCROLL_BOUNDARY, STAGE_PADDING, STAGE_WIDTH, STAGE_HEIGHT } from '@constants/stage-constants'
import { gameState } from '@states/game-state'
import { Position } from '@ts/types'
import { FrameTime } from '@ts/types/frame-types'

export class Camera {
    position: Position

    constructor(position: Position) {
        this.position = position
    }

    update(context: CanvasRenderingContext2D, time: FrameTime) {
        const fighters = gameState.fighters.map(({ fighter }) => fighter)

        this.position.y = -6 + Math.floor(Math.min(fighters[1].position.y, fighters[0].position.y) / 10)

        const lowX = Math.min(fighters[1].position.x, fighters[0].position.x)
        const highX = Math.max(fighters[1].position.x, fighters[0].position.x)

        if (highX - lowX > context.canvas.width - SCROLL_BOUNDARY * 2) {
            const midPoint = (highX - lowX) / 2
            this.position.x = lowX + midPoint - context.canvas.width / 2
        } else {
            for (const fighter of fighters) {
                if (
                    (fighter.position.x < this.position.x + SCROLL_BOUNDARY && fighter.velocity.x * fighter.direction < 0) ||
                    (fighter.position.x > this.position.x + context.canvas.width - SCROLL_BOUNDARY && fighter.velocity.x * fighter.direction > 0)
                ) {
                    this.position.x += fighter.velocity.x * fighter.direction * time.secondsPassed
                }
            }
        }

        if (this.position.x < STAGE_PADDING) this.position.x = STAGE_PADDING
        if (this.position.x > STAGE_WIDTH + STAGE_PADDING - context.canvas.width) {
            this.position.x = STAGE_WIDTH + STAGE_PADDING - context.canvas.width
        }
        if (this.position.y < 0) this.position.y = 0
        if (this.position.y > STAGE_HEIGHT - context.canvas.height) {
            this.position.y = STAGE_HEIGHT - context.canvas.height
        }
    }
}
