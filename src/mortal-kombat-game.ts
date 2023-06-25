import '@assets/styles/style.css'
import { Stage } from '@entities/stages/stage'
import { STAGE_MID_POINT, STAGE_PADDING } from '@constants/stage'
import { StatusBar } from '@entities/overlays/status-bar'
import { Camera } from '@entities/camera/camera'
import { getContext } from '@utils/context'
import { gameState } from '@states/game-state'
import { FrameTime } from '@ts/types/frame'
import { FighterHero } from '@ts/types/fighter'

export class MortalKombatGame {
    entities: [Stage, FighterHero, FighterHero, StatusBar]
    frameTime: FrameTime
    context: CanvasRenderingContext2D
    camera: Camera

    constructor() {
        this.context = getContext()

        this.camera = new Camera({ x: STAGE_MID_POINT + STAGE_PADDING - this.context.canvas.width / 2, y: 16 })
        const fighters = gameState.fighters.map(({ fighter }) => fighter) as [FighterHero, FighterHero]
        this.entities = [new Stage(), ...fighters, new StatusBar()]
        this.frameTime = {
            previous: 0,
            secondsPassed: 0,
        }
    }

    update() {
        this.camera.update(this.context, this.frameTime)

        this.entities.forEach((entity) => {
            entity.update(this.context, this.frameTime, this.camera)
        })
    }

    draw() {
        this.entities.forEach((entity) => {
            entity.draw(this.context, this.camera)
        })
    }

    frame(time: DOMHighResTimeStamp) {
        this.frameTime.secondsPassed = (time - this.frameTime.previous) / 1000
        this.frameTime.previous = time

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)

        this.update()
        this.draw()

        requestAnimationFrame(this.frame.bind(this))
    }

    start() {
        requestAnimationFrame(this.frame.bind(this))
    }
}
