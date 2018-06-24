class Levels {

    private game:Game
    public proverbs:Proverbs = new Proverbs()
    public levels:{level:number, sprite:HTMLImageElement, maxSpeed:number, acceleration:number, binChance:number, trashChance:number, wordChance:number, lifeChance:number, proverbArray:Array<number>, bgArray:Array<number>, night:boolean, music:HTMLAudioElement}[]

    public currentLevel:number = 0
    public currentProverb:number = 0

    private levelProgress:Array<number>
    public proverbProgress:Array<string>
    public currentString:string
 
    private maxLevel:number

    public levelSprite:HTMLImageElement

    private levelCountdown:number = 300
    public levelBreak:boolean = false

    private nightOver:boolean = false
    private nightCountdown:number = 900

    public levelMusic:HTMLAudioElement

    constructor(game:Game) {
        this.game = game

        this.levels = [
            {
                level: 0,
                sprite: <HTMLImageElement>document.getElementById('level1'),

                maxSpeed: 0,
                acceleration: 0,

                // Bin chances
                binChance: 0,
                trashChance: 0,
                wordChance: 0,
                lifeChance: 0,

                proverbArray: [0],
                bgArray: [0,1],
                night: false,
                music: <HTMLAudioElement>document.getElementById("dag")
            },
            {
                level: 1,
                sprite: <HTMLImageElement>document.getElementById('level1'),

                maxSpeed: 15,
                acceleration: 0.001,
                // chances
                binChance: .4,
                trashChance: .5,
                wordChance: .97,
                lifeChance: 1,

                proverbArray: [1,2,3,4],
                bgArray: [2,3,4],
                night: false,
                music: <HTMLAudioElement>document.getElementById("dag")
            },
            {
                level: 2,
                sprite: <HTMLImageElement>document.getElementById('level0'),

                maxSpeed: 16,
                acceleration: 0.0015,
                // Bin chances
                binChance: .45,
                trashChance: .95,
                wordChance: 0,
                lifeChance: 1,

                proverbArray: [0],
                bgArray: [0,1],
                night: true,
                music: <HTMLAudioElement>document.getElementById("nacht")
            },
            {
                level: 3,
                sprite: <HTMLImageElement>document.getElementById('level2'),

                maxSpeed: 17,
                acceleration: 0.002,
                // Bin chances
                binChance: .4,
                trashChance: .5,
                wordChance: .97,
                lifeChance: 1,

                proverbArray: [5,6,7,8,9,10],
                bgArray: [5,6],
                night: false,
                music: <HTMLAudioElement>document.getElementById("dag")
            },
            {
                level: 4,
                sprite: <HTMLImageElement>document.getElementById('level0'),

                maxSpeed: 18,
                acceleration: 0.002,
                // Bin chances
                binChance: .45,
                trashChance: .95,
                wordChance: 0,
                lifeChance: 1,

                proverbArray: [0],
                bgArray: [0,1],
                night: true,
                music: <HTMLAudioElement>document.getElementById("nacht")
            },
            {
                level: 5,
                sprite: <HTMLImageElement>document.getElementById('level3'),

                maxSpeed: 19,
                acceleration: 0.0025,
                // Bin chances
                binChance: .4,
                trashChance: .5,
                wordChance: .97,
                lifeChance: 1,

                proverbArray: [11,12,13,14,15],
                bgArray: [7,8,9],
                night: false,
                music: <HTMLAudioElement>document.getElementById("dag")
            },
            {
                level: 6,
                sprite: <HTMLImageElement>document.getElementById('level0'),

                maxSpeed: 20,
                acceleration: 0.0025,
                // Bin chances
                binChance: .45,
                trashChance: .95,
                wordChance: 0,
                lifeChance: 1,

                proverbArray: [0],
                bgArray: [0,1],
                night: true,
                music: <HTMLAudioElement>document.getElementById("nacht")
            },
            {
                level: 7,
                sprite: <HTMLImageElement>document.getElementById('level4'),

                maxSpeed: 21,
                acceleration: 0.003,
                // Bin chances
                binChance: .45,
                trashChance: .95,
                wordChance: 0,
                lifeChance: 1,

                proverbArray: [0],
                bgArray: [10,11],
                night: false,
                music: <HTMLAudioElement>document.getElementById("kawaiisong")
            },
            

        ]

        this.maxLevel = this.levels.length-1
        this.levelSprite = this.levels[this.currentLevel].sprite
        this.levelMusic = this.levels[this.currentLevel].music
        this.levelProgress = this.levels[this.currentLevel].proverbArray.slice();
        this.proverbProgress = this.proverbs.list[this.currentProverb].correct.slice()
        this.currentString = this.proverbs.list[this.currentProverb].string
    }

    update() {
        let lvlReady = (this.levelProgress.length == 0)
        let proverbReady = (this.proverbProgress.length == 0) 
        
        if ((proverbReady && lvlReady) || this.nightOver) {
            
            this.currentProverb = 0
            this.proverbProgress = this.proverbs.list[this.currentProverb].correct.slice()
            this.currentString = this.proverbs.list[this.currentProverb].string
            if (this.nightOver) {
                console.log("night over");
                this.nightOver = false
                if (this.currentLevel != this.maxLevel) {
                    this.currentLevel++
                }
                this.switchLevel()
            } else {
                this.levelBreak = true
            }
            
        } else if (proverbReady) {
            this.switchProverb()
        }

        if (this.levelBreak) {
            this.game.Spawner.binChance = 0
            this.game.Spawner.trashChance = 0
            this.game.Spawner.wordChance = 0
            this.game.Spawner.lifeChance = 0
            if (this.levelCountdown > 0) {
                this.levelCountdown--
            }

            if (this.levelCountdown < 1) {
                // Switches level
                if (this.currentLevel != this.maxLevel) {
                    this.currentLevel++
                }
                this.switchLevel()
                this.levelCountdown = 300
                this.levelBreak = false
            }
        }

        if (this.levels[this.currentLevel].night) {
            if (this.nightCountdown > 0) {
                this.nightCountdown--
            }

            if (this.nightCountdown < 1) {
                this.nightOver = true
                this.nightCountdown = 600
            }
        }

        if (this.game.dead) {
            this.currentLevel = 0
            this.game.bgSpeed = 0
            this.game.cloudSpeed = 0
            this.game.Spawner.binChance = 0
            this.game.Spawner.trashChance = 0
            this.game.Spawner.wordChance = 0
            this.game.Spawner.lifeChance = 0
        }

        // Control speed
        this.game.objSpeed += this.levels[this.currentLevel].acceleration
        if(this.game.objSpeed > this.levels[this.currentLevel].maxSpeed) this.game.objSpeed = this.levels[this.currentLevel].maxSpeed
        
    }

    // Resets the game and the required values
    restart() {
        this.currentLevel = 1
        // Switches level
        this.switchLevel()

        // Reset required game values
        this.game.dead = false
        this.game.lifeCount = this.game.startingLifes
        this.game.objSpeed = this.game.startObjSpeed
        this.game.score = 0
        this.game.bgSpeed = 1
        this.game.cloudSpeed = .5
    }

    // Gets the random proverb and resets the proverbprogress with a new correct array and updates the string
    switchProverb():void {
        this.currentProverb = this.random()
        this.proverbProgress = this.proverbs.list[this.currentProverb].correct.slice()
        this.currentString = this.proverbs.list[this.currentProverb].string    
    }

    // Gets a random value from a level's proverb array and return an index for the proverblist
    random():any {
        let i = Math.floor(Math.random() * this.levelProgress.length)
        let j = this.levelProgress[i]
        this.levelProgress.splice(i,1)

        return j
     }

     switchLevel():void {
        this.levelMusic.pause()
        this.levelMusic.currentTime = 0
        this.levelProgress = this.levels[this.currentLevel].proverbArray.slice();
        this.levelSprite = this.levels[this.currentLevel].sprite
        this.switchProverb()
        this.game.Spawner.binChance = this.levels[this.currentLevel].binChance
        this.game.Spawner.trashChance = this.levels[this.currentLevel].trashChance
        this.game.Spawner.wordChance = this.levels[this.currentLevel].wordChance
        this.game.Spawner.lifeChance = this.levels[this.currentLevel].lifeChance
        this.levelMusic = this.levels[this.currentLevel].music
        this.levelMusic.play()
     }
}