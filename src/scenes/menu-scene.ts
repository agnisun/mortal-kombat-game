import { GameOverMenu } from '@entities/menus/game-over-menu'
import { HeroesMenu } from '@entities/menus/heroes-menu'
import { MainMenu } from '@entities/menus/main-menu'
import { gameState } from '@states/game-state'
import { MenusId } from '@ts/enums'
import { FrameTime } from '@ts/types/frame'

export class MenuScene {
    menus = {
        [MenusId.MAIN]: new MainMenu(),
        [MenusId.HEROES]: new HeroesMenu(),
        [MenusId.GAMEOVER]: new GameOverMenu(),
    }
    music!: HTMLAudioElement
    musicStart = false
    menuMusic: Map<MenusId, HTMLAudioElement> = new Map([
        [MenusId.MAIN, document.querySelector('audio#main-theme') as HTMLAudioElement],
        [MenusId.HEROES, document.querySelector('audio#main-theme') as HTMLAudioElement],
        [MenusId.GAMEOVER, document.querySelector('audio#theme-gameover') as HTMLAudioElement],
    ])
    musicId!: MenusId

    playMusic() {
        this.music = this.menuMusic.get(gameState.currentMenu) as HTMLAudioElement
        this.musicId = gameState.currentMenu
        this.music.volume = 0.2
        this.music.currentTime = 0
        this.music.play()
        this.musicStart = true
    }

    resetMusic() {
        this.music.currentTime = 0
        this.musicStart = false
        this.music.pause()
    }

    update(_context: CanvasRenderingContext2D, time: FrameTime) {
        if (this.music && this.menuMusic.get(this.musicId) !== this.menuMusic.get(gameState.currentMenu)) {
            this.resetMusic()
        }

        if (!this.musicStart) {
            this.playMusic()
        }

        this.menus[gameState.currentMenu].update(time)
    }
    draw(context: CanvasRenderingContext2D) {
        this.menus[gameState.currentMenu].draw(context)
    }
}
