import { FighterDirection } from '@ts/enums/fighter-enums'
import { Position } from '@ts/types'
import { FighterPushBox } from '@ts/types/fighter-types'

export function rectsOverlap(x1: number, y1: number, wdith1: number, height1: number, x2: number, y2: number, wdith2: number, height2: number) {
    return x1 < x2 + wdith2 && x1 + wdith1 > x2 && y1 < y2 + height2 && y1 + height1 > y2
}

export function boxOverlap(box1: FighterPushBox, box2: FighterPushBox) {
    return rectsOverlap(box1.x, box1.y, box1.width, box1.height, box2.x, box2.y, box2.width, box2.height)
}

export function getActualBoxDimensions(position: Position, direction: FighterDirection, box: FighterPushBox): FighterPushBox {
    const x1 = position.x + box.x * direction
    const x2 = x1 + box.width * direction

    return {
        x: Math.min(x1, x2),
        y: position.y + box.y,
        width: box.width,
        height: box.height,
    }
}
