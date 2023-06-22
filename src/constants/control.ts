export enum Conrol {
    LEFT = 'left',
    RIGHT = 'right',
    UP = 'up',
    DOWN = 'down',
}

export const controls = [
    {
        keyboard: {
            [Conrol.LEFT]: 'KeyA',
            [Conrol.RIGHT]: 'KeyD',
            [Conrol.UP]: 'KeyW',
            [Conrol.DOWN]: 'KeyS',
        },
    },
    {
        keyboard: {
            [Conrol.LEFT]: 'ArrowLeft',
            [Conrol.RIGHT]: 'ArrowRight',
            [Conrol.UP]: 'ArrowUp',
            [Conrol.DOWN]: 'ArrowDown',
        },
    },
]
