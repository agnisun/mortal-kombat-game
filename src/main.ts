import '@assets/styles/style.css'
import { registerKeyboardEvents } from './handlers/input-register'
import { MortalKombatGame } from './mortal-kombat-game'

window.addEventListener('load', () => {
    registerKeyboardEvents()

    new MortalKombatGame().start()
})
