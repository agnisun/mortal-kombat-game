import '@assets/styles/style.css'
import { registerKeyboardEvents } from './input-register'
import { MortalKombatGame } from './mortal-kombat-game'

/**
 * TODO:
 * Добавить в статус бар победы вы раундах
 * Добавить хит боксы и анимации атаки
 * Отображение в статус баре здоровье бойцов
 * Анимация победы
 * 
 */

window.addEventListener('load', () => {
    registerKeyboardEvents()

    new MortalKombatGame().start()
})
