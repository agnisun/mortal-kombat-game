import { Conrol, controls } from '@constants/control'
import { FighterDirection } from '@constants/figther'

const heldKeys = new Set<string>()

const mappedKeys = controls.map(({ keyboard }) => Object.values(keyboard)).flat()

function handleKeyDown(event: KeyboardEvent) {
    if (!mappedKeys.includes(event.code)) return

    event.preventDefault()
    heldKeys.add(event.code)
}
function handleKeyUp(event: KeyboardEvent) {
    if (!mappedKeys.includes(event.code)) return

    event.preventDefault()
    heldKeys.delete(event.code)
}

export function registerKeyboardEvents() {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
}

const isKeyDown = (code: string) => heldKeys.has(code)
export const isKeyUp = (code: string) => !heldKeys.has(code)

const isLeft = (id: number) => isKeyDown(controls[id].keyboard[Conrol.LEFT])
const isRight = (id: number) => isKeyDown(controls[id].keyboard[Conrol.RIGHT])
export const isUp = (id: number) => isKeyDown(controls[id].keyboard[Conrol.UP])
export const isDown = (id: number) => isKeyDown(controls[id].keyboard[Conrol.DOWN])

export const isForward = (id: number, direction: FighterDirection) => (direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id))
export const isBackward = (id: number, direction: FighterDirection) => (direction === FighterDirection.LEFT ? isRight(id) : isLeft(id))
export const isIdle = (id: number) => !(isLeft(id) || isRight(id) || isUp(id) || isDown(id))
