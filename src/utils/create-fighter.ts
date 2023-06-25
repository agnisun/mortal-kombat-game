import { LiuKang } from '@entities/fighters/liu-kang'
import { Raiden } from '@entities/fighters/raiden'
import { FighterId } from '@ts/enums/fighter'
import { PlayerId } from '@ts/types'

export function createFighter(fighterId: FighterId, playerId: PlayerId) {
    switch (fighterId) {
        case FighterId['LIU-KANG']:
            return new LiuKang(playerId)
        case FighterId.RAIDEN:
            return new Raiden(playerId)
    }
}
