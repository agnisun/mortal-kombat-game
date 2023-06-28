import { PushBox } from '@constants/fighter'
import { Camera } from '@entities/camera/camera'
import { FighterAttackStrength, FighterId, FighterState } from '@ts/enums/fighter'
import { FrameDelay } from '@ts/enums/frame'
import { PlayerId } from '@ts/types'
import { Fighter } from './fighter'

export class Raiden extends Fighter {
    constructor(playerId: PlayerId, onAttackHit: (playerId: PlayerId, opponentId: PlayerId, strength: FighterAttackStrength) => void) {
        super(playerId, onAttackHit)
        const image = document.querySelector('img[alt="raiden"]') as HTMLImageElement
        this.image = image
        this.name = FighterId.RAIDEN
        this.frames = new Map([
            [
                'forwards-1',
                [
                    [782, 141, 46, 101],
                    [23, 98],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'forwards-2',
                [
                    [838, 144, 40, 102],
                    [20, 99],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'forwards-3',
                [
                    [888, 143, 40, 103],
                    [20, 100],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'forwards-4',
                [
                    [940, 144, 40, 102],
                    [20, 99],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'forwards-5',
                [
                    [993, 145, 40, 101],
                    [20, 98],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'forwards-6',
                [
                    [1043, 143, 46, 103],
                    [23, 100],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'forwards-7',
                [
                    [1100, 142, 40, 104],
                    [20, 101],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'forwards-8',
                [
                    [1150, 142, 40, 104],
                    [20, 101],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'forwards-9',
                [
                    [1201, 145, 40, 101],
                    [20, 98],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],

            [
                'idle-1',
                [
                    [103, 21, 46, 102],
                    [23, 99],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'idle-2',
                [
                    [162, 21, 46, 102],
                    [23, 99],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'idle-3',
                [
                    [221, 21, 46, 102],
                    [23, 99],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'idle-4',
                [
                    [279, 21, 46, 102],
                    [23, 99],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'idle-5',
                [
                    [338, 21, 46, 102],
                    [23, 99],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'idle-6',
                [
                    [456, 21, 46, 102],
                    [23, 99],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'idle-7',
                [
                    [577, 21, 46, 102],
                    [23, 99],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'idle-8',
                [
                    [635, 21, 46, 102],
                    [23, 99],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],

            [
                'idle-turn-1',
                [
                    [20, 143, 47, 103],
                    [24, 100],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'idle-turn-2',
                [
                    [78, 142, 47, 104],
                    [24, 101],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],
            [
                'idle-turn-3',
                [
                    [136, 143, 47, 103],
                    [24, 100],
                    PushBox.IDLE,
                    [
                        [-13, -95, 19, 18],
                        [-21, -77, 40, 38],
                        [-21, -38, 40, 40],
                    ],
                ],
            ],

            [
                'jump-start-1',
                [
                    [1405, 157, 51, 89],
                    [25, 86],
                    PushBox.IDLE,
                    [
                        [-9, -88, 19, 18],
                        [-20, -70, 40, 39],
                        [-20, -30, 40, 30],
                    ],
                ],
            ],

            [
                'jump-up-1',
                [
                    [1290, 162, 44, 84],
                    [22, 81],
                    PushBox.JUMP_UP,
                    [
                        [-9, -83, 19, 18],
                        [-21, -64, 40, 39],
                        [-21, -25, 40, 25],
                    ],
                ],
            ],

            [
                'jump-land-1',
                [
                    [1405, 157, 51, 89],
                    [25, 86],
                    PushBox.IDLE,
                    [
                        [-9, -85, 19, 18],
                        [-21, -67, 40, 39],
                        [-21, -28, 40, 30],
                    ],
                ],
            ],

            [
                'jump-roll-land-1',
                [
                    [1501, 155, 42, 91],
                    [21, 88],
                    PushBox.IDLE,
                    [
                        [-8, -90, 19, 18],
                        [-21, -72, 40, 30],
                        [-21, -41, 40, 40],
                    ],
                ],
            ],

            [
                'jump-forwards-1',
                [
                    [1552, 191, 36, 55],
                    [13, 52],
                    PushBox.JUMP,
                    [
                        [9, -54, 19, 18],
                        [-10, -50, 21, 35],
                        [5, -35, 14, 32],
                    ],
                ],
            ],
            [
                'jump-forwards-2',
                [
                    [1598, 196, 43, 50],
                    [21, 47],
                    PushBox.JUMP,
                    [
                        [5, -40, 19, 18],
                        [-19, -50, 35, 35],
                        [-8, -35, 14, 32],
                    ],
                ],
            ],
            [
                'jump-forwards-3',
                [
                    [1650, 204, 48, 42],
                    [24, 39],
                    PushBox.JUMP,
                    [
                        [9, -15, 19, 18],
                        [-10, -40, 21, 35],
                        [-20, -35, 14, 32],
                    ],
                ],
            ],
            [
                'jump-forwards-4',
                [
                    [1710, 195, 44, 51],
                    [22, 48],
                    PushBox.JUMP,
                    [
                        [-5, -15, 19, 18],
                        [0, -50, 21, 35],
                        [-10, -45, 14, 32],
                    ],
                ],
            ],
            [
                'jump-forwards-5',
                [
                    [1765, 192, 36, 54],
                    [13, 51],
                    PushBox.JUMP,
                    [
                        [-15, -15, 19, 18],
                        [-10, -50, 21, 35],
                        [5, -35, 14, 32],
                    ],
                ],
            ],
            [
                'jump-forwards-6',
                [
                    [1812, 196, 42, 50],
                    [21, 47],
                    PushBox.JUMP,
                    [
                        [-25, -25, 19, 18],
                        [-10, -30, 25, 35],
                        [-10, -35, 14, 32],
                    ],
                ],
            ],
            [
                'jump-forwards-7',
                [
                    [1866, 204, 47, 42],
                    [23, 39],
                    PushBox.JUMP,
                    [
                        [-25, -40, 19, 18],
                        [-20, -40, 21, 35],
                        [2, -35, 14, 32],
                    ],
                ],
            ],

            [
                'crouch-1',
                [
                    [441, 157, 45, 89],
                    [22, 86],
                    PushBox.IDLE,
                    [
                        [-10, -88, 20, 16],
                        [-20, -72, 41, 41],
                        [-20, -31, 40, 32],
                    ],
                ],
            ],
            [
                'crouch-2',
                [
                    [500, 157, 47, 89],
                    [23, 86],
                    PushBox.JUMP_UP,
                    [
                        [-10, -73, 20, 16],
                        [-16, -56, 32, 30],
                        [-21, -25, 42, 25],
                    ],
                ],
            ],
            [
                'crouch-3',
                [
                    [557, 187, 48, 59],
                    [24, 56],
                    PushBox.CROUCH,
                    [
                        [-10, -58, 20, 16],
                        [-16, -41, 32, 16],
                        [-21, -25, 40, 25],
                    ],
                ],
            ],

            [
                'light-punch-1',
                [
                    [20, 394, 49, 103],
                    [23, 100],
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
                    [79, 396, 50, 101],
                    [23, 99],
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
                    [139, 398, 76, 99],
                    [23, 96],
                    PushBox.PUNCH,
                    [
                        [13, -101, 19, 18],
                        [0, -84, 30, 45],
                        [-15, -38, 40, 40],
                    ],
                    [25, -96, 28, 13],
                ],
            ],

            [
                'light-kick-1',
                [
                    [311, 512, 50, 104],
                    [23, 101],
                    PushBox.IDLE,
                    [
                        [-5, -103, 19, 18],
                        [-15, -85, 40, 45],
                        [-15, -40, 40, 40],
                    ],
                ],
            ],
            [
                'light-kick-2',
                [
                    [372, 509, 40, 107],
                    [23, 104],
                    PushBox.IDLE,
                    [
                        [-20, -106, 19, 18],
                        [-20, -87, 30, 45],
                        [-15, -41, 30, 40],
                    ],
                ],
            ],
            [
                'light-kick-3',
                [
                    [422, 527, 59, 89],
                    [23, 86],
                    PushBox.IDLE,
                    [
                        [-25, -88, 19, 18],
                        [-15, -85, 30, 45],
                        [-15, -41, 30, 40],
                    ],
                ],
            ],
            [
                'light-kick-4',
                [
                    [494, 526, 80, 90],
                    [23, 87],
                    PushBox.IDLE,
                    [
                        [-25, -88, 19, 18],
                        [-15, -85, 30, 45],
                        [-15, -41, 30, 40],
                    ],
                    [23, -84, 35, 13],
                ],
            ],

            [
                'medium-kick-1',
                [
                    [609, 513, 40, 102],
                    [23, 99],
                    PushBox.IDLE,
                    [
                        [-22, -99, 20, 16],
                        [-25, -83, 41, 41],
                        [-20, -42, 40, 43],
                    ],
                ],
            ],
            [
                'medium-kick-2',
                [
                    [660, 514, 49, 102],
                    [23, 99],
                    PushBox.IDLE,
                    [
                        [-22, -99, 20, 16],
                        [-25, -83, 41, 41],
                        [-20, -42, 40, 43],
                    ],
                ],
            ],
            [
                'medium-kick-3',
                [
                    [740, 535, 45, 81],
                    [23, 78],
                    PushBox.JUMP_UP,
                    [
                        [-22, -77, 20, 16],
                        [-20, -77, 41, 40],
                        [-20, -37, 40, 33],
                    ],
                ],
            ],
            [
                'medium-kick-4',
                [
                    [796, 535, 51, 81],
                    [23, 78],
                    PushBox.JUMP_UP,
                    [
                        [-22, -77, 10, 16],
                        [-20, -77, 41, 40],
                        [-20, -37, 40, 33],
                    ],
                ],
            ],
            [
                'medium-kick-5',
                [
                    [857, 511, 69, 105],
                    [23, 102],
                    PushBox.IDLE,
                    [
                        [-22, -70, 10, 16],
                        [-20, -77, 41, 40],
                        [-20, -37, 40, 33],
                    ],
                    [23, -102, 28, 13],
                ],
            ],
            [
                'medium-kick-6',
                [
                    [937, 536, 51, 80],
                    [23, 77],
                    PushBox.JUMP_UP,
                    [
                        [-22, -77, 20, 16],
                        [-20, -77, 41, 40],
                        [-20, -37, 40, 33],
                    ],
                ],
            ],
            [
                'medium-kick-7',
                [
                    [998, 523, 37, 93],
                    [23, 90],
                    PushBox.IDLE,
                    [
                        [-22, -94, 20, 16],
                        [-20, -77, 41, 40],
                        [-20, -37, 40, 33],
                    ],
                ],
            ],
            [
                'medium-kick-8',
                [
                    [1046, 509, 46, 107],
                    [23, 104],
                    PushBox.IDLE,
                    [
                        [-10, -106, 20, 16],
                        [-20, -90, 41, 50],
                        [-20, -40, 40, 36],
                    ],
                ],
            ],

            [
                'hurt-head-light-1',
                [
                    [79, 761, 51, 99],
                    [25, 96],
                    PushBox.IDLE,
                    [
                        [-23, -96, 17, 19],
                        [-23, -77, 34, 40],
                        [-20, -37, 40, 40],
                    ],
                ],
            ],
            [
                'hurt-head-light-2',
                [
                    [142, 765, 54, 95],
                    [27, 92],
                    PushBox.IDLE,
                    [
                        [-30, -96, 17, 19],
                        [-23, -77, 34, 40],
                        [-20, -37, 40, 40],
                    ],
                ],
            ],
            [
                'hurt-head-light-3',
                [
                    [208, 766, 59, 94],
                    [29, 91],
                    PushBox.IDLE,
                    [
                        [-30, -96, 17, 19],
                        [-23, -77, 34, 40],
                        [-20, -37, 40, 40],
                    ],
                ],
            ],
            [
                'hurt-body-light-1',
                [
                    [312, 762, 48, 98],
                    [24, 95],
                    PushBox.IDLE,
                    [
                        [-20, -92, 17, 10],
                        [-15, -82, 26, 52],
                        [-20, -30, 40, 30],
                    ],
                ],
            ],
            [
                'hurt-body-light-2',
                [
                    [371, 763, 51, 97],
                    [25, 94],
                    PushBox.IDLE,
                    [
                        [-25, -92, 17, 15],
                        [-25, -76, 30, 43],
                        [-20, -33, 40, 30],
                    ],
                ],
            ],
            [
                'hurt-body-light-3',
                [
                    [432, 767, 56, 93],
                    [28, 90],
                    PushBox.IDLE,
                    [
                        [-25, -92, 17, 15],
                        [-25, -76, 30, 43],
                        [-20, -33, 40, 30],
                    ],
                ],
            ],
            ['win-1', [[20, 284, 48, 97], [24, 94], PushBox.IDLE, []]],
            ['win-2', [[80, 287, 49, 94], [24, 91], PushBox.IDLE, []]],
            ['win-3', [[139, 286, 70, 95], [35, 92], PushBox.IDLE, []]],
            ['win-4', [[220, 282, 82, 99], [41, 96], PushBox.IDLE, []]],
            ['win-5', [[313, 259, 48, 122], [24, 119], PushBox.IDLE, []]],

            ['lose-1', [[20, 885, 63, 91], [31, 88], PushBox.IDLE, []]],
            ['lose-2', [[93, 911, 72, 65], [36, 62], PushBox.IDLE, []]],
            ['lose-3', [[176, 928, 72, 48], [36, 45], PushBox.IDLE, []]],
            ['lose-4', [[259, 914, 70, 62], [35, 59], PushBox.IDLE, []]],
            ['lose-5', [[340, 920, 78, 56], [44, 53], PushBox.IDLE, []]],
            ['lose-6', [[429, 950, 85, 26], [42, 23], PushBox.IDLE, []]],
        ])

        this.animations[FighterState.IDLE] = [
            ['idle-1', 7],
            ['idle-2', 7],
            ['idle-3', 7],
            ['idle-4', 7],
            ['idle-5', 7],
            ['idle-6', 7],
            ['idle-7', 7],
            ['idle-8', 7],
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
            ['forwards-9', 4],
        ]

        this.animations[FighterState.WALK_BACKWARDS] = [
            ['forwards-9', 4],
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
            ['jump-land-1', FrameDelay.TRANSITION],
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
        ]

        this.animations[FighterState.JUMP_BACKWARDS] = [
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
            ['light-kick-1', 5],
            ['light-kick-2', 7],
            ['light-kick-3', 7],
            ['light-kick-4', 7],
            ['light-kick-3', 7],
            ['light-kick-2', 7],
            ['light-kick-2', FrameDelay.TRANSITION],
        ]

        this.animations[FighterState.MEDIUM_KICK] = [
            ['medium-kick-1', 5],
            ['medium-kick-2', 5],
            ['medium-kick-3', 5],
            ['medium-kick-4', 7],
            ['medium-kick-5', 7],
            ['medium-kick-6', 7],
            ['medium-kick-7', 5],
            ['medium-kick-8', 5],
            ['medium-kick-8', FrameDelay.TRANSITION],
        ]

        this.animations[FighterState.HURT_HEAD_LIGHT] = [
            ['hurt-head-light-1', 4],
            ['hurt-head-light-2', 4],
            ['hurt-head-light-3', 4],
            ['hurt-head-light-3', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.HURT_BODY_LIGHT] = [
            ['hurt-body-light-1', 4],
            ['hurt-body-light-2', 4],
            ['hurt-body-light-3', 4],
            ['hurt-body-light-3', FrameDelay.TRANSITION],
        ]
        this.animations[FighterState.WIN] = [
            ['win-1', 6],
            ['win-2', 6],
            ['win-3', 6],
            ['win-4', 6],
            ['win-5', 6],
            ['win-5', FrameDelay.TRANSITION],
        ]

        this.animations[FighterState.LOSE] = [
            ['lose-1', 6],
            ['lose-2', 6],
            ['lose-3', 6],
            ['lose-4', 6],
            ['lose-5', 6],
            ['lose-6', 6],
            ['lose-6', FrameDelay.TRANSITION],
        ]
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        super.draw(context, camera)
    }
}
