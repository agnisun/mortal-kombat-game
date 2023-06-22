import '@assets/styles/style.css'
import { Stage } from '@entities/stage'
import { Raiden } from '@entities/raiden'
import { LiuKang } from '@entities/liu-kang'
import { STAGE_MID_POINT, STAGE_PADDING } from '@constants/stage'
import { Fighter } from '@entities/fighter'
import { FrameTime, PlayerId } from './types'
import { StatusBar } from '@entities/overlays/status-bar'
import { Camera } from './camera'
import { getContext } from '@utils/context'

export class MortalKombatGame {
    fighters: [Raiden, LiuKang]
    entities: [Stage, Fighter, Fighter, StatusBar]
    frameTime: FrameTime
    context: CanvasRenderingContext2D
    camera: Camera

    constructor() {
        this.context = getContext()
        this.fighters = [new Raiden(PlayerId.FIRST), new LiuKang(PlayerId.SECOND)]
        this.fighters[0].opponent = this.fighters[1]
        this.fighters[1].opponent = this.fighters[0]

        this.camera = new Camera({ x: STAGE_MID_POINT + STAGE_PADDING - this.context.canvas.width / 2, y: 16 }, this.fighters)

        this.entities = [new Stage(), ...this.fighters, new StatusBar(this.fighters)]
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
