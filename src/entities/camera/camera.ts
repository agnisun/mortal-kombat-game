import { SCROLL_BOUNDARY, STAGE_PADDING, STAGE_WIDTH, STAGE_HEIGHT } from '@constants/stage'
import { Position } from '@ts/types'
import { FighterHero } from '@ts/types/fighter'
import { FrameTime } from '@ts/types/frame'

export class Camera {
    position: Position
    fighters: [FighterHero, FighterHero]

    constructor(position: Position, fighters: [FighterHero, FighterHero]) {
        this.position = position
        this.fighters = fighters
    }

    update(context: CanvasRenderingContext2D, time: FrameTime) {
        this.position.y = -6 + Math.floor(Math.min(this.fighters[1].position.y, this.fighters[0].position.y) / 10)

        const lowX = Math.min(this.fighters[1].position.x, this.fighters[0].position.x)
        const highX = Math.max(this.fighters[1].position.x, this.fighters[0].position.x)

        if (highX - lowX > context.canvas.width - SCROLL_BOUNDARY * 2) {
            const midPoint = (highX - lowX) / 2
            this.position.x = lowX + midPoint - context.canvas.width / 2
        } else {
            for (const fighter of this.fighters) {
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
