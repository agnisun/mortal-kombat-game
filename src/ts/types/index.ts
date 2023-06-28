import { BattleScene } from '@scenes/battle-scene'
import { MenuScene } from '@scenes/menu-scene'

export interface Position {
    x: number
    y: number
}

export type Scenes = MenuScene | BattleScene
