import { FrameTime } from '@ts/types/frame-types'

export class BackgroundAnimation {
    image: HTMLImageElement
    frames: Map<string, number[]>
    animation: [string, number][]
    animationTimer: number
    animationFrame: number
    frameDelay: number

    constructor(image: HTMLImageElement, frames: [string, number[]][], animation: [string, number][], startFrame = 0) {
        this.image = image
        this.frames = new Map(frames)
        this.animation = animation
        this.animationTimer = 0
        this.animationFrame = startFrame
        this.frameDelay = animation[this.animationFrame][1]
    }

    update(time: FrameTime) {
        if (time.previous > this.animationTimer + this.frameDelay) {
            this.animationFrame += 1

            if (this.animationFrame >= this.animation.length) {
                this.animationFrame = 0
            }

            this.frameDelay = this.animation[this.animationFrame][1]
            this.animationTimer = time.previous
        }
    }

    draw(context: CanvasRenderingContext2D, x: number, y: number) {
        const [frameKey] = this.animation[this.animationFrame]
        const [frameX, frameY, frameWidth, FrameHeight] = this.frames.get(frameKey) as number[]

        context.drawImage(this.image, frameX, frameY, frameWidth, FrameHeight, x, y, frameWidth, FrameHeight)
    }
}
