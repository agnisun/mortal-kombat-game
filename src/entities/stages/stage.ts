import { Camera } from '@entities/camera/camera'
import { FrameTime } from '@ts/types/frame-types'
import { drawFrame } from '@utils/context'

export class Stage {
    image: HTMLImageElement
    frames: Map<string, number[]>

    constructor() {
        const image = document.querySelector('img[alt="courtyard"]') as HTMLImageElement

        this.image = image
        this.frames = new Map([
            ['platform', [227, 952, 640, 104]],
            ['throne', [320, 588, 447, 126]],
            ['throne-decoration', [414, 357, 259, 83]],
            ['floor', [10, 1726, 1033, 98]],
            ['monks', [1343, 38, 625, 41]],
            ['guards', [188, 1391, 693, 116]],
        ])
    }

    drawFrame(context: CanvasRenderingContext2D, frameKey: string, x: number, y: number, width?: number, height?: number) {
        drawFrame(context, this.image, this.frames.get(frameKey) as number[], x, y, width, height)
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        context.fillStyle = '#68C0D0'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        this.drawFrame(context, 'throne-decoration', Math.floor(584 - camera.position.x), 74 - camera.position.y)
        this.drawFrame(context, 'platform', Math.floor(397 - camera.position.x), 90 - camera.position.y)
        this.drawFrame(context, 'throne', Math.floor(489 - camera.position.x), 13 - camera.position.y)
        this.drawFrame(context, 'floor', Math.floor(192 - camera.position.x), 159 - camera.position.y)
        this.drawFrame(context, 'monks', Math.floor(310 - camera.position.x), 138 - camera.position.y)
        this.drawFrame(context, 'guards', Math.floor(365 - camera.position.x), 113 - camera.position.y)
    }

    update(context: CanvasRenderingContext2D, time: FrameTime, camera: Camera) {}
}
