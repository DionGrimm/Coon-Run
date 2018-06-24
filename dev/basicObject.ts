class basicObject {

    public width:number = 50
    public height:number = 50
    public x:number
    public y:number
    public alive:boolean = true
    protected hspeed:number = 0
    protected game:Game
    protected Image: HTMLImageElement = <HTMLImageElement>document.getElementById('bin1')
    protected Sound:HTMLAudioElement = <HTMLAudioElement>document.getElementById('Jump')

    constructor(game:Game) {
        this.game = game

        this.x = this.game.canvasWidth
        this.y = this.game.ground-this.height
    }

    update() {
        // Deactivate when object leaves left side of screen
        if (this.x < 0-this.width) { 
            // Delete bin
            this.alive = false
        }

        // Move
        this.x -= this.hspeed

        // Draw
        //this.game.ctx.fillRect(this.x, this.y, this.width, this.height)

        this.game.ctx.drawImage(this.Image, this.x, this.y, this.width, this.height)
    }
}