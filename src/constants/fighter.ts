import { FighterAttackStrength, FighterState } from '@ts/enums/fighter'

export const PUSH_FRICTION = 66
export const FIGHTER_START = 90

export const PushBox = {
    IDLE: [-16, -92, 32, 90],
    JUMP: [-16, -55, 32, 55],
    JUMP_UP: [-16, -80, 32, 80],
    CROUCH: [-16, -60, 32, 60],
    PUNCH: [-5, -92, 32, 90],
}

export const HEALTH_MAX = 135

export const FighterAttackBaseData = {
    [FighterAttackStrength.LIGHT]: {
        damage: 12,
    },
    [FighterAttackStrength.MEDIUM]: {
        damage: 24,
    },
}

export const hurtStateValidFrom = [
    FighterState.IDLE,
    FighterState.WALK_BACKWARDS,
    FighterState.WALK_FORWARDS,
    FighterState.JUMP_LAND,
    FighterState.JUMP_START,
    FighterState.IDLE_TURN,
    FighterState.LIGHT_KICK,
    FighterState.LIGHT_PUNCH,
    FighterState.MEDIUM_KICK,
    FighterState.HURT_BODY_LIGHT,
    FighterState.HURT_HEAD_LIGHT,
]
