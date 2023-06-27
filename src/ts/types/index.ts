import { BattleScene } from '@scenes/battle-scene'
import { MenuScene } from '@scenes/menu-scene'

export interface Position {
    x: number
    y: number
}

export enum PlayerId {
    FIRST = 0,
    SECOND = 1,
}

export type Scenes = MenuScene | BattleScene
