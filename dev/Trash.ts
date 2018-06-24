/// <reference path="basicObject.ts"/>

class Trash extends basicObject {

    constructor (game:Game, height:number) { // Get game, ground height, canvas width, moving speed and type
        super(game)
        this.game = game
        this.hspeed = this.game.objSpeed
        this.x = this.game.canvasWidth
        this.y = height
        this.width = 63
        this.height = 63
        this.Image = <HTMLImageElement>document.getElementById('peel')
    }

    update():void {
        this.hspeed = this.game.objSpeed
        // If there is a collision toggle the player state
        if (this.game.collision(this)) { 
            this.alive = false
            this.game.score += 500
            let sound:HTMLAudioElement = <HTMLAudioElement>document.getElementById('coinSnd')
            sound.play()
        }

        // Draw
        this.game.ctx.fillStyle = "#00FFFF"  
        super.update()
    }
}