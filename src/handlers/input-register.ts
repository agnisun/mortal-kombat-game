import { controls } from '@constants/control-constants'
import { Control } from '@ts/enums/control-enums'
import { FighterDirection } from '@ts/enums/fighter-enums'

const heldKeys = new Set<string>()
const pressedKeys = new Set<string>()

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
    pressedKeys.delete(event.code)
}

export function registerKeyboardEvents() {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
}

const isKeyDown = (code: string) => heldKeys.has(code)
export const isKeyUp = (code: string) => !heldKeys.has(code)
export function isKeyPressed(code: string) {
    if (heldKeys.has(code) && !pressedKeys.has(code)) {
        pressedKeys.add(code)
        return true
    }

    return false
}

const isLeft = (id: number) => isKeyDown(controls[id].keyboard[Control.LEFT])
const isRight = (id: number) => isKeyDown(controls[id].keyboard[Control.RIGHT])
export const isUp = (id: number) => isKeyDown(controls[id].keyboard[Control.UP])
export const isDown = (id: number) => isKeyDown(controls[id].keyboard[Control.DOWN])

export const isControlDown = (id: number, control: Control) => isKeyDown(controls[id].keyboard[control])
export const isControlPressed = (id: number, control: Control) => isKeyPressed(controls[id].keyboard[control])

export const isForward = (id: number, direction: FighterDirection) => (direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id))
export const isBackward = (id: number, direction: FighterDirection) => (direction === FighterDirection.LEFT ? isRight(id) : isLeft(id))
export const isIdle = (id: number) => !(isLeft(id) || isRight(id) || isUp(id) || isDown(id))
export const isLightPunch = (id: number) => isControlPressed(id, Control.LIGHT_PUNCH)
export const isLightKick = (id: number) => isControlPressed(id, Control.LIGHT_KICK)
export const isMediumKick = (id: number) => isControlPressed(id, Control.MEDIUM_KICK)
