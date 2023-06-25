import { TIME_DELAY } from '@constants/battle'
import { HEALTH_MAX } from '@constants/fighter'
import { gameState } from '@states/game-state'
import { FighterDirection, FighterId } from '@ts/enums/fighter'
import { FrameTime } from '@ts/types/frame'
import { drawFrame } from '@utils/context'

export class StatusBar {
    image: HTMLImageElement
    time = 99
    timeTimer = 0
    frames: Map<string, number[]> = new Map([
        ['health-bar', [5406, 49, 163, 12]],
        ['health-damage-bar', [5407, 64, 135, 10]],
        ['round-score', [5406, 79, 11, 16]],

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
    names: string[]
    healthPoints: Map<FighterId, number> = new Map([
        [gameState.fighters[0].id, gameState.fighters[0].healthPoints],
        [gameState.fighters[1].id, gameState.fighters[1].healthPoints],
    ])

    constructor() {
        const image = document.querySelector('img[alt="misc"]') as HTMLImageElement
        this.image = image
        this.names = gameState.fighters.map(({ id }) => `${id}-tag`)
    }

    drawFrame(context: CanvasRenderingContext2D, frameKey: string, x: number, y: number, direction: FighterDirection = 1, width?: number, height?: number) {
        drawFrame(context, this.image, this.frames.get(frameKey) as number[], x, y, direction, width, height)
    }

    update(_context: CanvasRenderingContext2D, time: FrameTime) {
        this.updateTime(time)
        this.updateHealthBar(time)
    }

    updateHealthBar(time: FrameTime) {
        for (const figther of gameState.fighters) {
            const uiHealthPoints = this.healthPoints.get(figther.id) as number

            if (figther.healthPoints < uiHealthPoints) {
                this.healthPoints.set(figther.id, Math.max(0, uiHealthPoints - time.secondsPassed * 60))
            }
        }
    }

    updateTime(time: FrameTime) {
        if (time.previous > this.timeTimer + TIME_DELAY) {
            this.time -= 1
            this.timeTimer = time.previous
        }
    }

    drawHealthBars(context: CanvasRenderingContext2D) {
        const figthers = Array.from(this.healthPoints.values())

        this.drawFrame(context, 'health-bar', 5, 16, 1, HEALTH_MAX + 2, 10)
        this.drawFrame(context, 'health-damage-bar', 6, 17, 1, HEALTH_MAX - figthers[0], 8)

        this.drawFrame(context, 'health-bar', context.canvas.width - 5, 16, -1, HEALTH_MAX + 2, 10)
        this.drawFrame(context, 'health-damage-bar', context.canvas.width - 6, 17, -1, HEALTH_MAX - figthers[1], 8)
    }

    drawRoundScores(context: CanvasRenderingContext2D) {
        for (let i = 0; i < gameState.fighters[0].rounds; i++) {
            this.drawFrame(context, 'round-score', (i + 1) * 10 - 5, 25)
        }

        for (let i = 0; i < gameState.fighters[1].rounds; i++) {
            this.drawFrame(context, 'round-score', context.canvas.width - 5 - (i + 1) * 10, 25)
        }
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
        this.drawRoundScores(context)
        this.drawTimer(context)
        this.drawNameTags(context)
    }
}
