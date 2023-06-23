import { FIGHTER_START, PUSH_FRICTION } from '@constants/fighter-constants'
import { STAGE_MID_POINT, STAGE_PADDING, STAGE_FLOOR } from '@constants/stage-constants'
import { Camera } from '@entities/camera/camera'
import { FighterState, FighterDirection } from '@ts/enums/fighter-enums'
import { FrameDelay } from '@ts/enums/frame-enums'
import { Position, PlayerId } from '@ts/types'
import { InitialVelocity, FighterStates, FighterAnimations, FighterPushBox, VelocityX } from '@ts/types/fighter-types'
import { FrameTime } from '@ts/types/frame-types'
import { rectsOverlap } from '@utils/collisions'
import * as control from '@handlers/input-register'

export abstract class Fighter {
    image: HTMLImageElement
    position: Position
    velocity: Position
    gravity: number
    initialVelocity: InitialVelocity
    frames: Map<string, number[][]>
    animationFrame: number
    animationTimer: number
    currentState: FighterState
    states: FighterStates
    animations!: FighterAnimations
    direction: FighterDirection
    playerId: PlayerId
    opponent!: Fighter
    pushbox: FighterPushBox

    protected constructor(playerId: PlayerId) {
        this.playerId = playerId
        this.image = new Image()
        this.position = { x: STAGE_MID_POINT + STAGE_PADDING + (playerId === 0 ? -FIGHTER_START : FIGHTER_START), y: STAGE_FLOOR }
        this.direction = playerId === 0 ? FighterDirection.RIGHT : FighterDirection.LEFT
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.initialVelocity = {
            x: {
                [FighterState.WALK_FORWARDS]: 100,
                [FighterState.WALK_BACKWARDS]: -80,
                [FighterState.JUMP_FORWARDS]: 150,
                [FighterState.JUMP_BACKWARDS]: -150,
            },
            jump: -480,
        }
        this.gravity = 1200
        this.animationFrame = 0
        this.animationTimer = 0
        this.frames = new Map()
        this.currentState = FighterState.IDLE
        this.animations = {
            idle: [],
            idleTurn: [],
            walkBackwards: [],
            walkForwards: [],
            crouch: [],
            crouchDown: [],
            crouchTurn: [],
            crouchUp: [],
            jumpBackwards: [],
            jumpForwards: [],
            jumpLand: [],
            jumpRollLand: [],
            jumpStart: [],
            jumpUp: [],
        }
        this.pushbox = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
        this.states = {
            [FighterState.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validFrom: [
                    undefined,
                    FighterState.IDLE,
                    FighterState.IDLE_TURN,
                    FighterState.JUMP_UP,
                    FighterState.JUMP_BACKWARDS,
                    FighterState.JUMP_FORWARDS,
                    FighterState.WALK_FORWARDS,
                    FighterState.WALK_BACKWARDS,
                    FighterState.CROUCH_UP,
                    FighterState.JUMP_LAND,
                    FighterState.JUMP_ROLL_LAND,
                ],
            },
            [FighterState.IDLE_TURN]: {
                update: this.handleIdleTurnState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARDS, FighterState.WALK_FORWARDS, FighterState.JUMP_LAND, FighterState.JUMP_ROLL_LAND],
            },
            [FighterState.WALK_FORWARDS]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkForwardsState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARDS],
            },
            [FighterState.WALK_BACKWARDS]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkBackwardsState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARDS],
            },
            [FighterState.JUMP_START]: {
                init: this.handleJumpStartInit.bind(this),
                update: this.handleJumpStartState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARDS, FighterState.WALK_BACKWARDS, FighterState.JUMP_LAND, FighterState.JUMP_ROLL_LAND],
            },
            [FighterState.JUMP_UP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START],
            },
            [FighterState.JUMP_FORWARDS]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START],
            },
            [FighterState.JUMP_BACKWARDS]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START],
            },
            [FighterState.JUMP_LAND]: {
                init: this.handleJumpLandInit.bind(this),
                update: this.handleJumpLandState.bind(this),
                validFrom: [FighterState.JUMP_UP, FighterState.JUMP_FORWARDS, FighterState.JUMP_BACKWARDS],
            },
            [FighterState.JUMP_ROLL_LAND]: {
                init: this.handleJumpLandInit.bind(this),
                update: this.handleJumpLandState.bind(this),
                validFrom: [FighterState.JUMP_FORWARDS, FighterState.JUMP_BACKWARDS],
            },
            [FighterState.CROUCH]: {
                init: this.handleCrouchInit.bind(this),
                update: this.handleCrouchState.bind(this),
                validFrom: [FighterState.CROUCH_DOWN],
            },
            [FighterState.CROUCH_UP]: {
                update: this.handleCrouchUpState.bind(this),
                validFrom: [FighterState.CROUCH],
            },
            [FighterState.CROUCH_DOWN]: {
                init: this.handleCrouchDownInit.bind(this),
                update: this.handleCrouchDownState.bind(this),
                validFrom: [FighterState.IDLE],
            },
            [FighterState.CROUCH_TURN]: {
                update: this.handleCrouchTurnState.bind(this),
                validFrom: [FighterState.CROUCH],
            },
        }

        this.changeState(FighterState.IDLE)
    }

    changeState(newState: FighterState) {
        if (newState === this.currentState || !this.states[newState].validFrom.includes(this.currentState)) return

        this.currentState = newState
        this.animationFrame = 0

        const state = this.states[newState]

        if (state.init) state.init()
    }

    handleIdleInit() {
        this.resetVelocities()
    }

    handleCrouchInit() {
        this.resetVelocities()
    }

    handleCrouchDownInit() {
        this.resetVelocities()
    }

    handleJumpStartInit() {
        this.resetVelocities()
    }

    handleJumpInit() {
        let jump = this.initialVelocity.jump

        if (this.currentState === FighterState.JUMP_FORWARDS || this.currentState === FighterState.JUMP_BACKWARDS) {
            jump -= 80
        }

        this.velocity.y = jump
        this.handleMoveInit()
    }

    handleMoveInit() {
        this.velocity.x = this.initialVelocity.x[this.currentState as VelocityX] ?? 0
    }

    handleJumpLandInit() {
        this.resetVelocities()
    }

    handleIdleState() {
        if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START)
        else if (control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_DOWN)
        else if (control.isForward(this.playerId, this.direction)) this.changeState(FighterState.WALK_FORWARDS)
        else if (control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.WALK_BACKWARDS)

        const newDirection = this.getDirection()

        if (newDirection !== this.direction) {
            this.direction = newDirection
            this.changeState(FighterState.IDLE_TURN)
        }
    }

    handleIdleTurnState() {
        this.handleIdleState()

        if (!this.isAnimationCompleted()) {
            return
        }

        this.changeState(FighterState.IDLE)
    }

    handleWalkForwardsState() {
        if (!control.isForward(this.playerId, this.direction)) this.changeState(FighterState.IDLE)
        else if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START)
        else if (control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_DOWN)

        this.direction = this.getDirection()
    }
    handleWalkBackwardsState() {
        if (!control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.IDLE)
        else if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START)
        else if (control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_DOWN)

        this.direction = this.getDirection()
    }

    handleJumpStartState() {
        if (this.isAnimationCompleted()) {
            if (control.isBackward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_BACKWARDS)
            } else if (control.isForward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_FORWARDS)
            } else {
                this.changeState(FighterState.JUMP_UP)
            }
        }
    }

    handleJumpState(_context: CanvasRenderingContext2D, time: FrameTime) {
        this.velocity.y += this.gravity * time.secondsPassed

        if (this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR
            if (this.currentState === FighterState.JUMP_FORWARDS || this.currentState === FighterState.JUMP_BACKWARDS)
                this.changeState(FighterState.JUMP_ROLL_LAND)
            else this.changeState(FighterState.JUMP_LAND)
        }
    }

    handleJumpLandState() {
        if (this.animationFrame < 1) return

        let newState = FighterState.IDLE

        if (!control.isIdle(this.playerId)) {
            this.direction = this.getDirection()

            this.handleIdleState()
        } else {
            const newDirection = this.getDirection()

            if (newDirection !== this.direction) {
                this.direction = newDirection
                newState = FighterState.IDLE_TURN
            } else {
                if (!this.isAnimationCompleted()) {
                    return
                }
            }
        }

        this.changeState(newState)
    }

    handleCrouchState() {
        if (!control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_UP)

        const newDirection = this.getDirection()

        if (newDirection !== this.direction) {
            this.direction = newDirection
            this.changeState(FighterState.IDLE_TURN)
        }
    }

    handleCrouchUpState() {
        if (this.isAnimationCompleted()) {
            this.changeState(FighterState.IDLE)
        }
    }
    handleCrouchDownState() {
        if (this.isAnimationCompleted()) {
            this.changeState(FighterState.CROUCH)
        }
    }

    handleCrouchTurnState() {
        this.handleCrouchState()

        if (!this.isAnimationCompleted()) return
        this.changeState(FighterState.CROUCH)
    }

    hasCollideWithOpponent() {
        return rectsOverlap(
            this.position.x + this.pushbox.x,
            this.position.y + this.pushbox.y,
            this.pushbox.width,
            this.pushbox.height,
            this.opponent.position.x + this.opponent.pushbox.x,
            this.opponent.position.y + this.opponent.pushbox.y,
            this.opponent.pushbox.width,
            this.opponent.pushbox.height
        )
    }

    isAnimationCompleted() {
        return this.animations[this.currentState][this.animationFrame][1] === FrameDelay.TRANSITION
    }

    resetVelocities() {
        this.velocity.x = 0
        this.velocity.y = 0
    }

    getDirection() {
        if (this.position.x + this.pushbox.x + this.pushbox.width <= this.opponent.position.x + this.opponent.pushbox.x) {
            return FighterDirection.RIGHT
        } else if (this.position.x + this.pushbox.x >= this.opponent.position.x + this.opponent.pushbox.x + this.opponent.pushbox.width) {
            return FighterDirection.LEFT
        }

        return this.direction
    }

    getPushBox(frameKey: string) {
        const [, , [x, y, width, height] = [0, 0, 0, 0]] = this.frames.get(frameKey) as number[][]

        return { x, y, width, height }
    }

    updateStageContraints(context: CanvasRenderingContext2D, time: FrameTime, camera: Camera) {
        if (this.position.x > camera.position.x + context.canvas.width - this.pushbox.width) {
            this.position.x = camera.position.x + context.canvas.width - this.pushbox.width
        }

        if (this.position.x < camera.position.x + this.pushbox.width) {
            this.position.x = camera.position.x + this.pushbox.width
        }

        if (this.hasCollideWithOpponent()) {
            if (this.position.x <= this.opponent.position.x) {
                this.position.x = Math.max(
                    this.opponent.position.x + this.opponent.pushbox.x - (this.pushbox.x + this.pushbox.width),
                    camera.position.x + this.pushbox.width
                )

                if (
                    [FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP, FighterState.JUMP_FORWARDS, FighterState.JUMP_BACKWARDS].includes(
                        this.opponent.currentState
                    )
                ) {
                    this.opponent.position.x += PUSH_FRICTION * time.secondsPassed
                }
            }

            if (this.position.x >= this.opponent.position.x) {
                this.position.x = Math.min(
                    this.opponent.position.x + this.opponent.pushbox.x + this.opponent.pushbox.width + (this.pushbox.x + this.pushbox.width),
                    camera.position.x + context.canvas.width - this.pushbox.width
                )

                if (
                    [FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP, FighterState.JUMP_FORWARDS, FighterState.JUMP_BACKWARDS].includes(
                        this.opponent.currentState
                    )
                ) {
                    this.opponent.position.x -= PUSH_FRICTION * time.secondsPassed
                }
            }
        }
    }

    updateAnimation(time: FrameTime) {
        const animation = this.animations[this.currentState]
        const [frameKey, frameDelay] = animation[this.animationFrame]

        if (time.previous > this.animationTimer + (frameDelay as number)) {
            this.animationTimer = time.previous

            if (frameDelay > FrameDelay.FREEZE) {
                this.animationFrame++
                this.pushbox = this.getPushBox(frameKey)
            }

            if (this.animationFrame >= animation.length) this.animationFrame = 0
        }
    }

    update(context: CanvasRenderingContext2D, time: FrameTime, camera: Camera) {
        this.position.x += this.velocity.x * this.direction * time.secondsPassed
        this.position.y += this.velocity.y * time.secondsPassed

        const state = this.states[this.currentState]

        if (state.update) state.update(context, time)
        this.updateAnimation(time)
        this.updateStageContraints(context, time, camera)
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame]
        const [[x, y, width, height], [originX, originY]] = this.frames.get(frameKey) as number[][]

        context.scale(this.direction, 1)
        context.drawImage(
            this.image,
            x,
            y,
            width,
            height,
            Math.floor((this.position.x - camera.position.x) * this.direction) - originX,
            Math.floor(this.position.y - camera.position.y) - originY,
            width,
            height
        )
        context.setTransform(1, 0, 0, 1, 0, 0)

        this.drawDebug(context, camera)
    }

    drawDebug(context: CanvasRenderingContext2D, camera: Camera) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame]
        const pushBox = this.getPushBox(frameKey)

        context.lineWidth = 1

        context.beginPath()
        context.strokeStyle = '#55ff55'
        context.fillStyle = '#55ff5555'
        context.fillRect(
            Math.floor(this.position.x + pushBox.x * this.direction - camera.position.x) + 0.5,
            Math.floor(this.position.y + pushBox.y - camera.position.y) + 0.5,
            pushBox.width * this.direction,
            pushBox.height
        )
        context.rect(
            Math.floor(this.position.x + pushBox.x * this.direction - camera.position.x) + 0.5,
            Math.floor(this.position.y + pushBox.y - camera.position.y) + 0.5,
            pushBox.width * this.direction,
            pushBox.height
        )
        context.stroke()

        context.beginPath()
        context.strokeStyle = 'white'
        context.moveTo(Math.floor(this.position.x - camera.position.x - 4), Math.floor(this.position.y - camera.position.y) - 0.5)
        context.lineTo(Math.floor(this.position.x - camera.position.x + 5), Math.floor(this.position.y - camera.position.y) - 0.5)
        context.moveTo(Math.floor(this.position.x - camera.position.x) + 0.5, Math.floor(this.position.y - camera.position.y) - 5)
        context.lineTo(Math.floor(this.position.x - camera.position.x) + 0.5, Math.floor(this.position.y - camera.position.y) + 4)
        context.stroke()
    }
}
