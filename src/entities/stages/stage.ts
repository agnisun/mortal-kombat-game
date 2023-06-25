import { Camera } from '@entities/camera/camera'
import { FrameTime } from '@ts/types/frame'
import { drawFrame } from '@utils/context'
import { BackgroundAnimation } from './shared/background-animation'

export class Stage {
    image: HTMLImageElement
    frames: Map<string, number[]>
    monks: BackgroundAnimation

    constructor() {
        const image = document.querySelector('img[alt="courtyard"]') as HTMLImageElement

        this.image = image
        this.frames = new Map([
            ['platform', [227, 952, 640, 104]],
            ['throne', [320, 588, 447, 126]],
            ['throne-decoration', [414, 357, 259, 83]],
            ['floor', [10, 1726, 1033, 98]],
            ['guards', [188, 1391, 693, 116]],
        ])
        this.monks = new BackgroundAnimation(
            this.image,
            [
                ['monks-1', [1344, 38, 625, 41]],
                ['monks-2', [1344, 174, 625, 40]],
                ['monks-3', [1344, 311, 625, 40]],
                ['monks-4', [1344, 446, 625, 41]],
                ['monks-5', [1344, 582, 625, 41]],
                ['monks-6', [1344, 718, 625, 41]],
            ],
            [
                ['monks-1', 144],
                ['monks-2', 144],
                ['monks-3', 144],
                ['monks-4', 144],
                ['monks-5', 144],
                ['monks-6', 144],
            ]
        )
    }

    update(_context: CanvasRenderingContext2D, time: FrameTime) {
        this.monks.update(time)
    }

    drawFrame(context: CanvasRenderingContext2D, frameKey: string, x: number, y: number, width?: number, height?: number) {
        drawFrame(context, this.image, this.frames.get(frameKey) as number[], x, y, width, height)
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        context.fillStyle = '#68C0D0'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        this.drawFrame(context, 'throne-decoration', Math.floor(584 - camera.position.x), 74 - camera.position.y)
        this.drawFrame(context, 'throne', Math.floor(489 - camera.position.x), 13 - camera.position.y)
        this.drawFrame(context, 'platform', Math.floor(397 - camera.position.x), 90 - camera.position.y)
        this.drawFrame(context, 'floor', Math.floor(192 - camera.position.x), 159 - camera.position.y)
        this.monks.draw(context, 310 - camera.position.x, 145 - camera.position.y)
        this.drawFrame(context, 'guards', Math.floor(365 - camera.position.x), 113 - camera.position.y)
    }
}
