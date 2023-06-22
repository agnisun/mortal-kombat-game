export function rectsOverlap(x1: number, y1: number, wdith1: number, height1: number, x2: number, y2: number, wdith2: number, height2: number) {
    return x1 < x2 + wdith2 && x1 + wdith1 > x2 && y1 < y2 + height2 && y1 + height1 > y2
}
