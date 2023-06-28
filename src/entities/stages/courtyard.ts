import { Camera } from '@entities/camera/camera'
import { FrameTime } from '@ts/types/frame'
import { drawFrame } from '@utils/context'
import { BackgroundAnimation } from './shared/background-animation'

export class CourtyardStage {
    image = document.querySelector('img[alt="courtyard"]') as HTMLImageElement
    frames: Map<string, number[]> = new Map([
        ['platform', [227, 952, 640, 104]],
        ['throne', [320, 588, 447, 126]],
        ['throne-decoration', [414, 357, 259, 83]],
        ['floor', [10, 1726, 1033, 98]],
        ['guards', [188, 1391, 693, 116]],
    ])
    monks: BackgroundAnimation = new BackgroundAnimation(
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
            ['monks-1', 9],
            ['monks-2', 9],
            ['monks-3', 9],
            ['monks-4', 9],
            ['monks-5', 9],
            ['monks-6', 9],
        ]
    )
    music = document.querySelector('audio#theme-courtyard') as HTMLAudioElement

    constructor() {
        this.playMusic()
    }

    playMusic() {
        this.music.volume = 0.2
        this.music.currentTime = 0
        this.music.play()
    }

    update(time: FrameTime) {
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
        this.monks.draw(context, 405 - camera.position.x, 145 - camera.position.y)
        this.drawFrame(context, 'guards', Math.floor(365 - camera.position.x), 113 - camera.position.y)
    }
}
