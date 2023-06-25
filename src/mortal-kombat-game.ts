import '@assets/styles/style.css'
import { getContext } from '@utils/context'
import { FrameTime } from '@ts/types/frame'
import { BattleScene } from '@scenes/battle-scene'
import { registerKeyboardEvents } from '@handlers/input-register'

export class MortalKombatGame {
    context: CanvasRenderingContext2D = getContext()
    scene: BattleScene
    frameTime: FrameTime

    constructor() {
        this.scene = new BattleScene()
        this.frameTime = {
            secondsPassed: 0,
            previous: 0,
        }
    }

    frame(time: DOMHighResTimeStamp) {
        this.frameTime.secondsPassed = (time - this.frameTime.previous) / 1000
        this.frameTime.previous = time

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)

        this.scene.update(this.context, this.frameTime)
        this.scene.draw(this.context)

        requestAnimationFrame(this.frame.bind(this))
    }

    start() {
        registerKeyboardEvents()

        requestAnimationFrame(this.frame.bind(this))
    }
}
