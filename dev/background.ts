/// <reference path="basicObject.ts"/>

class BgObject extends basicObject {

    private index:{sprite:HTMLImageElement, width:number, height:number}[]
    
    constructor (game:Game) {
        super(game)
        // Each background object has its own size knows in which level to spawn
        this.index = [
            {
                sprite: <HTMLImageElement>document.getElementById('bench'),
                width: 75,
                height: 58
            },
            {
                sprite: <HTMLImageElement>document.getElementById('lantern'),
                width: 31,
                height: 150
            },
            {
                sprite: <HTMLImageElement>document.getElementById('carrots'),
                width: 123,
                height: 80
            },
            {
                sprite: <HTMLImageElement>document.getElementById('corn'),
                width: 100,
                height: 87
            },
            {
                sprite: <HTMLImageElement>document.getElementById('flower'),
                width: 124,
                height: 100
            },
            {
                sprite: <HTMLImageElement>document.getElementById('bookshelf'),
                width: 47,
                height: 150
            },
            {
                sprite: <HTMLImageElement>document.getElementById('chouch'),
                width: 130,
                height: 80
            },
            {
                sprite: <HTMLImageElement>document.getElementById('signzoo'),
                width: 132,
                height: 126
            },
            {
                sprite: <HTMLImageElement>document.getElementById('zebra'),
                width: 250,
                height: 141
            },
            {
                sprite: <HTMLImageElement>document.getElementById('zoosign'),
                width: 192,
                height: 108
            },
            {
                sprite: <HTMLImageElement>document.getElementById('kawaiihearts'),
                width: 90,
                height: 90
            },
            {
                sprite: <HTMLImageElement>document.getElementById('kawaiirainbow'),
                width: 140,
                height: 80
            },
        ]
        // i chooses a random background object from the pool of available objects in the level
        let i = this.index[this.game.levelObject.levels[this.game.levelObject.currentLevel].bgArray[Math.floor(Math.random() * this.game.levelObject.levels[this.game.levelObject.currentLevel].bgArray.length)]]

        this.height = i.height
        this.width = i.width
        this.Image = i.sprite

        this.game = game
        this.x = this.game.canvasWidth
        this.y = this.game.ground - this.height - 35
        this.hspeed = this.game.bgSpeed
    }


    update():void {
        this.hspeed = this.game.bgSpeed
        // Draw
        //this.game.ctx.fillStyle = "white"
        super.update()
    }
}