class Player {

    public standing:HTMLImageElement = <HTMLImageElement>document.getElementById('raccoon')
    public walking:HTMLImageElement = <HTMLImageElement>document.getElementById('raccoonwalk')
    public walking2:HTMLImageElement = <HTMLImageElement>document.getElementById('raccoonwalk2')
    public jump:HTMLImageElement = <HTMLImageElement>document.getElementById('raccoonjump')
    public duck:HTMLImageElement = <HTMLImageElement>document.getElementById('raccoonduck')

    public playerImage:HTMLImageElement = this.standing
    private animationTimer:number = 20

    public width:number = 153
    public height:number = 153
    public x:number = 15
    public y:number
    private game:Game
    public ground:number
    public jumping:boolean = false
    public vSpeed:number = 0
    public jumpSpeed:number = 30
    public acceleration:number = 3.5
    public gravity:number = -30
    private jumpHeight:number
    private minJumpHeight:number
    private grounded:boolean = true
    private mPressed:boolean = false
    private mReleased:boolean = false
    public sound:HTMLAudioElement = <HTMLAudioElement>document.getElementById('jump')

    private jumpKey: number = 32
    private duckKey:number = 40
    private ducking: boolean = false
    public vulnerable:boolean = true
    private vulnerableCD:number = 120
    private currentVulnerableCD = this.vulnerableCD
    private blinkTimer = 30

    constructor(game:Game) {
        //console.log("i am a player!")
        this.game = game
        this.y = this.game.ground-this.height
        this.ground = this.game.ground
        this.jumpHeight = this.ground-this.height - 250
        this.minJumpHeight = this.ground-this.height - 200
        // Checks for input
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
    }

    update():void {
        // Sprite index
        if (this.animationTimer > 0) {
            this.animationTimer--
        } else {
            this.animationTimer = 20
        }

        if (this.animationTimer < 10) {
            this.playerImage = this.walking
        } else {
            this.playerImage = this.walking2
        }

        if (this.game.objSpeed == 0) {
            this.playerImage = this.standing
        }

        // Vulnerable
        if (!this.vulnerable) {
            this.currentVulnerableCD--
            // Blinking
            if (this.blinkTimer > 0) {
                this.blinkTimer--
                if (this.blinkTimer < 15) {
                    this.x = 15
                } else {
                    this.x = -500
                }
            } else {
                this.blinkTimer = 30
            }
        } else {
            this.x = 15
        }

        if (this.currentVulnerableCD < 1) {
            this.vulnerable = true
            this.currentVulnerableCD = this.vulnerableCD
        }

        // Check if grounded
        if (this.y+this.height == this.ground) this.grounded = true
        // Check if can jump and enable jump
        if (this.grounded) {
            this.vSpeed = 0
            if (this.mPressed) this.jumping = true

        }
        // Stop jumping if mouse is released and player is past the min jump height
        if (this.jumping && this.mReleased && this.y < this.minJumpHeight) {
            this.jumping = false
        }
        // Stop jumping if player reaches max height
        if (this.y < this.jumpHeight) {
            this.jumping = false
        }
        // Change the speed if player is jumping
        if (this.jumping) {
            this.grounded = false
            this.vSpeed += this.acceleration
            if (this.vSpeed > this.jumpSpeed) this.vSpeed = this.jumpSpeed
            this.playerImage = this.jump
        }
        // Change the speed if player is not jumping
        if (!this.jumping && !this.grounded) {
            if (this.vSpeed < 10 && this.vSpeed > -10) this.vSpeed -= this.acceleration/2; else this.vSpeed -= this.acceleration*1.5
            if (this.vSpeed < this.gravity) this.vSpeed = this.gravity
        }
        // Move the player based on its speed
        this.y -= this.vSpeed
        // Makes sure player doesn't go below the ground
        if (this.y > this.ground-this.height) {
            this.y = this.ground-this.height
        }

        if (this.jumping) {
            this.playerImage = this.duck
        }

        if (this.ducking) {
            this.playerImage = this.duck
        }

        this.game.ctx.fillStyle = "black"
        //this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.game.ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height)
    }
    // Jumping and ducking *quack*

    private onKeyDown(e: KeyboardEvent):void {
        if (e.keyCode == this.jumpKey) {
            if (this.game.dead || this.game.levelObject.currentLevel == 0) {
                this.game.levelObject.restart()
            } else if (!this.ducking) {
                this.mPressed = true
                this.mReleased = false
                this.sound.play();
            }
        }

        if (!this.game.dead && this.game.levelObject.currentLevel != 0) {
            if (e.keyCode == this.duckKey && !this.ducking && this.grounded) {
                this.height /=2
                this.y += this.height
                this.ducking = true
                let duckSound:HTMLAudioElement = <HTMLAudioElement>document.getElementById('duckSnd')
                duckSound.play()
            }
        }
    }
 
    private onKeyUp(e: KeyboardEvent):void {
        if (e.keyCode == this.jumpKey) {
            this.mPressed = false
            this.mReleased = true
        }

        if (e.keyCode == this.duckKey && this.ducking) {
            this.y -= this.height
            this.height *= 2
            this.ducking = false
        }
    }
}