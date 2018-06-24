"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var basicObject = (function () {
    function basicObject(game) {
        this.width = 50;
        this.height = 50;
        this.alive = true;
        this.hspeed = 0;
        this.Image = document.getElementById('bin1');
        this.Sound = document.getElementById('Jump');
        this.game = game;
        this.x = this.game.canvasWidth;
        this.y = this.game.ground - this.height;
    }
    basicObject.prototype.update = function () {
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
        this.game.ctx.drawImage(this.Image, this.x, this.y, this.width, this.height);
    };
    return basicObject;
}());
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud(game) {
        var _this = _super.call(this, game) || this;
        _this.height = 109;
        _this.width = 230;
        _this.Image = document.getElementById('wolk');
        _this.game = game;
        _this.x = _this.game.canvasWidth;
        _this.y = Math.floor(Math.random() * 150) + 5;
        _this.hspeed = _this.game.cloudSpeed;
        return _this;
    }
    Cloud.prototype.update = function () {
        this.hspeed = this.game.cloudSpeed;
        if (!this.game.levelObject.levels[this.game.levelObject.currentLevel].night) {
            this.Image = document.getElementById('wolk');
        }
        else {
            this.Image = document.getElementById('ufo');
        }
        this.game.ctx.fillStyle = "white";
        _super.prototype.update.call(this);
    };
    return Cloud;
}(basicObject));
var Spawner = (function () {
    function Spawner(game) {
        this.bins = [];
        this.binChance = 0.4;
        this.canSpawnBin = false;
        this.binSpawnMaxCD = 1;
        this.binSpawnCD = this.binSpawnMaxCD;
        this.single = 0;
        this.double = 1;
        this.triple = 2;
        this.words = [];
        this.wordChance = 0.95;
        this.canSpawnWord = false;
        this.wordSpawnMaxCD = 1;
        this.wordSpawnCD = this.wordSpawnMaxCD;
        this.lifes = [];
        this.lifeChance = 1;
        this.canSpawnLife = false;
        this.lifeSpawnMaxCD = 1;
        this.lifeSpawnCD = this.lifeSpawnMaxCD;
        this.trash = [];
        this.trashChance = 0.65;
        this.canSpawntrash = false;
        this.trashSpawnMaxCD = 1;
        this.trashSpawnCD = this.trashSpawnMaxCD;
        this.clouds = [];
        this.cloudChance = 0.1;
        this.canSpawnCloud = false;
        this.cloudSpawnMaxCD = 1500;
        this.cloudSpawnCD = 60;
        this.bgObject = [];
        this.bgChance = 0.1;
        this.canSpawnBg = false;
        this.bgSpawnMaxCD = 1000;
        this.bgCD = 60;
        this.canSpawn = false;
        this.spawnMaxCD = 90;
        this.spawnCD = this.spawnMaxCD;
        this.game = game;
    }
    Spawner.prototype.update = function () {
        if (this.spawnCD > 0) {
            this.spawnCD--;
        }
        if (this.spawnCD < 1) {
            this.spawnCD = this.spawnMaxCD;
            this.canSpawn = true;
        }
        if (!this.game.dead && this.game.levelObject.currentLevel != 0) {
            if (this.canSpawn) {
                this.canSpawn = false;
                var chance = Math.random();
                if (chance < this.binChance) {
                    this.spawnBin();
                    var chance_1 = Math.random();
                    if (chance_1 < .5) {
                    }
                    else if (chance_1 < .97) {
                        var height = this.game.ground - 350;
                        this.spawnTrash(height);
                    }
                    else if (chance_1 < this.lifeChance) {
                        var height = this.game.ground - 350;
                        this.spawnLife(height);
                    }
                }
                else if (chance < this.trashChance) {
                    var height = void 0;
                    if (Math.random() > .5) {
                        height = this.game.ground - 150;
                    }
                    else {
                        height = this.game.ground - 350;
                    }
                    this.spawnTrash(height);
                }
                else if (chance < this.wordChance) {
                    var height = void 0;
                    if (Math.random() > .5) {
                        height = this.game.ground - 180;
                    }
                    else {
                        height = this.game.ground - 350;
                    }
                    this.spawnWord(height);
                }
                else if (chance < this.lifeChance) {
                    var height = this.game.ground - 350;
                    this.spawnLife(height);
                }
            }
            if (this.cloudSpawnCD > 0 && !this.canSpawnCloud) {
                this.cloudSpawnCD--;
            }
            else {
                this.cloudSpawnCD = this.cloudSpawnMaxCD;
                this.canSpawnCloud = true;
            }
            if (Math.random() < this.cloudChance && this.canSpawnCloud) {
                this.clouds.push(new Cloud(this.game));
                this.canSpawnCloud = false;
            }
            if (this.bgCD > 0 && !this.canSpawnBg) {
                this.bgCD--;
            }
            else {
                this.bgCD = this.bgSpawnMaxCD;
                this.canSpawnBg = true;
            }
            if (Math.random() < this.bgChance && this.canSpawnBg) {
                this.bgObject.push(new BgObject(this.game));
                this.canSpawnBg = false;
            }
        }
        var deleteCloud = [];
        for (var i = 0; i < this.clouds.length; i++) {
            this.clouds[i].update();
            if (!this.clouds[i].alive) {
                deleteCloud.push(i);
            }
        }
        deleteCloud.reverse();
        for (var i in deleteCloud) {
            this.clouds.splice(parseInt(i), 1);
        }
        var deleteBG = [];
        for (var i = 0; i < this.bgObject.length; i++) {
            this.bgObject[i].update();
            if (!this.bgObject[i].alive) {
                deleteBG.push(i);
            }
        }
        deleteBG.reverse();
        for (var i in deleteBG) {
            this.bgObject.splice(parseInt(i), 1);
        }
        var deleteBin = [];
        for (var i = 0; i < this.bins.length; i++) {
            this.bins[i].update();
            if (!this.bins[i].alive) {
                deleteBin.push(i);
            }
        }
        deleteBin.reverse();
        for (var i in deleteBin) {
            this.bins.splice(parseInt(i), 1);
        }
        var deleteWord = [];
        for (var i = 0; i < this.words.length; i++) {
            this.words[i].update();
            if (!this.words[i].alive) {
                deleteWord.push(i);
            }
        }
        deleteWord.reverse();
        for (var i in deleteWord) {
            this.words.splice(parseInt(i), 1);
        }
        var deleteLife = [];
        for (var i = 0; i < this.lifes.length; i++) {
            this.lifes[i].update();
            if (!this.lifes[i].alive) {
                deleteLife.push(i);
            }
        }
        deleteLife.reverse();
        for (var i in deleteLife) {
            this.lifes.splice(parseInt(i), 1);
        }
        var deleteTrash = [];
        for (var i = 0; i < this.trash.length; i++) {
            this.trash[i].update();
            if (!this.trash[i].alive) {
                deleteTrash.push(i);
            }
        }
        deleteTrash.reverse();
        for (var i in deleteTrash) {
            this.trash.splice(parseInt(i), 1);
        }
    };
    Spawner.prototype.spawnBin = function () {
        var binType;
        if (Math.random() > .5) {
            binType = this.single;
        }
        else {
            binType = this.double;
        }
        this.bins.push(new Bin(this.game, binType));
    };
    Spawner.prototype.spawnTrash = function (height) {
        this.trash.push(new Trash(this.game, height));
    };
    Spawner.prototype.spawnWord = function (height) {
        var fake;
        var name;
        if (Math.random() > .6) {
            fake = true;
            name = Math.floor(Math.random() * this.game.levelObject.proverbs.list[this.game.levelObject.currentProverb].incorrect.length);
        }
        else {
            fake = false;
            name = Math.floor(Math.random() * this.game.levelObject.proverbProgress.length);
        }
        this.words.push(new Word(this.game, name, fake, height));
    };
    Spawner.prototype.spawnLife = function (height) {
        this.lifes.push(new Life(this.game, height));
    };
    return Spawner;
}());
var Trash = (function (_super) {
    __extends(Trash, _super);
    function Trash(game, height) {
        var _this = _super.call(this, game) || this;
        _this.game = game;
        _this.hspeed = _this.game.objSpeed;
        _this.x = _this.game.canvasWidth;
        _this.y = height;
        _this.width = 63;
        _this.height = 63;
        _this.Image = document.getElementById('peel');
        return _this;
    }
    Trash.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        if (this.game.collision(this)) {
            this.alive = false;
            this.game.score += 500;
            var sound = document.getElementById('coinSnd');
            sound.play();
        }
        this.game.ctx.fillStyle = "#00FFFF";
        _super.prototype.update.call(this);
    };
    return Trash;
}(basicObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.canvas = document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = 1280;
        this.ground = 650;
        this.startingLifes = 1;
        this.lifeCount = this.startingLifes;
        this.score = 0;
        this.highscore = 0;
        this.dead = false;
        this.startObjSpeed = 12;
        this.objSpeed = this.startObjSpeed;
        this.bgSpeed = 1;
        this.cloudSpeed = .5;
        this.sun = document.getElementById('sun');
        this.moon = document.getElementById('moon');
        this.life = document.getElementById('life');
        this.gameLoop = function () {
            _this.ctx.fillStyle = "#D3D3D3";
            _this.ctx.drawImage(_this.levelObject.levelSprite, 0, 0, 1280, 720);
            if (!_this.levelObject.levels[_this.levelObject.currentLevel].night) {
                _this.ctx.drawImage(_this.sun, 150, 50, 150, 150);
            }
            else {
                _this.ctx.drawImage(_this.moon, 150, 50, 150, 150);
            }
            _this.Spawner.update();
            _this.levelObject.update();
            _this.player.update();
            if (_this.lifeCount < 1 && !_this.dead) {
                _this.dead = true;
                _this.lifeCount = 0;
                if (_this.score > _this.highscore)
                    _this.highscore = _this.score;
            }
            if (_this.objSpeed != 0)
                _this.score++;
            if (_this.score < 0) {
                _this.score = 0;
            }
            _this.ctx.fillStyle = "black";
            _this.ctx.font = "32px VT323";
            _this.ctx.textAlign = "start";
            _this.ctx.fillText("High Score: " + _this.highscore, 1000, 180);
            _this.ctx.fillText("Score: " + _this.score, 1000, 150);
            _this.ctx.fillText(_this.lifeCount + " x ", 1000, 260);
            _this.ctx.drawImage(_this.life, 1050, 225, 45, 45);
            _this.ctx.textAlign = "center";
            _this.ctx.font = "48px VT323";
            _this.ctx.fillText(_this.levelObject.currentString, _this.canvasWidth / 2, 100);
            if (_this.levelObject.currentLevel == 0) {
                _this.ctx.fillText("PRESS SPACE TO START", _this.canvasWidth / 2, _this.canvas.height / 2);
            }
            _this.ctx.stroke();
            requestAnimationFrame(_this.gameLoop);
        };
        this.levelObject = new Levels(this);
        this.Spawner = new Spawner(this);
        this.player = new Player(this);
        requestAnimationFrame(this.gameLoop);
    }
    Game.prototype.collision = function (object) {
        if (object.x > this.player.x + 60 - object.width && object.x < this.player.x + this.player.width - 10 && object.y > this.player.y - object.height && object.y < this.player.y + this.player.height) {
            return true;
        }
        else {
            return false;
        }
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var BgObject = (function (_super) {
    __extends(BgObject, _super);
    function BgObject(game) {
        var _this = _super.call(this, game) || this;
        _this.index = [
            {
                level: 0,
                sprite: document.getElementById('bench'),
                width: 75,
                height: 58
            },
            {
                level: 0,
                sprite: document.getElementById('lantern'),
                width: 31,
                height: 150
            },
            {
                level: 0,
                sprite: document.getElementById('carrots'),
                width: 123,
                height: 80
            },
            {
                level: 0,
                sprite: document.getElementById('corn'),
                width: 100,
                height: 87
            },
            {
                level: 0,
                sprite: document.getElementById('flower'),
                width: 124,
                height: 100
            },
            {
                level: 0,
                sprite: document.getElementById('bookshelf'),
                width: 47,
                height: 150
            },
            {
                level: 0,
                sprite: document.getElementById('chouch'),
                width: 130,
                height: 80
            },
            {
                level: 0,
                sprite: document.getElementById('signzoo'),
                width: 132,
                height: 126
            },
            {
                level: 0,
                sprite: document.getElementById('zebra'),
                width: 250,
                height: 141
            },
            {
                level: 0,
                sprite: document.getElementById('zoosign'),
                width: 192,
                height: 108
            },
            {
                level: 0,
                sprite: document.getElementById('kawaiihearts'),
                width: 90,
                height: 90
            },
            {
                level: 0,
                sprite: document.getElementById('kawaiirainbow'),
                width: 140,
                height: 80
            },
        ];
        var i = _this.index[_this.game.levelObject.levels[_this.game.levelObject.currentLevel].bgArray[Math.floor(Math.random() * _this.game.levelObject.levels[_this.game.levelObject.currentLevel].bgArray.length)]];
        _this.height = i.height;
        _this.width = i.width;
        _this.Image = i.sprite;
        _this.game = game;
        _this.x = _this.game.canvasWidth;
        _this.y = _this.game.ground - _this.height - 35;
        _this.hspeed = _this.game.bgSpeed;
        return _this;
    }
    BgObject.prototype.update = function () {
        this.hspeed = this.game.cloudSpeed;
        _super.prototype.update.call(this);
    };
    return BgObject;
}(basicObject));
var Bin = (function (_super) {
    __extends(Bin, _super);
    function Bin(game, type) {
        var _this = _super.call(this, game) || this;
        _this.small = document.getElementById('bin1');
        _this.medium = document.getElementById('bin2');
        _this.large = document.getElementById('bin3');
        _this.ksmall = document.getElementById('kawaiibin1');
        _this.kmedium = document.getElementById('kawaiibin2');
        _this.klarge = document.getElementById('kawaiibin3');
        _this.Image = document.getElementById('bin1');
        _this.Sound = document.getElementById('hit');
        _this.game = game;
        _this.hspeed = _this.game.objSpeed;
        _this.type = type;
        switch (_this.type) {
            case _this.game.Spawner.single:
                _this.width = 88;
                _this.height = 125;
                _this.y = _this.game.ground - _this.height;
                _this.Image = _this.small;
                if (_this.game.levelObject.currentLevel == 7) {
                    _this.Image = _this.ksmall;
                }
                break;
            case _this.game.Spawner.double:
                _this.width = 176;
                _this.height = 125;
                _this.y = _this.game.ground - _this.height;
                _this.Image = _this.medium;
                if (_this.game.levelObject.currentLevel == 7) {
                    _this.Image = _this.kmedium;
                }
                break;
            case _this.game.Spawner.triple:
                _this.width = 264;
                _this.height = 125;
                _this.y = _this.game.ground - _this.height;
                _this.Image = _this.large;
                if (_this.game.levelObject.currentLevel == 7) {
                    _this.Image = _this.klarge;
                }
                break;
        }
        _this.x = _this.game.canvasWidth;
        _this.y = _this.game.ground - _this.height;
        return _this;
    }
    Bin.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        if (this.game.collision(this)) {
            this.alive = false;
            this.game.lifeCount--;
            this.game.player.vulnerable = false;
            var sound = document.getElementById('hitSnd');
            sound.play();
            if (this.game.lifeCount < 1) {
                this.game.levelObject.levelMusic.pause();
                this.game.levelObject.levelMusic.currentTime = 0;
                var sound_1 = document.getElementById('deathSnd');
                sound_1.play();
                this.game.levelObject.levelMusic = document.getElementById('gameoverSong');
                this.game.levelObject.levelMusic.play();
            }
        }
        this.game.ctx.fillStyle = "black";
        _super.prototype.update.call(this);
    };
    return Bin;
}(basicObject));
var Levels = (function () {
    function Levels(game) {
        this.proverbs = new Proverbs();
        this.currentLevel = 0;
        this.currentProverb = 0;
        this.levelCountdown = 300;
        this.levelBreak = false;
        this.nightOver = false;
        this.nightCountdown = 900;
        this.game = game;
        this.levels = [
            {
                level: 0,
                sprite: document.getElementById('level1'),
                maxSpeed: 0,
                acceleration: 0,
                binChance: 0,
                trashChance: 0,
                wordChance: 0,
                lifeChance: 0,
                proverbArray: [0],
                bgArray: [0, 1],
                night: false,
                music: document.getElementById("dag")
            },
            {
                level: 1,
                sprite: document.getElementById('level1'),
                maxSpeed: 15,
                acceleration: 0.001,
                binChance: .4,
                trashChance: .5,
                wordChance: .97,
                lifeChance: 1,
                proverbArray: [1, 2, 3, 4],
                bgArray: [2, 3, 4],
                night: false,
                music: document.getElementById("dag")
            },
            {
                level: 2,
                sprite: document.getElementById('level0'),
                maxSpeed: 16,
                acceleration: 0.0015,
                binChance: .45,
                trashChance: .95,
                wordChance: 0,
                lifeChance: 1,
                proverbArray: [0],
                bgArray: [0, 1],
                night: true,
                music: document.getElementById("nacht")
            },
            {
                level: 3,
                sprite: document.getElementById('level2'),
                maxSpeed: 17,
                acceleration: 0.002,
                binChance: .4,
                trashChance: .5,
                wordChance: .97,
                lifeChance: 1,
                proverbArray: [5, 6, 7, 8, 9, 10],
                bgArray: [5, 6],
                night: false,
                music: document.getElementById("dag")
            },
            {
                level: 4,
                sprite: document.getElementById('level0'),
                maxSpeed: 18,
                acceleration: 0.002,
                binChance: .45,
                trashChance: .95,
                wordChance: 0,
                lifeChance: 1,
                proverbArray: [0],
                bgArray: [0, 1],
                night: true,
                music: document.getElementById("nacht")
            },
            {
                level: 5,
                sprite: document.getElementById('level3'),
                maxSpeed: 19,
                acceleration: 0.0025,
                binChance: .4,
                trashChance: .5,
                wordChance: .97,
                lifeChance: 1,
                proverbArray: [11, 12, 13, 14, 15],
                bgArray: [7, 8, 9],
                night: false,
                music: document.getElementById("dag")
            },
            {
                level: 6,
                sprite: document.getElementById('level0'),
                maxSpeed: 20,
                acceleration: 0.0025,
                binChance: .45,
                trashChance: .95,
                wordChance: 0,
                lifeChance: 1,
                proverbArray: [0],
                bgArray: [0, 1],
                night: true,
                music: document.getElementById("nacht")
            },
            {
                level: 7,
                sprite: document.getElementById('level4'),
                maxSpeed: 21,
                acceleration: 0.003,
                binChance: .45,
                trashChance: .95,
                wordChance: 0,
                lifeChance: 1,
                proverbArray: [0],
                bgArray: [10, 11],
                night: false,
                music: document.getElementById("kawaiisong")
            },
        ];
        this.maxLevel = this.levels.length - 1;
        this.levelSprite = this.levels[this.currentLevel].sprite;
        this.levelMusic = this.levels[this.currentLevel].music;
        this.levelProgress = this.levels[this.currentLevel].proverbArray.slice();
        this.proverbProgress = this.proverbs.list[this.currentProverb].correct.slice();
        this.currentString = this.proverbs.list[this.currentProverb].string;
    }
    Levels.prototype.update = function () {
        var lvlReady = (this.levelProgress.length == 0);
        var proverbReady = (this.proverbProgress.length == 0);
        if ((proverbReady && lvlReady) || this.nightOver) {
            this.currentProverb = 0;
            this.proverbProgress = this.proverbs.list[this.currentProverb].correct.slice();
            this.currentString = this.proverbs.list[this.currentProverb].string;
            if (this.nightOver) {
                console.log("night over");
                this.nightOver = false;
                if (this.currentLevel != this.maxLevel) {
                    this.currentLevel++;
                }
                this.switchLevel();
            }
            else {
                this.levelBreak = true;
            }
        }
        else if (proverbReady) {
            this.switchProverb();
        }
        if (this.levelBreak) {
            this.game.Spawner.binChance = 0;
            this.game.Spawner.trashChance = 0;
            this.game.Spawner.wordChance = 0;
            this.game.Spawner.lifeChance = 0;
            if (this.levelCountdown > 0) {
                this.levelCountdown--;
            }
            if (this.levelCountdown < 1) {
                if (this.currentLevel != this.maxLevel) {
                    this.currentLevel++;
                }
                this.switchLevel();
                this.levelCountdown = 300;
                this.levelBreak = false;
            }
        }
        if (this.levels[this.currentLevel].night) {
            if (this.nightCountdown > 0) {
                this.nightCountdown--;
            }
            if (this.nightCountdown < 1) {
                this.nightOver = true;
                this.nightCountdown = 600;
            }
        }
        if (this.game.dead) {
            this.currentLevel = 0;
            this.game.bgSpeed = 0;
            this.game.cloudSpeed = 0;
            this.game.Spawner.binChance = 0;
            this.game.Spawner.trashChance = 0;
            this.game.Spawner.wordChance = 0;
            this.game.Spawner.lifeChance = 0;
        }
        this.game.objSpeed += this.levels[this.currentLevel].acceleration;
        if (this.game.objSpeed > this.levels[this.currentLevel].maxSpeed)
            this.game.objSpeed = this.levels[this.currentLevel].maxSpeed;
    };
    Levels.prototype.restart = function () {
        this.currentLevel = 1;
        this.switchLevel();
        this.game.dead = false;
        this.game.lifeCount = this.game.startingLifes;
        this.game.objSpeed = this.game.startObjSpeed;
        this.game.score = 0;
        this.game.bgSpeed = 1;
        this.game.cloudSpeed = .5;
    };
    Levels.prototype.switchProverb = function () {
        this.currentProverb = this.random();
        this.proverbProgress = this.proverbs.list[this.currentProverb].correct.slice();
        this.currentString = this.proverbs.list[this.currentProverb].string;
    };
    Levels.prototype.random = function () {
        var i = Math.floor(Math.random() * this.levelProgress.length);
        var j = this.levelProgress[i];
        this.levelProgress.splice(i, 1);
        return j;
    };
    Levels.prototype.switchLevel = function () {
        this.levelMusic.pause();
        this.levelMusic.currentTime = 0;
        this.levelProgress = this.levels[this.currentLevel].proverbArray.slice();
        this.levelSprite = this.levels[this.currentLevel].sprite;
        this.switchProverb();
        this.game.Spawner.binChance = this.levels[this.currentLevel].binChance;
        this.game.Spawner.trashChance = this.levels[this.currentLevel].trashChance;
        this.game.Spawner.wordChance = this.levels[this.currentLevel].wordChance;
        this.game.Spawner.lifeChance = this.levels[this.currentLevel].lifeChance;
        this.levelMusic = this.levels[this.currentLevel].music;
        this.levelMusic.play();
    };
    return Levels;
}());
var Life = (function (_super) {
    __extends(Life, _super);
    function Life(game, height) {
        var _this = _super.call(this, game) || this;
        _this.game = game;
        _this.hspeed = _this.game.objSpeed;
        _this.x = _this.game.canvasWidth;
        _this.y = height;
        _this.width = 63;
        _this.height = 63;
        _this.Image = document.getElementById('life');
        _this.Sound = document.getElementById('Life_pickup');
        return _this;
    }
    Life.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        if (this.game.collision(this)) {
            this.alive = false;
            this.game.lifeCount++;
            var sound = document.getElementById('lifeSnd');
            sound.play();
        }
        this.game.ctx.fillStyle = "#00FFFF";
        _super.prototype.update.call(this);
    };
    return Life;
}(basicObject));
var Player = (function () {
    function Player(game) {
        var _this = this;
        this.standing = document.getElementById('raccoon');
        this.walking = document.getElementById('raccoonwalk');
        this.walking2 = document.getElementById('raccoonwalk2');
        this.jump = document.getElementById('raccoonjump');
        this.duck = document.getElementById('raccoonduck');
        this.playerImage = this.standing;
        this.animationTimer = 20;
        this.width = 153;
        this.height = 153;
        this.x = 15;
        this.jumping = false;
        this.vSpeed = 0;
        this.jumpSpeed = 30;
        this.acceleration = 3.5;
        this.gravity = -30;
        this.grounded = true;
        this.mPressed = false;
        this.mReleased = false;
        this.sound = document.getElementById('jump');
        this.jumpKey = 32;
        this.duckKey = 40;
        this.ducking = false;
        this.vulnerable = true;
        this.vulnerableCD = 120;
        this.currentVulnerableCD = this.vulnerableCD;
        this.blinkTimer = 30;
        this.game = game;
        this.y = this.game.ground - this.height;
        this.ground = this.game.ground;
        this.jumpHeight = this.ground - this.height - 250;
        this.minJumpHeight = this.ground - this.height - 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Player.prototype.update = function () {
        if (this.animationTimer > 0) {
            this.animationTimer--;
        }
        else {
            this.animationTimer = 20;
        }
        if (this.animationTimer < 10) {
            this.playerImage = this.walking;
        }
        else {
            this.playerImage = this.walking2;
        }
        if (this.game.objSpeed == 0) {
            this.playerImage = this.standing;
        }
        if (!this.vulnerable) {
            this.currentVulnerableCD--;
            if (this.blinkTimer > 0) {
                this.blinkTimer--;
                if (this.blinkTimer < 15) {
                    this.x = 15;
                }
                else {
                    this.x = -500;
                }
            }
            else {
                this.blinkTimer = 30;
            }
        }
        else {
            this.x = 15;
        }
        if (this.currentVulnerableCD < 1) {
            this.vulnerable = true;
            this.currentVulnerableCD = this.vulnerableCD;
        }
        if (this.y + this.height == this.ground)
            this.grounded = true;
        if (this.grounded) {
            this.vSpeed = 0;
            if (this.mPressed)
                this.jumping = true;
        }
        if (this.jumping && this.mReleased && this.y < this.minJumpHeight) {
            this.jumping = false;
        }
        if (this.y < this.jumpHeight) {
            this.jumping = false;
        }
        if (this.jumping) {
            this.grounded = false;
            this.vSpeed += this.acceleration;
            if (this.vSpeed > this.jumpSpeed)
                this.vSpeed = this.jumpSpeed;
            this.playerImage = this.jump;
        }
        if (!this.jumping && !this.grounded) {
            if (this.vSpeed < 10 && this.vSpeed > -10)
                this.vSpeed -= this.acceleration / 2;
            else
                this.vSpeed -= this.acceleration * 1.5;
            if (this.vSpeed < this.gravity)
                this.vSpeed = this.gravity;
        }
        this.y -= this.vSpeed;
        if (this.y > this.ground - this.height) {
            this.y = this.ground - this.height;
        }
        if (this.jumping) {
            this.playerImage = this.duck;
        }
        if (this.ducking) {
            this.playerImage = this.duck;
        }
        this.game.ctx.fillStyle = "black";
        this.game.ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
    };
    Player.prototype.onKeyDown = function (e) {
        if (e.keyCode == this.jumpKey) {
            if (this.game.dead || this.game.levelObject.currentLevel == 0) {
                this.game.levelObject.restart();
            }
            else if (!this.ducking) {
                this.mPressed = true;
                this.mReleased = false;
                this.sound.play();
            }
        }
        if (!this.game.dead && this.game.levelObject.currentLevel != 0) {
            if (e.keyCode == this.duckKey && !this.ducking && this.grounded) {
                this.height /= 2;
                this.y += this.height;
                this.ducking = true;
                var duckSound = document.getElementById('duckSnd');
                duckSound.play();
            }
        }
    };
    Player.prototype.onKeyUp = function (e) {
        if (e.keyCode == this.jumpKey) {
            this.mPressed = false;
            this.mReleased = true;
        }
        if (e.keyCode == this.duckKey && this.ducking) {
            this.y -= this.height;
            this.height *= 2;
            this.ducking = false;
        }
    };
    return Player;
}());
var Proverbs = (function () {
    function Proverbs() {
        this.list = [
            {
                string: "",
                correct: ["appel"],
                incorrect: ["banaan"]
            },
            {
                string: "Als er één ... over de dam is, volgen er meer",
                correct: ["schaap"],
                incorrect: ["geit"]
            },
            {
                string: "Er als de ... bij zijn",
                correct: ["kip"],
                incorrect: ["koe"]
            },
            {
                string: "Over ... en ... praten",
                correct: ["koe", "koegezicht"],
                incorrect: ["bloem", "bij"]
            },
            {
                string: "De .. valt niet ver van de boom",
                correct: ["appel"],
                incorrect: ["banaan"]
            },
            {
                string: "De ... uit de ... kijken",
                correct: ["kat", "boom"],
                incorrect: ["kip", "hamster"]
            },
            {
                string: "... bijten niet",
                correct: ["hond"],
                incorrect: ["kat"]
            },
            {
                string: "twee ... in één ... slaan ",
                correct: ["vlieg", "klap"],
                incorrect: ["mier", "vuist"]
            },
            {
                string: "De ... in de pot vinden",
                correct: ["hond"],
                incorrect: ["kat"]
            },
            {
                string: "als de ... van huis is, dansen de ... op tafel",
                correct: ["kat", "muis"],
                incorrect: ["hond", "rat"]
            },
            {
                string: "Als een ... in de val",
                correct: ["rat"],
                incorrect: ["muis"]
            },
            {
                string: "...-tranen huilen",
                correct: ["krokodil"],
                incorrect: ["dino"]
            },
            {
                string: "Nu komt de ... uit de mouw",
                correct: ["aap"],
                incorrect: ["muis"]
            },
            {
                string: "Men moet de huid niet verkopen voor de ... geschoten is",
                correct: ["beer"],
                incorrect: ["das"]
            },
            {
                string: "Hij is zo sterk als een ...",
                correct: ["beer"],
                incorrect: ["leeuw"]
            },
            {
                string: "Zo sluw als een ...",
                correct: ["vos"],
                incorrect: ["vis"]
            },
        ];
    }
    return Proverbs;
}());
var Test = (function () {
    function Test() {
        this.mijnvalue = true;
        this.update();
        console.log("ik ben een test");
    }
    Test.prototype.update = function () {
        console.log("doe iets");
    };
    return Test;
}());
var Word = (function () {
    function Word(game, index, fake, height) {
        this.width = 75;
        this.height = 75;
        this.fake = false;
        this.alive = true;
        this.Image = document.getElementById('appel');
        this.game = game;
        this.x = this.game.canvasWidth;
        this.y = height;
        this.hspeed = this.game.objSpeed;
        this.fake = fake;
        this.index = index;
        if (this.fake) {
            this.Image = document.getElementById(this.game.levelObject.proverbs.list[this.game.levelObject.currentProverb].incorrect[index]);
        }
        else {
            this.Image = document.getElementById(this.game.levelObject.proverbProgress[index]);
        }
    }
    Word.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        if (this.game.collision(this)) {
            this.alive = false;
            if (!this.fake) {
                this.game.levelObject.proverbProgress.splice(this.index, 1);
                this.game.score += 1000;
                var sound = document.getElementById('correctSnd');
                sound.play();
            }
            else {
                this.game.score -= 1000;
                if (this.game.score < 0) {
                    this.game.score = 0;
                }
                var sound = document.getElementById('incorrectSnd');
                sound.play();
            }
        }
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
        if (this.fake)
            this.game.ctx.fillStyle = "red";
        else
            this.game.ctx.fillStyle = "green";
        this.game.ctx.drawImage(this.Image, this.x, this.y, this.width, this.height);
    };
    return Word;
}());
//# sourceMappingURL=main.js.map