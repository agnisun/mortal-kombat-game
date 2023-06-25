import '@assets/styles/style.css'
import { MortalKombatGame } from './mortal-kombat-game'

window.addEventListener('load', () => {
    new MortalKombatGame().start()
})
