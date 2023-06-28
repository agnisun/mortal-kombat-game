export class Fade {
    animationTimer = 0
    animationFrame = 0
    frameDelay = 0
    alpha = 1
    fadeIn = false

    restart() {
        this.alpha = 1
        this.fadeIn = false
    }

    update() {
        if (!this.fadeIn) {
            this.alpha -= 0.01
            if (this.alpha < 0) {
                this.alpha = 0
                this.fadeIn = true
            }
        }
    }
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = `rgba(0,0,0, ${this.alpha})`
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }
}
