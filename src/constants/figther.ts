export const PUSH_FRICTION = 66
export const FIGHTER_START = 90

export enum FighterDirection {
    LEFT = -1,
    RIGHT = 1,
}

export enum FighterState {
    IDLE = 'idle',
    IDLE_TURN = 'idleTurn',
    WALK_FORWARDS = 'walkForwards',
    WALK_BACKWARDS = 'walkBackwards',
    JUMP_START = 'jumpStart',
    JUMP_UP = 'jumpUp',
    JUMP_FORWARDS = 'jumpForwards',
    JUMP_BACKWARDS = 'jumpBackwards',
    JUMP_LAND = 'jumpLand',
    JUMP_ROLL_LAND = 'jumpRollLand',
    CROUCH = 'crouch',
    CROUCH_UP = 'crouchUp',
    CROUCH_DOWN = 'crouchDown',
    CROUCH_TURN = 'crouchTurn',
}

export enum FrameDelay {
    FREEZE = 0,
    TRANSITION = -1,
}

export const PushBox = {
    IDLE: [-16, -92, 32, 90],
    JUMP: [-16, -55, 32, 55],
    JUMP_UP: [-16, -80, 32, 80],
    CROUCH: [-16, -60, 32, 60],
}
