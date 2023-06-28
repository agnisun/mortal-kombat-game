import { FIGHTER_START, PUSH_FRICTION, hurtStateValidFrom } from '@constants/fighter'
import { STAGE_MID_POINT, STAGE_PADDING, STAGE_FLOOR } from '@constants/stage'
import { Camera } from '@entities/camera/camera'
import { FighterState, FighterDirection, FighterAttack, FighterId, FighterAttackStrength, FighterHurtBox } from '@ts/enums/fighter'
import { FrameDelay } from '@ts/enums/frame'
import { Position, PlayerId } from '@ts/types'
import { InitialVelocity, FighterStates, FighterAnimations, VelocityX, FighterBoxes } from '@ts/types/fighter'
import { FrameTime } from '@ts/types/frame'
import { boxOverlap, getActualBoxDimensions, rectsOverlap } from '@utils/collisions'
import * as control from '@handlers/input-register'
import { FRAME_TIME } from '@constants/game'
import { gameState } from '@states/game-state'

export abstract class Fighter {
    image: HTMLImageElement = new Image()
    name!: FighterId
    position: Position
    velocity: Position = {
        x: 0,
        y: 0,
    }
    gravity = 1200
    initialVelocity: InitialVelocity = {
        x: {
            [FighterState.WALK_FORWARDS]: 100,
            [FighterState.WALK_BACKWARDS]: -80,
            [FighterState.JUMP_FORWARDS]: 150,
            [FighterState.JUMP_BACKWARDS]: -150,
        },
        jump: -480,
    }
    frames!: Map<string, [number[], [number, number], number[], number[][], number[]?]>
    animationFrame = 0
    animationTimer = 0
    currentState: FighterState = FighterState.IDLE
    states: FighterStates = {
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
                FighterState.LIGHT_PUNCH,
                FighterState.LIGHT_KICK,
                FighterState.MEDIUM_KICK,
                FighterState.HURT_HEAD_LIGHT,
                FighterState.HURT_BODY_LIGHT,
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
        [FighterState.LIGHT_PUNCH]: {
            attackType: FighterAttack.PUNCH,
            attackStrength: FighterAttackStrength.LIGHT,
            init: this.handleStandartLightAttackInit.bind(this),
            update: this.handleLightPunchState.bind(this),
            validFrom: [FighterState.IDLE, FighterState.WALK_FORWARDS, FighterState.WALK_BACKWARDS],
        },
        [FighterState.LIGHT_KICK]: {
            attackType: FighterAttack.KICK,
            attackStrength: FighterAttackStrength.LIGHT,
            init: this.handleStandartLightAttackInit.bind(this),
            update: this.handleLightKickState.bind(this),
            validFrom: [FighterState.IDLE, FighterState.WALK_FORWARDS, FighterState.WALK_BACKWARDS],
        },
        [FighterState.MEDIUM_KICK]: {
            attackType: FighterAttack.KICK,
            attackStrength: FighterAttackStrength.LIGHT,
            init: this.handleStandartMediumAttackInit.bind(this),
            update: this.handleMediumKickState.bind(this),
            validFrom: [FighterState.IDLE, FighterState.WALK_FORWARDS, FighterState.WALK_BACKWARDS],
        },
        [FighterState.HURT_HEAD_LIGHT]: {
            init: this.handleHurtInit.bind(this),
            update: this.handleHurtState.bind(this),
            validFrom: hurtStateValidFrom,
        },
        [FighterState.HURT_BODY_LIGHT]: {
            init: this.handleHurtInit.bind(this),
            update: this.handleHurtState.bind(this),
            validFrom: hurtStateValidFrom,
        },
        [FighterState.WIN]: {
            init: this.handleFinishInit.bind(this),
            validFrom: hurtStateValidFrom,
        },
        [FighterState.LOSE]: {
            init: this.handleFinishInit.bind(this),
            validFrom: hurtStateValidFrom,
        },
    }
    animations: FighterAnimations = {
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
        lightKick: [],
        lightPunch: [],
        mediumKick: [],
        hurtHeadLight: [],
        hurtBodyLight: [],
        win: [],
        lose: [],
    }
    direction: FighterDirection
    playerId: PlayerId
    opponent!: Fighter
    boxes: FighterBoxes = {
        push: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },
        hurt: {
            [FighterHurtBox.HEAD]: [0, 0, 0, 0],
            [FighterHurtBox.BODY]: [0, 0, 0, 0],
            [FighterHurtBox.FEET]: [0, 0, 0, 0],
        },
        hit: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },
    }
    attackStroke = false
    onAttackHit: (player: PlayerId, opponentId: PlayerId, strength: FighterAttackStrength) => void

    protected constructor(playerId: PlayerId, onAttackHit: (player: PlayerId, opponentId: PlayerId, strength: FighterAttackStrength) => void) {
        this.playerId = playerId
        this.position = { x: STAGE_MID_POINT + STAGE_PADDING + (playerId === 0 ? -FIGHTER_START : FIGHTER_START), y: STAGE_FLOOR }
        this.direction = playerId === 0 ? FighterDirection.RIGHT : FighterDirection.LEFT
        this.onAttackHit = onAttackHit
    }

    setAnimationFrame(frame: number, time: FrameTime) {
        const animation = this.animations[this.currentState]

        this.animationFrame = frame

        if (this.animationFrame >= animation.length) this.animationFrame = 0

        const [frameKey, frameDelay] = animation[this.animationFrame]
        this.boxes = this.getBoxes(frameKey)
        this.animationTimer = time.previous + frameDelay * FRAME_TIME
    }

    changeState(newState: FighterState, time: FrameTime) {
        if (!this.states[newState].validFrom.includes(this.currentState)) return

        this.currentState = newState
        this.setAnimationFrame(0, time)

        const state = this.states[newState]

        if (state.init) state.init()
    }

    handleIdleInit() {
        this.resetVelocities()
        this.attackStroke = false
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

    handleStandartLightAttackInit() {
        this.resetVelocities()
    }

    handleStandartMediumAttackInit() {
        this.resetVelocities()
    }

    handleHurtInit() {
        this.resetVelocities()
    }

    handleFinishInit() {
        this.resetVelocities()
    }

    handleIdleState(time: FrameTime) {
        if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START, time)
        else if (control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_DOWN, time)
        else if (control.isForward(this.playerId, this.direction)) this.changeState(FighterState.WALK_FORWARDS, time)
        else if (control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.WALK_BACKWARDS, time)
        else if (control.isLightPunch(this.playerId)) this.changeState(FighterState.LIGHT_PUNCH, time)
        else if (control.isLightKick(this.playerId)) this.changeState(FighterState.LIGHT_KICK, time)
        else if (control.isMediumKick(this.playerId)) this.changeState(FighterState.MEDIUM_KICK, time)

        const newDirection = this.getDirection()

        if (newDirection !== this.direction) {
            this.direction = newDirection
            this.changeState(FighterState.IDLE_TURN, time)
        }
    }

    handleIdleTurnState(time: FrameTime) {
        this.handleIdleState(time)

        if (!this.isAnimationCompleted()) {
            return
        }

        this.changeState(FighterState.IDLE, time)
    }

    handleWalkForwardsState(time: FrameTime) {
        if (!control.isForward(this.playerId, this.direction)) this.changeState(FighterState.IDLE, time)
        else if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START, time)
        else if (control.isLightPunch(this.playerId)) this.changeState(FighterState.LIGHT_PUNCH, time)
        else if (control.isLightKick(this.playerId)) this.changeState(FighterState.LIGHT_KICK, time)
        else if (control.isMediumKick(this.playerId)) this.changeState(FighterState.MEDIUM_KICK, time)

        this.direction = this.getDirection()
    }
    handleWalkBackwardsState(time: FrameTime) {
        if (!control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.IDLE, time)
        else if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START, time)
        else if (control.isLightPunch(this.playerId)) this.changeState(FighterState.LIGHT_PUNCH, time)
        else if (control.isLightKick(this.playerId)) this.changeState(FighterState.LIGHT_KICK, time)
        else if (control.isMediumKick(this.playerId)) this.changeState(FighterState.MEDIUM_KICK, time)

        this.direction = this.getDirection()
    }

    handleJumpStartState(time: FrameTime) {
        if (this.isAnimationCompleted()) {
            if (control.isBackward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_BACKWARDS, time)
            } else if (control.isForward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_FORWARDS, time)
            } else {
                this.changeState(FighterState.JUMP_UP, time)
            }
        }
    }

    handleJumpState(time: FrameTime) {
        this.velocity.y += this.gravity * time.secondsPassed

        if (this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR
            if (this.currentState === FighterState.JUMP_FORWARDS || this.currentState === FighterState.JUMP_BACKWARDS)
                this.changeState(FighterState.JUMP_ROLL_LAND, time)
            else this.changeState(FighterState.JUMP_LAND, time)
        }
    }

    handleJumpLandState(time: FrameTime) {
        if (this.animationFrame < 1) return

        let newState = FighterState.IDLE

        if (!control.isIdle(this.playerId)) {
            this.direction = this.getDirection()

            this.handleIdleState(time)
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

        this.changeState(newState, time)
    }

    handleCrouchState(time: FrameTime) {
        if (!control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_UP, time)

        const newDirection = this.getDirection()

        if (newDirection !== this.direction) {
            this.direction = newDirection
            this.changeState(FighterState.IDLE_TURN, time)
        }
    }

    handleCrouchUpState(time: FrameTime) {
        if (this.isAnimationCompleted()) {
            this.changeState(FighterState.IDLE, time)
        }
    }
    handleCrouchDownState(time: FrameTime) {
        if (this.isAnimationCompleted()) {
            this.changeState(FighterState.CROUCH, time)
        }
    }

    handleCrouchTurnState(time: FrameTime) {
        this.handleCrouchState(time)

        if (!this.isAnimationCompleted()) return
        this.changeState(FighterState.CROUCH, time)
    }

    handleLightAttackReset(time: FrameTime) {
        this.setAnimationFrame(0, time)
        this.resetVelocities()
        this.attackStroke = false
    }

    handleLightPunchState(time: FrameTime) {
        const animationsLength = this.animations[FighterState.LIGHT_PUNCH].length - 1
        if (this.animationFrame < animationsLength) return
        if (control.isLightPunch(this.playerId)) this.handleLightAttackReset(time)

        if (!this.isAnimationCompleted()) return

        this.changeState(FighterState.IDLE, time)
    }

    handleLightKickState(time: FrameTime) {
        const animationsLength = this.animations[FighterState.LIGHT_KICK].length - 1

        if (this.animationFrame < animationsLength) return
        if (control.isLightKick(this.playerId)) this.handleLightAttackReset(time)

        if (!this.isAnimationCompleted()) return

        this.changeState(FighterState.IDLE, time)
    }

    handleMediumKickState(time: FrameTime) {
        if (!this.isAnimationCompleted()) return

        this.changeState(FighterState.IDLE, time)
    }

    handleHurtState(time: FrameTime) {
        if (!this.isAnimationCompleted()) return

        for (const fighter of gameState.fighters) {
            if (fighter.playerId === this.playerId) {
                if (fighter.healthPoints === 0) {
                    this.changeState(FighterState.LOSE, time)
                    this.opponent.changeState(FighterState.WIN, time)
                    return
                }
            }
        }

        this.changeState(FighterState.IDLE, time)
    }

    handleAttackHit(strength: FighterAttackStrength, hitLocation: string, time: FrameTime) {
        const newState = this.getHitState(strength, hitLocation) as FighterState
        this.changeState(newState, time)
    }

    hasCollideWithOpponent() {
        return rectsOverlap(
            this.position.x + this.boxes.push.x,
            this.position.y + this.boxes.push.y,
            this.boxes.push.width,
            this.boxes.push.height,
            this.opponent.position.x + this.opponent.boxes.push.x,
            this.opponent.position.y + this.opponent.boxes.push.y,
            this.opponent.boxes.push.width,
            this.opponent.boxes.push.height
        )
    }

    isAnimationCompleted() {
        return this.animations[this.currentState][this.animationFrame][1] === FrameDelay.TRANSITION
    }

    resetVelocities() {
        this.velocity = { x: 0, y: 0 }
    }

    getDirection() {
        if (this.position.x + this.boxes.push.x + this.boxes.push.width <= this.opponent.position.x + this.opponent.boxes.push.x) {
            return FighterDirection.RIGHT
        } else if (this.position.x + this.boxes.push.x >= this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width) {
            return FighterDirection.LEFT
        }

        return this.direction
    }

    getBoxes(frameKey: string): FighterBoxes {
        const [
            ,
            ,
            [pushX = 0, pushY = 0, pushWidth = 0, pushHeight = 0] = [],
            [head = [0, 0, 0, 0], body = [0, 0, 0, 0], feet = [0, 0, 0, 0]] = [],
            [hitX = 0, hitY = 0, hitWidth = 0, hitHeight = 0] = [],
        ] = this.frames.get(frameKey) as [number[], [number, number], number[], number[][]]

        return {
            push: { x: pushX, y: pushY, width: pushWidth, height: pushHeight },
            hurt: {
                [FighterHurtBox.HEAD]: head,
                [FighterHurtBox.BODY]: body,
                [FighterHurtBox.FEET]: feet,
            },
            hit: { x: hitX, y: hitY, width: hitWidth, height: hitHeight },
        }
    }

    getHitState(strength: FighterAttackStrength, hitLocation: string) {
        switch (strength) {
            case FighterAttackStrength.LIGHT:
                if (hitLocation === FighterHurtBox.HEAD) return FighterState.HURT_HEAD_LIGHT
                return FighterState.HURT_BODY_LIGHT
        }
    }

    updateStageContraints(context: CanvasRenderingContext2D, time: FrameTime, camera: Camera) {
        if (this.position.x > camera.position.x + context.canvas.width - this.boxes.push.width) {
            this.position.x = camera.position.x + context.canvas.width - this.boxes.push.width
        }

        if (this.position.x < camera.position.x + this.boxes.push.width) {
            this.position.x = camera.position.x + this.boxes.push.width
        }

        if (this.hasCollideWithOpponent()) {
            if (this.position.x <= this.opponent.position.x) {
                this.position.x = Math.max(
                    this.opponent.position.x + this.opponent.boxes.push.x - (this.boxes.push.x + this.boxes.push.width),
                    camera.position.x + this.boxes.push.width
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
                    this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width + (this.boxes.push.x + this.boxes.push.width),
                    camera.position.x + context.canvas.width - this.boxes.push.width
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

    updateAttackBoxCollided(time: FrameTime) {
        if (!this.states[this.currentState].attackType || this.attackStroke) return

        const actualHitBox = getActualBoxDimensions(this.position, this.direction, this.boxes.hit)

        for (const [hurtLocation, hurtBox] of Object.entries(this.opponent.boxes.hurt)) {
            const [x, y, width, height] = hurtBox
            const actualOpponentHurtBox = getActualBoxDimensions(this.opponent.position, this.opponent.direction, { x, y, width, height })

            if (!boxOverlap(actualHitBox, actualOpponentHurtBox)) continue
            const strength = this.states[this.currentState].attackStrength as FighterAttackStrength

            this.onAttackHit(this.playerId, this.opponent.playerId, strength)

            this.opponent.handleAttackHit(strength, hurtLocation, time)

            this.attackStroke = true
            return
        }
    }

    updateAnimation(time: FrameTime) {
        const animation = this.animations[this.currentState]

        if (animation[this.animationFrame][1] <= FrameDelay.FREEZE || time.previous <= this.animationTimer) return

        this.setAnimationFrame(this.animationFrame + 1, time)
    }

    update(context: CanvasRenderingContext2D, time: FrameTime, camera: Camera) {
        this.position.x += this.velocity.x * this.direction * time.secondsPassed
        this.position.y += this.velocity.y * time.secondsPassed

        const state = this.states[this.currentState]

        if (state.update) state.update(time)
        this.updateAnimation(time)
        this.updateStageContraints(context, time, camera)
        this.updateAttackBoxCollided(time)
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
    }

    drawDebugBox(context: CanvasRenderingContext2D, camera: Camera, dimensions: number[], baseColor: string) {
        if (!Array.isArray(dimensions)) return

        const [x = 0, y = 0, width = 0, height = 0] = dimensions

        context.beginPath()
        context.strokeStyle = baseColor + 'AA'
        context.fillStyle = baseColor + '44'
        context.fillRect(
            Math.floor(this.position.x + x * this.direction - camera.position.x) + 0.5,
            Math.floor(this.position.y + y - camera.position.y) + 0.5,
            width * this.direction,
            height
        )
        context.rect(
            Math.floor(this.position.x + x * this.direction - camera.position.x) + 0.5,
            Math.floor(this.position.y + y - camera.position.y) + 0.5,
            width * this.direction,
            height
        )
        context.stroke()
    }

    drawDebug(context: CanvasRenderingContext2D, camera: Camera) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame]
        const boxes = this.getBoxes(frameKey)
        const { push, hurt, hit } = boxes

        context.lineWidth = 1

        this.drawDebugBox(context, camera, Object.values(push), '#55FF55')

        for (const hurtBox of Object.values(hurt)) {
            this.drawDebugBox(context, camera, hurtBox, '#7777FF')
        }

        this.drawDebugBox(context, camera, Object.values(hit), '#FF0000')

        context.beginPath()
        context.strokeStyle = 'white'
        context.moveTo(Math.floor(this.position.x - camera.position.x - 4), Math.floor(this.position.y - camera.position.y) - 0.5)
        context.lineTo(Math.floor(this.position.x - camera.position.x + 5), Math.floor(this.position.y - camera.position.y) - 0.5)
        context.moveTo(Math.floor(this.position.x - camera.position.x) + 0.5, Math.floor(this.position.y - camera.position.y) - 5)
        context.lineTo(Math.floor(this.position.x - camera.position.x) + 0.5, Math.floor(this.position.y - camera.position.y) + 4)
        context.stroke()
    }
}
