import { TIME_DELAY } from '@constants/battle'
import { FighterDirection } from '@constants/figther'
import { Fighter } from '@entities/fighter'
import { drawFrame } from '@utils/context'
import { FrameTime } from 'types'

export class StatusBar {
    image: HTMLImageElement
    time: number
    timeTimer: number
    fighters: Fighter[]
    frames: Map<string, number[]>
    names: string[]

    constructor(fighters: Fighter[]) {
        const image = document.querySelector('img[alt="misc"]') as HTMLImageElement
        this.image = image
        this.time = 5
        this.timeTimer = 0
        this.fighters = fighters

        this.frames = new Map([
            ['health-bar', [5406, 49, 163, 12]],

            ['raiden-wins', [3816, 126, 118, 18]],
            ['raiden-tag', [934, 1026, 45, 11]],

            ['liu-kang-wins', [3807, 178, 139, 18]],
            ['liu-kang-tag', [1000, 1026, 59, 11]],

            ['time-0', [5756, 34, 8, 16]],
            ['time-1', [5766, 34, 9, 16]],
            ['time-2', [5777, 34, 9, 16]],
            ['time-3', [5788, 34, 9, 16]],
            ['time-4', [5799, 34, 8, 16]],
            ['time-5', [5809, 34, 9, 16]],
            ['time-6', [5820, 34, 8, 16]],
            ['time-7', [5830, 34, 8, 16]],
            ['time-8', [5840, 34, 9, 16]],
            ['time-9', [5851, 34, 8, 16]],
        ])

        const [{ name: name1 }, { name: name2 }] = this.fighters
        this.names = [`${name1.toLocaleLowerCase()}-tag`, `${name2.toLocaleLowerCase()}-tag`]
    }

    drawFrame(context: CanvasRenderingContext2D, frameKey: string, x: number, y: number, direction: FighterDirection = 1, width?: number, height?: number) {
        drawFrame(context, this.image, this.frames.get(frameKey) as number[], x, y, direction, width, height)
    }

    update(context: CanvasRenderingContext2D, time: FrameTime) {
        this.updateTime(time)
    }

    updateTime(time: FrameTime) {
        if (time.previous > this.timeTimer + TIME_DELAY) {
            this.time -= 1
            this.timeTimer = time.previous
        }
    }

    drawHealthBars(context: CanvasRenderingContext2D) {
        this.drawFrame(context, 'health-bar', 5, 16, 1, 135, 10)
        this.drawFrame(context, 'health-bar', context.canvas.width - 5, 16, -1, 135, 10)
    }

    drawTimer(context: CanvasRenderingContext2D) {
        const timeString = String(Math.max(this.time, 0)).padStart(2, '00')

        this.drawFrame(context, `time-${timeString.charAt(0)}`, context.canvas.width / 2 - 8, 14)
        this.drawFrame(context, `time-${timeString.charAt(1)}`, context.canvas.width / 2, 14)
    }
    drawNameTags(context: CanvasRenderingContext2D) {
        const [name1, name2] = this.names

        this.drawFrame(context, name1, 5, 2)
        this.drawFrame(context, name2, 255, 2)
    }

    draw(context: CanvasRenderingContext2D) {
        this.drawHealthBars(context)
        this.drawTimer(context)
        this.drawNameTags(context)
    }
}
