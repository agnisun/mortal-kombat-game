import { BackgroundAnimation } from '@entities/stages/shared/background-animation'
import { FighterId } from '@ts/enums/fighter'
import { FrameTime } from '@ts/types/frame'
import { drawFrame } from '@utils/context'
import * as control from '@handlers/input-register'
import { PlayerId } from '@ts/enums'
import { Control } from '@ts/enums/control'
import { Fade } from '@entities/stages/shared/fade'
import { gameState } from '@states/game-state'
import { createDefaultFighterState } from '@states/fighter-state'
import { BattleScene } from '@scenes/battle-scene'

export class HeroesMenu {
    image = document.querySelector('img[alt="main-menu"]') as HTMLImageElement
    frames: Map<string, number[]> = new Map([
        ['text', [574, 714, 156, 14]],
        ['background', [790, 686, 320, 240]],
        ['raiden', [328, 804, 40, 60]],
        ['liu-kang', [371, 804, 40, 60]],
    ])
    fighters = [
        { id: FighterId.RAIDEN, x: 88, y: 118 },
        { id: FighterId['LIU-KANG'], x: 138, y: 118 },
    ]
    playerOneFighter = 0
    playerTwoFighter = 1

    playerOne = new BackgroundAnimation(
        this.image,
        [
            ['player-one-1', [1147, 734, 46, 65]],
            ['player-one-2', [1197, 734, 46, 65]],
        ],
        [
            ['player-one-1', 11],
            ['player-one-2', 11],
        ]
    )

    playerTwo = new BackgroundAnimation(
        this.image,
        [
            ['player-two-1', [1147, 802, 46, 65]],
            ['player-two-2', [1197, 802, 46, 65]],
        ],
        [
            ['player-two-1', 11],
            ['player-two-2', 11],
        ]
    )
    fade = new Fade()

    handlePrevFighter(currentPlayer: number) {
        if (currentPlayer > 0) return currentPlayer - 1
        else return this.fighters.length - 1
    }

    handleNextFighter(currentPlayer: number) {
        if (currentPlayer < this.fighters.length - 1) return currentPlayer + 1
        else return 0
    }

    updatePlayerFighter() {
        if (!gameState.fighters[0]) {
            if (control.isControlPressed(PlayerId.FIRST, Control.LEFT)) {
                this.playerOneFighter = this.handlePrevFighter(this.playerOneFighter)
            } else if (control.isControlPressed(PlayerId.FIRST, Control.RIGHT)) {
                this.playerOneFighter = this.handleNextFighter(this.playerOneFighter)
            } else if (control.isKeyPressed('Enter')) {
                gameState.fighters[0] = createDefaultFighterState(this.fighters[this.playerOneFighter].id, PlayerId.FIRST)
            }
        } else {
            if (control.isControlPressed(PlayerId.SECOND, Control.LEFT)) {
                this.playerTwoFighter = this.handlePrevFighter(this.playerTwoFighter)
            } else if (control.isControlPressed(PlayerId.SECOND, Control.RIGHT)) {
                this.playerTwoFighter = this.handleNextFighter(this.playerTwoFighter)
            } else if (control.isKeyPressed('Enter')) {
                gameState.fighters[1] = createDefaultFighterState(this.fighters[this.playerTwoFighter].id, PlayerId.SECOND)
                gameState.currentScene = new BattleScene()

                const mainTheme = document.querySelector('audio#main-theme') as HTMLAudioElement
                mainTheme.pause()
            }
        }
    }

    update(time: FrameTime) {
        if (!this.fade.fadeIn) this.fade.update()
        else {
            this.updatePlayerFighter()

            if (!gameState.fighters[0]) this.playerOne.update(time)
            else this.playerTwo.update(time)
        }
    }

    drawFrame(context: CanvasRenderingContext2D, frameKey: string, x: number, y: number, width?: number, height?: number) {
        drawFrame(context, this.image, this.frames.get(frameKey) as number[], x, y, width, height)
    }

    drawFightersSelected(context: CanvasRenderingContext2D) {
        const fighterOne = this.fighters[this.playerOneFighter]
        const fighterTwo = this.fighters[this.playerTwoFighter]

        if (!gameState.fighters[0]) this.playerOne.draw(context, fighterOne.x, fighterOne.y)
        else this.playerTwo.draw(context, fighterTwo.x, fighterTwo.y)
    }

    drawFighters(context: CanvasRenderingContext2D) {
        this.drawFrame(context, 'raiden', 90, 120)
        this.drawFrame(context, 'liu-kang', 140, 120)
    }

    draw(context: CanvasRenderingContext2D) {
        this.drawFrame(context, 'background', 0, 0)
        this.drawFrame(context, 'text', Math.floor(context.canvas.width / 2 - 78), 10)
        this.drawFighters(context)
        this.drawFightersSelected(context)

        this.fade.draw(context)
    }
}
