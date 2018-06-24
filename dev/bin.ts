/// <reference path="basicObject.ts"/>

class Bin extends basicObject {
    
    public type:number

    private small:HTMLImageElement = <HTMLImageElement>document.getElementById('bin1')
    private medium:HTMLImageElement = <HTMLImageElement>document.getElementById('bin2')
    private large:HTMLImageElement = <HTMLImageElement>document.getElementById('bin3')
    private ksmall:HTMLImageElement = <HTMLImageElement>document.getElementById('kawaiibin1')
    private kmedium:HTMLImageElement = <HTMLImageElement>document.getElementById('kawaiibin2')
    private klarge:HTMLImageElement = <HTMLImageElement>document.getElementById('kawaiibin3')

    constructor (game:Game, type:number) {
        super(game)

        this.Image = <HTMLImageElement>document.getElementById('bin1')
        this.Sound = <HTMLAudioElement>document.getElementById('hit')
        this.game = game
        this.hspeed = this.game.objSpeed
        this.type = type
        switch (this.type) { // Bins can have different types/sizes/sprites..
            case this.game.Spawner.single:
                this.width = 88
                this.height = 125
                this.y = this.game.ground-this.height
                this.Image = this.small
                if (this.game.levelObject.currentLevel == 7) {
                    this.Image = this.ksmall
                }
                break;
            case this.game.Spawner.double:
                this.width = 176
                this.height = 125
                this.y = this.game.ground-this.height
                this.Image = this.medium
                if (this.game.levelObject.currentLevel == 7) {
                    this.Image = this.kmedium
                }
                break;
            case this.game.Spawner.triple:
                this.width = 264
                this.height = 125
                this.y = this.game.ground-this.height
                this.Image = this.large
                if (this.game.levelObject.currentLevel == 7) {
                    this.Image = this.klarge
                }
                break;
        }

        this.x = this.game.canvasWidth
        this.y = this.game.ground-this.height
    }

    update():void {
        this.hspeed = this.game.objSpeed
        // If there is a collision toggle the player state
        if (this.game.collision(this)) { 
            this.alive = false
            this.game.lifeCount--
            this.game.player.vulnerable = false
<<<<<<< HEAD
            let sound:HTMLAudioElement = <HTMLAudioElement>document.getElementById('hitSnd')
            sound.play()
            if (this.game.lifeCount < 1) {
            this.game.levelObject.levelMusic.pause()
            this.game.levelObject.levelMusic.currentTime = 0

            let sound:HTMLAudioElement = <HTMLAudioElement>document.getElementById('deathSnd')
            sound.play()
            this.game.levelObject.levelMusic = <HTMLAudioElement>document.getElementById('gameoverSong')
            this.game.levelObject.levelMusic.play()
            }
=======
            this.Sound.play()
>>>>>>> 13bc8c698b1d4efcf3f0846b430c7050c68baf80
        }
        
        // Draw
        this.game.ctx.fillStyle = "black"
        super.update()
    }
}