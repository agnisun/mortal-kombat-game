import { Position } from './index'

export interface AnimationItem {
    position: Position
    animationFrame: number
    animationTimer: number
    animationDelay: number
    animation: number[]
}
