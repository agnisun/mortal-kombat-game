import { FighterDirection } from '@ts/enums/fighter-enums'

export function getContext() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const context = canvas.getContext('2d') as CanvasRenderingContext2D

    context.imageSmoothingEnabled = false

    return context
}

export function drawFrame(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    dimensions: number[],
    x: number,
    y: number,
    direction: FighterDirection = 1,
    width?: number,
    height?: number
) {
    const [sourceX, sourceY, sourceWidth, sourceHeight] = dimensions

    context.scale(direction, 1)
    context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x * direction, y, width ?? sourceWidth, height ?? sourceHeight)
    context.setTransform(1, 0, 0, 1, 0, 0)
}
