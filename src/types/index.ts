import { FighterState } from '@constants/figther'
import { LiuKang } from '@entities/liu-kang'
import { Raiden } from '@entities/raiden'

export interface Position {
    x: number
    y: number
}

export type VelocityX = FighterState.WALK_FORWARDS | FighterState.WALK_BACKWARDS | FighterState.JUMP_BACKWARDS | FighterState.JUMP_FORWARDS

export interface InitialVelocity {
    x: {
        [key in VelocityX]: number
    }
    jump: number
}

export interface FrameTime {
    previous: DOMHighResTimeStamp
    secondsPassed: DOMHighResTimeStamp
}

export type Fighters = (Raiden | LiuKang)[]

export enum PlayerId {
    FIRST = 0,
    SECOND = 1,
}

export interface FighterPushBox {
    x: number
    y: number
    width: number
    height: number
}
