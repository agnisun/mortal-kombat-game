import { Fighter } from './fighter'
import { PlayerId } from '../types'
import { FighterState, FrameDelay, PushBox } from '@constants/figther'
import { Camera } from '../camera'

export class Raiden extends Fighter {
    constructor(playerId: PlayerId) {
        super('Raiden', playerId)
        const image = document.querySelector('img[alt="raiden"]') as HTMLImageElement
        this.image = image
        this.frames = new Map([
            ['forwards-1', [[782, 141, 46, 101], [23, 98], PushBox.IDLE]],
            ['forwards-2', [[838, 144, 40, 102], [20, 99], PushBox.IDLE]],
            ['forwards-3', [[888, 143, 40, 103], [20, 100], PushBox.IDLE]],
            ['forwards-4', [[940, 144, 40, 102], [20, 99], PushBox.IDLE]],
            ['forwards-5', [[993, 145, 40, 101], [20, 98], PushBox.IDLE]],
            ['forwards-6', [[1043, 143, 46, 103], [23, 100], PushBox.IDLE]],
            ['forwards-7', [[1100, 142, 40, 104], [20, 101], PushBox.IDLE]],
            ['forwards-8', [[1150, 142, 40, 104], [20, 101], PushBox.IDLE]],
            ['forwards-9', [[1201, 145, 40, 101], [20, 98], PushBox.IDLE]],

            ['idle-1', [[103, 21, 46, 102], [23, 99], PushBox.IDLE]],
            ['idle-2', [[162, 21, 46, 102], [23, 99], PushBox.IDLE]],
            ['idle-3', [[221, 21, 46, 102], [23, 99], PushBox.IDLE]],
            ['idle-4', [[279, 21, 46, 102], [23, 99], PushBox.IDLE]],
            ['idle-5', [[338, 21, 46, 102], [23, 99], PushBox.IDLE]],
            ['idle-6', [[456, 21, 46, 102], [23, 99], PushBox.IDLE]],
            ['idle-7', [[577, 21, 46, 102], [23, 99], PushBox.IDLE]],
            ['idle-8', [[635, 21, 46, 102], [23, 99], PushBox.IDLE]],

            ['idle-turn-1', [[20, 143, 47, 103], [24, 100], PushBox.IDLE]],
            ['idle-turn-2', [[78, 142, 47, 104], [24, 101], PushBox.IDLE]],
            ['idle-turn-3', [[136, 143, 47, 103], [24, 100], PushBox.IDLE]],

            ['jump-start-1', [[1405, 157, 51, 89], [25, 86], PushBox.IDLE]],

            ['jump-up-1', [[1290, 162, 44, 84], [22, 81], PushBox.JUMP_UP]],

            ['jump-land-1', [[1405, 157, 51, 89], [25, 86], PushBox.IDLE]],

            ['jump-roll-land-1', [[1501, 155, 42, 91], [21, 88], PushBox.IDLE]],

            ['jump-forwards-1', [[1552, 191, 36, 55], [13, 52], PushBox.JUMP]],
            ['jump-forwards-2', [[1598, 196, 43, 50], [21, 47], PushBox.JUMP]],
            ['jump-forwards-3', [[1650, 204, 48, 42], [24, 39], PushBox.JUMP]],
            ['jump-forwards-4', [[1710, 195, 44, 51], [22, 48], PushBox.JUMP]],
            ['jump-forwards-5', [[1765, 192, 36, 54], [13, 51], PushBox.JUMP]],
            ['jump-forwards-6', [[1812, 196, 42, 50], [21, 47], PushBox.JUMP]],
            ['jump-forwards-7', [[1866, 204, 47, 42], [23, 39], PushBox.JUMP]],

            ['crouch-1', [[441, 157, 45, 89], [22, 86], PushBox.IDLE]],
            ['crouch-2', [[500, 157, 47, 89], [23, 86], PushBox.IDLE]],
            ['crouch-3', [[557, 187, 48, 59], [24, 56], PushBox.CROUCH]],
        ])

        this.animations[FighterState.IDLE] = [
            ['idle-1', 133],
            ['idle-2', 133],
            ['idle-3', 133],
            ['idle-4', 133],
            ['idle-5', 133],
            ['idle-6', 133],
            ['idle-7', 133],
            ['idle-8', 133],
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
            ['forwards-9', 66],
        ]

        this.animations[FighterState.WALK_BACKWARDS] = [
            ['forwards-9', 66],
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
            ['jump-start-1', 133],
            ['jump-start-1', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.JUMP_UP] = [
            ['jump-up-1', 133],
            ['jump-up-1', FrameDelay.FREEZE],
        ]
        this.animations[FighterState.JUMP_LAND] = [
            ['jump-land-1', 133],
            ['jump-land-1', FrameDelay.TRANSITION],
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
        ]

        this.animations[FighterState.JUMP_BACKWARDS] = [
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
