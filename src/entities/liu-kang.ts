import { Fighter } from './fighter'
import { PlayerId } from '../types'
import { FighterState, FrameDelay, PushBox } from '@constants/figther'
import { Camera } from '../camera'

export class LiuKang extends Fighter {
    constructor(playerId: PlayerId) {
        super('Liu-kang', playerId)
        const image = document.querySelector('img[alt="liu-kang"]') as HTMLImageElement
        this.image = image
        this.frames = new Map([
            ['forwards-1', [[74, 148, 37, 101], [14, 98], PushBox.IDLE]],
            ['forwards-2', [[120, 148, 34, 101], [12, 98], PushBox.IDLE]],
            ['forwards-3', [[164, 150, 33, 99], [11, 96], PushBox.IDLE]],
            ['forwards-4', [[206, 153, 35, 96], [12, 93], PushBox.IDLE]],
            ['forwards-5', [[250, 151, 37, 98], [14, 96], PushBox.IDLE]],
            ['forwards-6', [[296, 150, 34, 99], [12, 96], PushBox.IDLE]],
            ['forwards-7', [[340, 149, 34, 100], [12, 97], PushBox.IDLE]],
            ['forwards-8', [[385, 152, 39, 97], [14, 94], PushBox.IDLE]],

            ['idle-1', [[92, 23, 47, 94], [23, 91], PushBox.IDLE]],
            ['idle-2', [[149, 22, 47, 95], [23, 92], PushBox.IDLE]],
            ['idle-3', [[206, 18, 47, 99], [23, 96], PushBox.IDLE]],
            ['idle-4', [[263, 21, 47, 96], [23, 93], PushBox.IDLE]],
            ['idle-5', [[321, 24, 47, 93], [23, 90], PushBox.IDLE]],
            ['idle-6', [[378, 21, 47, 96], [23, 93], PushBox.IDLE]],
            ['idle-7', [[435, 18, 47, 99], [23, 96], PushBox.IDLE]],
            ['idle-8', [[492, 22, 47, 95], [23, 92], PushBox.IDLE]],

            ['idle-turn-1', [[569, 20, 51, 97], [26, 94], PushBox.IDLE]],
            ['idle-turn-2', [[630, 20, 50, 97], [25, 94], PushBox.IDLE]],
            ['idle-turn-3', [[691, 20, 51, 97], [26, 94], PushBox.IDLE]],

            ['jump-start-1', [[647, 156, 47, 93], [23, 90], PushBox.IDLE]],

            ['jump-up-1', [[471, 174, 48, 75], [24, 71], PushBox.JUMP_UP]],

            ['jump-land-1', [[587, 161, 49, 88], [25, 86], PushBox.IDLE]],
            ['jump-land-2', [[647, 156, 47, 93], [23, 90], PushBox.IDLE]],

            ['jump-roll-land-1', [[732, 176, 35, 73], [17, 70], PushBox.JUMP_UP]],

            ['jump-forwards-1', [[777, 198, 29, 51], [14, 48], PushBox.JUMP]],
            ['jump-forwards-2', [[816, 202, 38, 47], [19, 44], PushBox.JUMP]],
            ['jump-forwards-3', [[865, 216, 45, 33], [22, 30], PushBox.JUMP]],
            ['jump-forwards-4', [[920, 206, 40, 43], [20, 40], PushBox.JUMP]],
            ['jump-forwards-5', [[972, 198, 30, 51], [15, 48], PushBox.JUMP]],
            ['jump-forwards-6', [[1013, 202, 37, 47], [18, 44], PushBox.JUMP]],
            ['jump-forwards-7', [[1059, 216, 45, 33], [22, 30], PushBox.JUMP]],
            ['jump-forwards-8', [[1115, 204, 41, 45], [20, 42], PushBox.JUMP]],

            ['crouch-1', [[988, 27, 47, 90], [23, 87], PushBox.IDLE]],
            ['crouch-2', [[1045, 49, 49, 68], [23, 65], PushBox.IDLE]],
            ['crouch-3', [[1104, 60, 48, 59], [24, 56], PushBox.CROUCH]],
        ])

        this.animations[FighterState.IDLE] = [
            ['idle-1', 100],
            ['idle-2', 100],
            ['idle-3', 100],
            ['idle-4', 100],
            ['idle-5', 100],
            ['idle-6', 100],
            ['idle-7', 100],
            ['idle-8', 100],
        ]

        this.animations[FighterState.IDLE_TURN] = [
            ['idle-turn-3', 66],
            ['idle-turn-2', 66],
            ['idle-turn-1', 66],
            ['idle-turn-1', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.WALK_FORWARDS] = [
            ['forwards-1', 66],
            ['forwards-2', 66],
            ['forwards-3', 66],
            ['forwards-4', 66],
            ['forwards-5', 66],
            ['forwards-6', 66],
            ['forwards-7', 66],
            ['forwards-8', 66],
        ]

        this.animations[FighterState.WALK_BACKWARDS] = [
            ['forwards-8', 66],
            ['forwards-7', 66],
            ['forwards-6', 66],
            ['forwards-5', 66],
            ['forwards-4', 66],
            ['forwards-3', 66],
            ['forwards-2', 66],
            ['forwards-1', 66],
        ]

        this.animations[FighterState.JUMP_START] = [
            ['jump-start-1', 66],
            ['jump-start-1', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.JUMP_UP] = [
            ['jump-up-1', 66],
            ['jump-up-1', FrameDelay.FREEZE],
        ]
        this.animations[FighterState.JUMP_LAND] = [
            ['jump-land-1', 66],
            ['jump-land-2', 66],
            ['jump-land-2', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.JUMP_ROLL_LAND] = [
            ['jump-roll-land-1', 66],
            ['jump-roll-land-1', FrameDelay.TRANSITION],
        ]

        this.animations[FighterState.JUMP_FORWARDS] = [
            ['jump-forwards-1', 66],
            ['jump-forwards-2', 66],
            ['jump-forwards-3', 66],
            ['jump-forwards-4', 66],
            ['jump-forwards-5', 66],
            ['jump-forwards-6', 66],
            ['jump-forwards-7', 66],
            ['jump-forwards-8', 66],
        ]

        this.animations[FighterState.JUMP_BACKWARDS] = [
            ['jump-forwards-8', 66],
            ['jump-forwards-7', 66],
            ['jump-forwards-6', 66],
            ['jump-forwards-5', 66],
            ['jump-forwards-4', 66],
            ['jump-forwards-3', 66],
            ['jump-forwards-2', 66],
            ['jump-forwards-1', 66],
        ]

        this.animations[FighterState.CROUCH] = [['crouch-3', FrameDelay.FREEZE]]

        this.animations[FighterState.CROUCH_DOWN] = [
            ['crouch-1', 33],
            ['crouch-2', 33],
            ['crouch-3', 33],
            ['crouch-3', FrameDelay.TRANSITION],
        ]

        this.animations[FighterState.CROUCH_UP] = [
            ['crouch-3', 33],
            ['crouch-2', 33],
            ['crouch-1', 33],
            ['crouch-1', FrameDelay.TRANSITION],
        ]

        this.animations[FighterState.CROUCH_TURN] = [['crouch-3', FrameDelay.FREEZE]]
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        super.draw(context, camera)
    }
}
