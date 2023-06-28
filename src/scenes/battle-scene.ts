import { FighterAttackBaseData, HEALTH_MAX } from '@constants/fighter'
import { STAGE_MID_POINT, STAGE_PADDING } from '@constants/stage'
import { Camera } from '@entities/camera/camera'
import { LiuKang } from '@entities/fighters/liu-kang'
import { Raiden } from '@entities/fighters/raiden'
import { BattleInfo } from '@entities/overlays/battle-info'
import { StatusBar } from '@entities/overlays/status-bar'
import { CourtyardStage } from '@entities/stages/courtyard'
import { Fade } from '@entities/stages/shared/fade'
import { FighterGameState } from '@states/fighter-state'
import { gameState, getLoser, getWinner } from '@states/game-state'
import { FighterAttackStrength, FighterId, FighterState } from '@ts/enums/fighter'
import { MenusId, PlayerId } from '@ts/enums'
import { FighterHero } from '@ts/types/fighter'
import { FrameTime } from '@ts/types/frame'
import { MenuScene } from './menu-scene'

export class BattleScene {
    fighters!: [FighterHero, FighterHero]
    camera!: Camera
    stage: CourtyardStage
    overlays: [StatusBar] = [new StatusBar()]
    battleInfo = new BattleInfo()
    fighterDrawOrder = [0, 1]
    fade = new Fade()
    timer = 0

    constructor() {
        this.stage = new CourtyardStage()

        this.startRound()
    }

    getFighterEntityClass(id: FighterId) {
        switch (id) {
            case FighterId.RAIDEN:
                return Raiden
            case FighterId['LIU-KANG']:
                return LiuKang
            default:
                throw new Error('Unimplemented fighter entity request')
        }
    }

    getFighterEntity(fighterState: FighterGameState, index: number) {
        const FighterEntityClass = this.getFighterEntityClass(fighterState.id)

        return new FighterEntityClass(index, this.handleAttackHit.bind(this))
    }

    getFighterEntities(): [FighterHero, FighterHero] {
        const fighterEntities: [FighterHero, FighterHero] = gameState.fighters.map(this.getFighterEntity.bind(this)) as [FighterHero, FighterHero]

        fighterEntities[0].opponent = fighterEntities[1]
        fighterEntities[1].opponent = fighterEntities[0]

        return fighterEntities
    }

    handleAttackHit(playerId: PlayerId, opponentId: PlayerId, strength: FighterAttackStrength) {
        const newHealth = gameState.fighters[opponentId].healthPoints - FighterAttackBaseData[strength].damage
        gameState.fighters[opponentId].healthPoints = Math.max(0, newHealth)
        this.fighterDrawOrder = [playerId, opponentId]
    }

    startRound() {
        this.fighters = this.getFighterEntities()
        this.camera = new Camera({ x: STAGE_MID_POINT + STAGE_PADDING - 160, y: 16 }, this.fighters)
    }

    restartRound(time: FrameTime) {
        if (time.previous < this.timer + 5000) return

        const winner = getWinner()
        const loser = getLoser()

        if (winner && loser) {
            if (winner.rounds === 2) {
                gameState.currentScene = new MenuScene()
                gameState.currentMenu = MenusId.GAMEOVER

                this.stage.music.pause()
                return
            }

            winner.healthPoints = HEALTH_MAX
            loser.healthPoints = HEALTH_MAX

            this.startRound()
            this.fade.restart()
            this.overlays[0] = new StatusBar()
            this.battleInfo = new BattleInfo()
            this.stage = new CourtyardStage()
            this.timer = 0
        }
    }

    restartOverlays(winner: FighterGameState, time: FrameTime) {
        if (this.timer !== 0) return

        this.timer = time.previous

        winner.rounds += 1
        const finishTime = this.overlays[0].time

        this.overlays[0] = new StatusBar()
        this.overlays[0].time = finishTime
        this.overlays[0].timeTimer = Infinity
    }

    updateFighterWinner(winner: FighterGameState, time: FrameTime) {
        for (const fighter of this.fighters) {
            if (fighter.playerId === winner.playerId) {
                fighter.changeState(FighterState.WIN, time)
                fighter.opponent.changeState(FighterState.LOSE, time)
                return
            }
        }
    }

    updateFighters(context: CanvasRenderingContext2D, time: FrameTime) {
        const winner = getWinner()

        if (winner) {
            this.updateFighterWinner(winner, time)
            this.restartOverlays(winner, time)
            this.restartRound(time)
        } else if (this.overlays[0].time === 0) {
            const [fighter1, fighter2] = gameState.fighters

            if (fighter1.healthPoints > fighter2.healthPoints) {
                fighter2.healthPoints = 0
                this.restartOverlays(fighter1, time)
                this.restartRound(time)
            } else if (fighter1.healthPoints < fighter2.healthPoints) {
                fighter1.healthPoints = 0
                this.restartOverlays(fighter2, time)
                this.restartRound(time)
            }
        }

        for (const fighter of this.fighters) {
            fighter.update(context, time, this.camera)
        }
    }

    updateOverlays(context: CanvasRenderingContext2D, time: FrameTime) {
        for (const overlay of this.overlays) {
            overlay.update(context, time)
        }
    }

    update(context: CanvasRenderingContext2D, time: FrameTime) {
        if (!this.fade.fadeIn) this.fade.update()
        else {
            if (this.battleInfo.drawControl.fight && this.battleInfo.drawControl.round) {
                this.updateFighters(context, time)
                this.camera.update(context, time)
                this.updateOverlays(context, time)
                this.stage.update(time)
                this.battleInfo.update(context, time)
            } else {
                this.battleInfo.update(context, time)
            }
        }
    }

    drawFighters(context: CanvasRenderingContext2D) {
        for (const fighterId of this.fighterDrawOrder) {
            this.fighters[fighterId].draw(context, this.camera)
        }
    }

    drawOverlays(context: CanvasRenderingContext2D) {
        for (const overlay of this.overlays) {
            overlay.draw(context)
        }
    }

    draw(context: CanvasRenderingContext2D) {
        this.stage.draw(context, this.camera)
        this.drawFighters(context)
        this.drawOverlays(context)
        this.battleInfo.draw(context)

        this.fade.draw(context)
    }
}
