import { Control } from '@ts/enums/control'
import { ControlHandler } from '@ts/types/control'

export const controls: ControlHandler[] = [
    {
        keyboard: {
            [Control.LEFT]: 'KeyA',
            [Control.RIGHT]: 'KeyD',
            [Control.UP]: 'KeyW',
            [Control.DOWN]: 'KeyS',
            [Control.LIGHT_KICK]: 'KeyG',
            [Control.MEDIUM_KICK]: 'KeyJ',
            [Control.LIGHT_PUNCH]: 'KeyT',
        },
    },
    {
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
            [Control.LIGHT_PUNCH]: 'Numpad7',
            [Control.LIGHT_KICK]: 'Numpad4',
            [Control.MEDIUM_KICK]: 'Numpad6',
        },
    },
]
