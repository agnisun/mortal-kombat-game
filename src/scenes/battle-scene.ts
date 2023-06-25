import { FighterAttackBaseData } from '@constants/fighter'
import { STAGE_MID_POINT, STAGE_PADDING } from '@constants/stage'
import { Camera } from '@entities/camera/camera'
import { LiuKang } from '@entities/fighters/liu-kang'
import { Raiden } from '@entities/fighters/raiden'
import { StatusBar } from '@entities/overlays/status-bar'
import { CourtyardStage } from '@entities/stages/courtyard'
import { FighterGameState } from '@states/fighter-state'
import { gameState } from '@states/game-state'
import { FighterAttackStrength, FighterId } from '@ts/enums/fighter'
import { PlayerId } from '@ts/types'
import { FighterHero } from '@ts/types/fighter'
import { FrameTime } from '@ts/types/frame'

export class BattleScene {
    fighters!: [FighterHero, FighterHero]
    camera!: Camera
    stage: CourtyardStage
    overlays: [StatusBar]

    constructor() {
        this.stage = new CourtyardStage()
        this.overlays = [new StatusBar()]

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

    handleAttackHit(opponentId: PlayerId, strength: FighterAttackStrength) {
        const newHealth = gameState.fighters[opponentId].healthPoints - FighterAttackBaseData[strength].damage
        gameState.fighters[opponentId].healthPoints = Math.max(0, newHealth)
    }

    startRound() {
        this.fighters = this.getFighterEntities()
        this.camera = new Camera({ x: STAGE_MID_POINT + STAGE_PADDING - 160, y: 16 }, this.fighters)
    }

    updateFighters(context: CanvasRenderingContext2D, time: FrameTime) {
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
        this.updateFighters(context, time)
        this.stage.update(time)
        this.camera.update(context, time)
        this.updateOverlays(context, time)
    }

    drawFighters(context: CanvasRenderingContext2D) {
        for (const fighter of this.fighters) {
            fighter.draw(context, this.camera)
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
    }
}
