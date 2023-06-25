import { FighterAttack, FighterState } from '@ts/enums/fighter-enums'
import { FrameTime } from './frame-types'
import { Raiden } from '@entities/fighters/raiden'
import { LiuKang } from '@entities/fighters/liu-kang'

export type FighterHero = Raiden | LiuKang
export type FighterAnimations = Record<FighterState, [string, number][]>
export type FighterStates = Record<
    FighterState,
    {
        attackType?: FighterAttack
        init?: () => void
        update?: (context: CanvasRenderingContext2D, time: FrameTime) => void
        validFrom: (FighterState | undefined)[]
    }
>

export interface FighterPushBox {
    x: number
    y: number
    width: number
    height: number
}

export type VelocityX = FighterState.WALK_FORWARDS | FighterState.WALK_BACKWARDS | FighterState.JUMP_BACKWARDS | FighterState.JUMP_FORWARDS

export interface InitialVelocity {
    x: {
        [key in VelocityX]: number
    }
    jump: number
}

export interface FighterBoxes {
    push: FighterPushBox
    hurt: number[][]
    hit: FighterPushBox
}
