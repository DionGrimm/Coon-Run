/// <reference path="basicObject.ts"/>

class Cloud extends basicObject {

    
    constructor (game:Game) {
        super(game)

        this.height = 109
        this.width = 230
        this.Image = <HTMLImageElement>document.getElementById('wolk')
        this.game = game
        this.x = this.game.canvasWidth
        this.y = Math.floor(Math.random()*150) + 5
        this.hspeed = this.game.cloudSpeed
    }


    update():void {
        this.hspeed = this.game.cloudSpeed
        if (!this.game.levelObject.levels[this.game.levelObject.currentLevel].night) {
            this.Image = <HTMLImageElement>document.getElementById('wolk')
        } else {
            this.Image = <HTMLImageElement>document.getElementById('ufo')
        }

        // Draw
        this.game.ctx.fillStyle = "white"
        super.update()
    }
}