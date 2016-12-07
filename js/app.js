function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Enemies our player must avoid
var Enemy = function(pos, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // start position for enemy
    this.step = 83*pos;
    this.x = -100;
    this.y = 60 + this.step;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 505){
        this.x += this.speed*dt;
    } else {
        this.relocate();
    }
    this.collision();
    
};
Enemy.prototype.collision = function(){
    var bug_start = this.x + 70;
    var bug_end = this.x;
    var player_x = player.x;
    var player_y = player.y;
    if(player_y == this.y && bug_start > player_x && bug_end < player_x){
        player.reset();
    }
};

Enemy.prototype.relocate = function() {
    this.x = -100;
    this.speed = getRandomInt(100, 400);
    this.y = 60 + 83*getRandomInt(0, 2);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    // start position for enemy
    this.x = 202;
    this.y = 392;
    this.step_y = 83;
    this.step_x = 101;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};

Player.prototype.update = function() {

};
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 392;
};
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if(this.x != 0){
               this.x -= this.step_x;
            }
            break;
        case 'right':
            if(this.x != 404){
               this.x += this.step_x;
            }
            break;
        case 'up':
            if(this.y != 60){
               this.y -= this.step_y;
            } else {
                this.reset();
            }
            break;
        case 'down':
            if(this.y != 392){
               this.y += this.step_y;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();
allEnemies[0] = new Enemy(getRandomInt(0, 2), getRandomInt(100, 400));
allEnemies[1] = new Enemy(getRandomInt(0, 2), getRandomInt(100, 400));
allEnemies[2] = new Enemy(getRandomInt(0, 2), getRandomInt(100, 400));
var player = new Player();
console.log(getRandomInt(100, 400));


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
