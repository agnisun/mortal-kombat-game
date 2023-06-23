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

export enum FighterId {
    RAIDEN = 'raiden',
    'LIU-KANG' = 'liu-kang',
}
