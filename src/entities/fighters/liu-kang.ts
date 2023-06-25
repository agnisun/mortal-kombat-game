import { PushBox } from '@constants/fighter'
import { Camera } from '@entities/camera/camera'
import { FighterAttackStrength, FighterId, FighterState } from '@ts/enums/fighter'
import { FrameDelay } from '@ts/enums/frame'
import { PlayerId } from '@ts/types'
import { Fighter } from './fighter'

export class LiuKang extends Fighter {
    constructor(playerId: PlayerId, onAttackHit: (opponentId: PlayerId, strength: FighterAttackStrength) => void) {
        super(playerId, onAttackHit)
        const image = document.querySelector('img[alt="liu-kang"]') as HTMLImageElement
        this.image = image
        this.name = FighterId['LIU-KANG']
        this.frames = new Map([
            [
                'forwards-1',
                [
                    [74, 148, 37, 101],
                    [14, 98],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'forwards-2',
                [
                    [120, 148, 34, 101],
                    [12, 98],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'forwards-3',
                [
                    [164, 150, 33, 99],
                    [11, 96],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'forwards-4',
                [
                    [206, 153, 35, 96],
                    [12, 93],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'forwards-5',
                [
                    [250, 151, 37, 98],
                    [14, 96],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'forwards-6',
                [
                    [296, 150, 34, 99],
                    [12, 96],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'forwards-7',
                [
                    [340, 149, 34, 100],
                    [12, 97],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'forwards-8',
                [
                    [385, 152, 39, 97],
                    [14, 94],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],

            [
                'idle-1',
                [
                    [92, 23, 47, 94],
                    [23, 91],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'idle-2',
                [
                    [149, 22, 47, 95],
                    [23, 92],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'idle-3',
                [
                    [206, 18, 47, 99],
                    [23, 96],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'idle-4',
                [
                    [263, 21, 47, 96],
                    [23, 93],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'idle-5',
                [
                    [321, 24, 47, 93],
                    [23, 90],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'idle-6',
                [
                    [378, 21, 47, 96],
                    [23, 93],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'idle-7',
                [
                    [435, 18, 47, 99],
                    [23, 96],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'idle-8',
                [
                    [492, 22, 47, 95],
                    [23, 92],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],

            [
                'idle-turn-1',
                [
                    [569, 20, 51, 97],
                    [26, 94],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'idle-turn-2',
                [
                    [630, 20, 50, 97],
                    [25, 94],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],
            [
                'idle-turn-3',
                [
                    [691, 20, 51, 97],
                    [26, 94],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],

            [
                'jump-start-1',
                [
                    [647, 156, 47, 93],
                    [23, 90],
                    PushBox.IDLE,
                    [
                        [-7, -95, 16, 20],
                        [-12, -75, 25, 37],
                        [-20, -37, 40, 38],
                    ],
                ],
            ],

            [
                'jump-up-1',
                [
                    [471, 174, 48, 75],
                    [24, 71],
                    PushBox.JUMP_UP,
                    [
                        [-7, -74, 16, 20],
                        [-12, -54, 25, 25],
                        [-20, -29, 40, 30],
                    ],
                ],
            ],

            [
                'jump-land-1',
                [
                    [587, 161, 49, 88],
                    [25, 86],
                    PushBox.IDLE,
                    [
                        [-7, -87, 16, 20],
                        [-12, -67, 25, 35],
                        [-20, -32, 40, 30],
                    ],
                ],
            ],
            [
                'jump-land-2',
                [
                    [647, 156, 47, 93],
                    [23, 90],
                    PushBox.IDLE,
                    [
                        [-7, -92, 16, 20],
                        [-12, -72, 25, 35],
                        [-20, -37, 40, 35],
                    ],
                ],
            ],

            [
                'jump-roll-land-1',
                [
                    [732, 176, 35, 73],
                    [17, 70],
                    PushBox.JUMP_UP,
                    [
                        [0, -69, 16, 20],
                        [-12, -55, 25, 35],
                        [-15, -37, 30, 35],
                    ],
                ],
            ],

            [
                'jump-forwards-1',
                [
                    [777, 198, 29, 51],
                    [14, 48],
                    PushBox.JUMP,
                    [
                        [0, -50, 16, 20],
                        [-12, -45, 25, 30],
                        [0, -25, 10, 30],
                    ],
                ],
            ],
            [
                'jump-forwards-2',
                [
                    [816, 202, 38, 47],
                    [19, 44],
                    PushBox.JUMP,
                    [
                        [3, -44, 16, 20],
                        [-12, -45, 25, 30],
                        [-15, -25, 10, 30],
                    ],
                ],
            ],
            [
                'jump-forwards-3',
                [
                    [865, 216, 45, 33],
                    [22, 30],
                    PushBox.JUMP,
                    [
                        [5, -15, 16, 20],
                        [-12, -30, 25, 30],
                        [-15, -25, 10, 30],
                    ],
                ],
            ],
            [
                'jump-forwards-4',
                [
                    [920, 206, 40, 43],
                    [20, 40],
                    PushBox.JUMP,
                    [
                        [-5, -15, 16, 20],
                        [-5, -40, 25, 30],
                        [-15, -35, 10, 30],
                    ],
                ],
            ],
            [
                'jump-forwards-5',
                [
                    [972, 198, 30, 51],
                    [15, 48],
                    PushBox.JUMP,
                    [
                        [-15, -15, 16, 20],
                        [-5, -40, 25, 30],
                        [-15, -35, 10, 30],
                    ],
                ],
            ],
            [
                'jump-forwards-6',
                [
                    [1013, 202, 37, 47],
                    [18, 44],
                    PushBox.JUMP,
                    [
                        [-15, -15, 16, 20],
                        [-15, -30, 30, 30],
                        [5, -45, 10, 30],
                    ],
                ],
            ],
            [
                'jump-forwards-7',
                [
                    [1059, 216, 45, 33],
                    [22, 30],
                    PushBox.JUMP,
                    [
                        [-20, -30, 16, 20],
                        [-15, -20, 30, 20],
                        [-10, -25, 30, 10],
                    ],
                ],
            ],
            [
                'jump-forwards-8',
                [
                    [1115, 204, 41, 45],
                    [20, 42],
                    PushBox.JUMP,
                    [
                        [-15, -41, 16, 20],
                        [-20, -25, 30, 20],
                        [0, -25, 10, 30],
                    ],
                ],
            ],

            [
                'crouch-1',
                [
                    [988, 27, 47, 90],
                    [23, 87],
                    PushBox.IDLE,
                    [
                        [-7, -87, 16, 20],
                        [-12, -67, 25, 35],
                        [-20, -32, 40, 30],
                    ],
                ],
            ],
            [
                'crouch-2',
                [
                    [1045, 49, 49, 68],
                    [23, 65],
                    PushBox.IDLE,
                    [
                        [-3, -64, 16, 20],
                        [-12, -50, 25, 25],
                        [-20, -25, 40, 25],
                    ],
                ],
            ],
            [
                'crouch-3',
                [
                    [1104, 60, 48, 59],
                    [24, 56],
                    PushBox.CROUCH,
                    [
                        [-3, -55, 16, 20],
                        [-12, -50, 25, 25],
                        [-20, -25, 40, 25],
                    ],
                ],
            ],

            [
                'light-punch-1',
                [
                    [18, 390, 47, 102],
                    [23, 99],
                    PushBox.PUNCH,
                    [
                        [2, -101, 19, 18],
                        [-15, -84, 40, 45],
                        [-15, -38, 40, 40],
                    ],
                ],
            ],
            [
                'light-punch-2',
                [
                    [75, 388, 53, 104],
                    [23, 101],
                    PushBox.PUNCH,
                    [
                        [5, -101, 19, 18],
                        [-5, -84, 30, 45],
                        [-15, -38, 40, 40],
                    ],
                ],
            ],
            [
                'light-punch-3',
                [
                    [140, 393, 74, 99],
                    [23, 96],
                    PushBox.PUNCH,
                    [
                        [13, -101, 19, 18],
                        [0, -84, 30, 45],
                        [-15, -38, 40, 40],
                    ],
                    [25, -84, 28, 13],
                ],
            ],

            [
                'light-kick-1',
                [
                    [340, 504, 44, 100],
                    [23, 97],
                    PushBox.IDLE,
                    [
                        [-10, -96, 19, 18],
                        [-10, -85, 23, 45],
                        [-15, -40, 30, 40],
                    ],
                ],
            ],
            [
                'light-kick-2',
                [
                    [395, 503, 39, 101],
                    [23, 98],
                    PushBox.IDLE,
                    [
                        [-20, -96, 19, 18],
                        [-20, -85, 23, 45],
                        [-20, -40, 30, 40],
                    ],
                ],
            ],
            [
                'light-kick-3',
                [
                    [444, 504, 37, 100],
                    [23, 97],
                    PushBox.IDLE,
                    [
                        [-20, -96, 19, 18],
                        [-15, -85, 23, 45],
                        [-10, -40, 30, 40],
                    ],
                ],
            ],
            [
                'light-kick-4',
                [
                    [492, 507, 45, 97],
                    [23, 94],
                    PushBox.IDLE,
                    [
                        [-20, -96, 19, 18],
                        [-15, -85, 23, 45],
                        [-10, -40, 15, 40],
                    ],
                ],
            ],
            [
                'light-kick-5',
                [
                    [545, 506, 69, 98],
                    [23, 95],
                    PushBox.IDLE,
                    [
                        [-20, -96, 19, 18],
                        [-15, -85, 23, 45],
                        [-10, -40, 15, 40],
                    ],
                    [20, -84, 28, 13],
                ],
            ],

            [
                'medium-kick-1',
                [
                    [19, 615, 61, 99],
                    [23, 96],
                    PushBox.IDLE,
                    [
                        [0, -95, 16, 20],
                        [0, -75, 20, 37],
                        [0, -37, 30, 38],
                    ],
                ],
            ],
            [
                'medium-kick-2',
                [
                    [91, 617, 49, 97],
                    [23, 94],
                    PushBox.IDLE,
                    [
                        [0, -95, 16, 20],
                        [0, -75, 20, 37],
                        [0, -37, 30, 38],
                    ],
                ],
            ],
            [
                'medium-kick-3',
                [
                    [149, 625, 37, 90],
                    [23, 87],
                    PushBox.IDLE,
                    [
                        [-25, -86, 16, 10],
                        [-20, -75, 30, 37],
                        [-10, -37, 15, 38],
                    ],
                ],
            ],
            ['medium-kick-4', [[196, 615, 57, 99], [23, 96], PushBox.IDLE, [[], [-20, -75, 30, 37], [-10, -37, 15, 38]], [10, -99, 28, 13]]],
            [
                'medium-kick-5',
                [
                    [262, 637, 35, 78],
                    [23, 75],
                    PushBox.JUMP_UP,
                    [
                        [0, -75, 16, 10],
                        [-20, -75, 30, 37],
                        [-10, -37, 20, 38],
                    ],
                ],
            ],
            [
                'medium-kick-6',
                [
                    [308, 619, 44, 96],
                    [23, 93],
                    PushBox.IDLE,
                    [
                        [0, -92, 16, 16],
                        [-10, -75, 25, 40],
                        [-10, -37, 30, 38],
                    ],
                ],
            ],
            [
                'medium-kick-7',
                [
                    [363, 614, 44, 101],
                    [23, 98],
                    PushBox.IDLE,
                    [
                        [-10, -97, 16, 16],
                        [-10, -81, 25, 45],
                        [-10, -37, 30, 38],
                    ],
                ],
            ],
        ])

        this.animations[FighterState.IDLE] = [
            ['idle-1', 6],
            ['idle-2', 6],
            ['idle-3', 6],
            ['idle-4', 6],
            ['idle-5', 6],
            ['idle-6', 6],
            ['idle-7', 6],
            ['idle-8', 6],
        ]

        this.animations[FighterState.IDLE_TURN] = [
            ['idle-turn-3', 4],
            ['idle-turn-2', 4],
            ['idle-turn-1', 4],
            ['idle-turn-1', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.WALK_FORWARDS] = [
            ['forwards-1', 4],
            ['forwards-2', 4],
            ['forwards-3', 4],
            ['forwards-4', 4],
            ['forwards-5', 4],
            ['forwards-6', 4],
            ['forwards-7', 4],
            ['forwards-8', 4],
        ]

        this.animations[FighterState.WALK_BACKWARDS] = [
            ['forwards-8', 4],
            ['forwards-7', 4],
            ['forwards-6', 4],
            ['forwards-5', 4],
            ['forwards-4', 4],
            ['forwards-3', 4],
            ['forwards-2', 4],
            ['forwards-1', 4],
        ]

        this.animations[FighterState.JUMP_START] = [
            ['jump-start-1', 5],
            ['jump-start-1', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.JUMP_UP] = [
            ['jump-up-1', 5],
            ['jump-up-1', FrameDelay.FREEZE],
        ]
        this.animations[FighterState.JUMP_LAND] = [
            ['jump-land-1', 5],
            ['jump-land-2', 5],
            ['jump-land-2', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.JUMP_ROLL_LAND] = [
            ['jump-roll-land-1', 5],
            ['jump-roll-land-1', FrameDelay.TRANSITION],
        ]

        this.animations[FighterState.JUMP_FORWARDS] = [
            ['jump-forwards-1', 4],
            ['jump-forwards-2', 4],
            ['jump-forwards-3', 4],
            ['jump-forwards-4', 4],
            ['jump-forwards-5', 4],
            ['jump-forwards-6', 4],
            ['jump-forwards-7', 4],
            ['jump-forwards-8', 4],
        ]

        this.animations[FighterState.JUMP_BACKWARDS] = [
            ['jump-forwards-8', 4],
            ['jump-forwards-7', 4],
            ['jump-forwards-6', 4],
            ['jump-forwards-5', 4],
            ['jump-forwards-4', 4],
            ['jump-forwards-3', 4],
            ['jump-forwards-2', 4],
            ['jump-forwards-1', 4],
        ]

        this.animations[FighterState.CROUCH] = [['crouch-3', FrameDelay.FREEZE]]

        this.animations[FighterState.CROUCH_DOWN] = [
            ['crouch-1', 2],
            ['crouch-2', 2],
            ['crouch-3', 2],
            ['crouch-3', FrameDelay.TRANSITION],
        ]

        this.animations[FighterState.CROUCH_UP] = [
            ['crouch-3', 2],
            ['crouch-2', 2],
            ['crouch-1', 2],
            ['crouch-1', FrameDelay.TRANSITION],
        ]

        this.animations[FighterState.CROUCH_TURN] = [['crouch-3', FrameDelay.FREEZE]]

        this.animations[FighterState.LIGHT_PUNCH] = [
            ['light-punch-1', 5],
            ['light-punch-2', 7],
            ['light-punch-3', 9],
            ['light-punch-2', 6],
            ['light-punch-2', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.LIGHT_KICK] = [
            ['light-kick-1', 4],
            ['light-kick-2', 4],
            ['light-kick-3', 7],
            ['light-kick-4', 7],
            ['light-kick-5', 7],
            ['light-kick-4', 5],
            ['light-kick-3', 4],
            ['light-kick-2', 4],
            ['light-kick-2', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.MEDIUM_KICK] = [
            ['medium-kick-1', 5],
            ['medium-kick-2', 5],
            ['medium-kick-3', 7],
            ['medium-kick-4', 7],
            ['medium-kick-5', 7],
            ['medium-kick-6', 7],
            ['medium-kick-7', 7],
            ['medium-kick-7', FrameDelay.TRANSITION],
        ]
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        super.draw(context, camera)
    }
}
