import '@assets/styles/style.css'
import { MortalKombatGame } from './mortal-kombat-game'

window.addEventListener('load', function () {
    window.addEventListener(
        'click',
        function () {
            new MortalKombatGame().start()
        },
        { once: true }
    )
})
