import { BackgroundAnimation } from '@entities/stages/shared/background-animation'
import { gameState, getWinner } from '@states/game-state'
import { FighterId } from '@ts/enums/fighter'
import { FrameDelay } from '@ts/enums/frame'
import { FrameTime } from '@ts/types/frame'
import { drawFrame } from '@utils/context'

export class BattleInfo {
    image: HTMLImageElement = document.querySelector('img[alt="misc"]') as HTMLImageElement
    frames: Map<string, number[]> = new Map([
        ['round-1', [5184, 53, 77, 19]],
        ['round-2', [5183, 138, 79, 18]],
        ['round-3', [5184, 222, 78, 18]],
    ])
    raiden = new BackgroundAnimation(
        this.image,
        [
            ['raiden-1', [3816, 125, 118, 19]],
            ['raiden-2', [4147, 125, 118, 19]],
        ],
        [
            ['raiden-1', 6],
            ['raiden-2', 6],
        ]
    )
    liuKang = new BackgroundAnimation(
        this.image,
        [
            ['liu-kang-1', [3807, 178, 140, 18]],
            ['liu-kang-2', [4138, 178, 139, 18]],
        ],
        [
            ['liu-kang-1', 6],
            ['liu-kang-2', 6],
        ]
    )
    fight = new BackgroundAnimation(
        this.image,
        [
            ['fight-1', [2772, 53, 67, 16]],
            ['fight-2', [2761, 123, 87, 21]],
            ['fight-3', [2748, 191, 114, 28]],
            ['fight-4', [2730, 258, 151, 37]],
        ],
        [
            ['fight-1', 6],
            ['fight-2', 6],
            ['fight-3', 6],
            ['fight-4', 10],
            ['fight-4', FrameDelay.TRANSITION],
        ]
    )
    drawControl = {
        round: false,
        fight: false,
    }
    timer = 0

    updateRound(time: FrameTime) {
        if (this.drawControl.round) return

        if (this.timer === 0) this.timer = time.previous + 500

        if (time.previous > this.timer) {
            this.drawControl.round = true
            this.timer = 0
        }
    }

    updateFight(time: FrameTime) {
        if (!this.drawControl.round || this.drawControl.fight) return
        const [, frameDelay] = this.fight.animation[this.fight.animationFrame]

        if (frameDelay === FrameDelay.TRANSITION) {
            this.drawControl.fight = true
            return
        }

        this.fight.update(time)
    }

    updateEndRound(time: FrameTime) {
        const loseFighter = gameState.fighters.filter((fighter) => fighter.healthPoints === 0)[0]

        if ((!this.drawControl.round || this.drawControl.fight) && !loseFighter) return

        this.raiden.update(time)
    }

    update(_context: CanvasRenderingContext2D, time: FrameTime) {
        this.updateRound(time)
        this.updateFight(time)
        this.updateWinner(time)
    }

    drawFrame(context: CanvasRenderingContext2D, frameKey: string, x: number, y: number, width?: number, height?: number) {
        drawFrame(context, this.image, this.frames.get(frameKey) as number[], x, y, width, height)
    }

    drawFight(context: CanvasRenderingContext2D) {
        if (!this.drawControl.round || this.drawControl.fight) return

        const [frameKey] = this.fight.animation[this.fight.animationFrame]
        const [, , frameWidth, frameHeight] = this.fight.frames.get(frameKey) as number[]

        this.fight.draw(context, Math.floor(context.canvas.width / 2 - frameWidth / 2), 120 - frameHeight / 2)
    }

    drawRound(context: CanvasRenderingContext2D) {
        if (this.drawControl.round) return

        const currentRound = gameState.fighters.reduce((acc, fighter) => fighter.rounds + acc, 0) + 1

        this.drawFrame(context, `round-${currentRound}`, Math.floor(context.canvas.width / 2 - 39), 120 - 9)
    }

    drawRaiden(context: CanvasRenderingContext2D) {
        this.raiden.draw(context, Math.floor(context.canvas.width / 2 - 59), Math.floor(context.canvas.height / 2 - 50))
    }

    drawLiuKang(context: CanvasRenderingContext2D) {
        this.liuKang.draw(context, Math.floor(context.canvas.width / 2 - 70), Math.floor(context.canvas.height / 2 - 50))
    }

    updateWinner(time: FrameTime) {
        const winner = getWinner()

        if (!winner) return

        switch (winner.id) {
            case FighterId.RAIDEN:
                return this.raiden.update(time)
            case FighterId['LIU-KANG']:
                return this.liuKang.update(time)
        }
    }

    drawWinner(context: CanvasRenderingContext2D) {
        const winner = getWinner()

        if (!winner) return

        switch (winner.id) {
            case FighterId.RAIDEN:
                return this.drawRaiden(context)
            case FighterId['LIU-KANG']:
                return this.drawLiuKang(context)
        }
    }

    draw(context: CanvasRenderingContext2D) {
        this.drawRound(context)
        this.drawFight(context)
        this.drawWinner(context)
    }
}
