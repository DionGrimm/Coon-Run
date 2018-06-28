class Spawner {

    game:Game
    public bins:Array<Bin> = [];
    public binChance = 0.4 // Chance of bin spawning
    public canSpawnBin:boolean = false
    public single = 0
    public double = 1
    public triple = 2

    public words:Array<Word> = [];
    public wordChance = 0.95
    public canSpawnWord:boolean = false
  
    public lifes:Array<Life> = [];
    public lifeChance = 1
    public canSpawnLife:boolean = false

    public trash:Array<Life> = [];
    public trashChance = 0.65
    public canSpawntrash:boolean = false

    public clouds:Array<Cloud> = [];
    public cloudChance = 0.1
    public canSpawnCloud:boolean = false
    public cloudSpawnMaxCD:number = 2000
    public cloudSpawnCD:number = 60

    public bgObject:Array<Life> = [];
    public bgChance = 0.1
    public canSpawnBg:boolean = false
    public bgSpawnMaxCD:number = 1000
    public bgCD:number = 60

    public canSpawn:boolean = false
    public spawnMaxCD:number = 90
    public spawnMinCD:number = 90
    public spawnCD:number = this.spawnMaxCD

    constructor (game:Game) {
        this.game = game

    }

    update():void{
        // Spawning
        if (this.spawnCD > 0) {
            this.spawnCD--
        }

        if (this.spawnCD <= 0) {
            this.canSpawn = true
        }

        if (!this.game.dead && this.game.levelObject.currentLevel != 0 && !this.game.levelObject.levelBreak) {
            if (this.canSpawn) {
                this.canSpawn = false
                this.spawnCD = this.getRandomInt(this.spawnMinCD, this.spawnMaxCD)
                
                let chance = Math.random()
                if (chance < this.binChance) {
                    // Spawn bin
                    this.spawnBin()
                    let chance = Math.random()
                    if (chance < this.binChance) {
                        // add nothing
                    } else if (chance < 97) {
                        // add Trash
                        let height:number = this.game.ground - 350
                        this.spawnTrash(height)
                    } else if (chance < 1) {
                        // add life
                        let height:number = this.game.ground - 350
                        this.spawnLife(height)
                    }
                } else if (chance < this.trashChance) {
                    // Spawn Trash
                    let height:number
                    if (Math.random() > .5) {
                        height = this.game.ground - 150
                    } else {
                        height = this.game.ground - 350
                    }
                    this.spawnTrash(height)
                } else if (chance < this.wordChance) {
                    // Spawn word
                    let height:number
                    if (Math.random() > .5) {
                        height = this.game.ground - 180
                    } else {
                        height = this.game.ground - 350
                    }
                    this.spawnWord(height)
                } else if (chance < this.lifeChance) {
                    // Spawn life
                    let height:number = this.game.ground - 350
                    this.spawnLife(height)
                }
            }
        

            // Cloud spawn
            if(this.cloudSpawnCD > 0 && !this.canSpawnCloud) {
                this.cloudSpawnCD--
            } else {
                this.cloudSpawnCD = this.cloudSpawnMaxCD
                this.canSpawnCloud = true
            }
            if (Math.random() < this.cloudChance && this.canSpawnCloud) {
                this.clouds.push (new Cloud(this.game))
                this.canSpawnCloud = false
            }    

            // bgObject spawn
            if(this.bgCD > 0 && !this.canSpawnBg) {
                this.bgCD--
            } else {
                this.bgCD = this.bgSpawnMaxCD
                this.canSpawnBg = true
            }
            if (Math.random() < this.bgChance && this.canSpawnBg) {
                this.bgObject.push (new BgObject(this.game))
                this.canSpawnBg = false
            }   
        }

        // Cloud
        let deleteCloud = []
        for(let i=0; i<this.clouds.length; i++) {
            this.clouds[i].update()
            if (!this.clouds[i].alive) {
                deleteCloud.push(i)
            }
        }
        deleteCloud.reverse()
        for (const i in deleteCloud) {
            this.clouds.splice(parseInt(i), 1)
        }

        // bgObject
        let deleteBG = []
        for(let i=0; i<this.bgObject.length; i++) {
            this.bgObject[i].update()
            if (!this.bgObject[i].alive) {
                deleteBG.push(i)
            }
        }
        deleteBG.reverse()
        for (const i in deleteBG) {
            this.bgObject.splice(parseInt(i), 1)
        }

        // Bins
        let deleteBin:number[] = [] // Temp holder for removed bins
        for (let i=0; i<this.bins.length; i++) {
            this.bins[i].update() // Moves the bins
            if (!this.bins[i].alive) {
                deleteBin.push(i) // Move object to the temp holder
            }
        }
        deleteBin.reverse()
        for (const i in deleteBin) {
            this.bins.splice(parseInt(i), 1) // Empty the temp holder
        }

        // Words
        let deleteWord = []
        for(let i=0; i<this.words.length; i++) {
            this.words[i].update()
            if (!this.words[i].alive) {
                deleteWord.push(i)
            }
        }
        deleteWord.reverse()
        for (const i in deleteWord) {
            this.words.splice(parseInt(i), 1)
        }

        // Life
        let deleteLife = []
        for(let i=0; i<this.lifes.length; i++) {
            this.lifes[i].update()
            if (!this.lifes[i].alive) {
                deleteLife.push(i)
            }
        }
        deleteLife.reverse()
        for (const i in deleteLife) {
            this.lifes.splice(parseInt(i), 1)
        }

        // Trash
        let deleteTrash = []
        for(let i=0; i<this.trash.length; i++) {
            this.trash[i].update()
            if (!this.trash[i].alive) {
                deleteTrash.push(i)
            }
        }
        deleteTrash.reverse()
        for (const i in deleteTrash) {
            this.trash.splice(parseInt(i), 1)
        }

    }

    spawnBin():void {
        // Spawn bin
            let binType:number
            if (Math.random()>.5) { // Decide on bin type
                binType = this.single
            } else {
                binType = this.double
            }
            // New bin
            this.bins.push(new Bin(this.game, binType))
    }

    spawnTrash(height:number):void {
        // Trash Spawn
            this.trash.push (new Trash(this.game, height))
    }

    spawnWord(height:number):void {
        // Word Spawn
            let fake:boolean
            let name:number
            if (Math.random()>.6) {
                fake = true
                name = Math.floor(Math.random() * this.game.levelObject.proverbs.list[this.game.levelObject.currentProverb].incorrect.length)
            } else {
                fake = false
                name = Math.floor(Math.random() * this.game.levelObject.proverbProgress.length)
            }
            // New word
            this.words.push(new Word(this.game, name, fake, height))
    }

    spawnLife(height:number):void {
        // Life Spawn
            this.lifes.push (new Life(this.game, height))
    }

    getRandomInt(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}