import { MortalKombatGame } from './mortal-kombat-game'

window.addEventListener('load', function () {
    this.window.addEventListener(
        'click',
        function () {
            new MortalKombatGame().start()
        },
        { once: true }
    )
})
