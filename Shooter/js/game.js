var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

//Canvas
var divArena;
var canArena;
var conArena;
var ArenaWidth = 500;
var ArenaHeight = 300;

//Background
var imgBackground;
var xBackgroundOffset = 0;
var xBackgroundSpeed = 1;
var backgroundWidth = 1782;
var backgroundHeight = 600;
var tabProjectile = new Array();

///////////////////////////////////
//Keys
var keys = {
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
};

var keyStatus = {};

function keyDownHandler(event) {
    "use strict"; 
    var keycode = event.keyCode, 
        key; 
    for (key in keys) {
        if (keys[key] === keycode) {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}
function keyUpHandler(event) {
   var keycode = event.keyCode,
            key;
    for (key in keys) 
        if (keys[key] == keycode) {
            keyStatus[keycode] = false;
        }
        
    }
///////////////////////////////////


////////////////////
// un objet Projectile
function Projectile(){
    this.x = 100;
    this.y = 100;
    this.xSpeed = 5;
    this.draw = function(){
        conArena.fillStyle = "rgb(0,200,0)";
         conArena.fillRect(this.x,this.y,10,10);
        };
    this.clear = function(){
         conArena.clearRect(this.x,this.y,10,10);
        };
    this.update = function(){
        this.x +=   this.xSpeed ;
    };
}
//var myProjectile = new Projectile();
/////////////////////////////////
// Hero Player
var player = {
    init : function(){
        this.img = new Image();
        this.img.src = "./assets/Ship/f1.png";
    },
    x : 20,
    ySpeed : 10,
    y : 100,
    height : 29,
    width : 64,
    clear : function(){
        conArena.clearRect(this.x,this.y,this.width,this.height);
    },
    update :  function(){
        var keycode;
        for (keycode in keyStatus) {
            if(keyStatus[keycode] == true){
                if(keycode == keys.UP) {     
                    this.y -= this.ySpeed;  
                    if(this.y<0) this.y=0;
                }
                if(keycode == keys.DOWN) { 
                    this.y += this.ySpeed;  
                    if(this.y>ArenaHeight-this.height) this.y=ArenaHeight-this.height;
                } 
                if(keycode == keys.SPACE) { 
                    //shoot
                    var tmp = new Projectile();
                    tabProjectile.push(tmp);
                }             
            }
            keyStatus[keycode] = false;
        }  
    },
    draw : function(){
        conArena.drawImage(this.img, 0,0,this.width,this.height, this.x,this.y,this.width,this.height);  
    }
};



function updateScene() {
    "use strict"; 
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}
function updateItems() {
    "use strict"; 
    player.update();
    tabProjectile.map(function(obj){
        obj.update();
    });
    //myProjectile.update();
}
function drawScene() {
    "use strict"; 
    canArena.style.backgroundPosition = xBackgroundOffset + "px 0px" ;
}
function drawItems() {
    "use strict"; 
    player.draw();
    tabProjectile.map(function(obj){
        obj.draw();
    });
    //myProjectile.draw();
}
function clearItems() {
    "use strict"; 
    player.clear(); 
    tabProjectile.map(function(obj){
        obj.clear();
    });
    //myProjectile.clear();
}

function updateGame() {
    "use strict"; 
    updateScene();
    updateItems();
}
function clearGame() {
    "use strict"; 
    clearItems();
}

function drawGame() {
    "use strict"; 
    drawScene();
    drawItems();    
}


function mainloop () {
    "use strict"; 
    clearGame();
    updateGame();
    drawGame();
}

function recursiveAnim () {
    "use strict"; 
    mainloop();
    animFrame( recursiveAnim );
}
 
function init() {
    "use strict";
    divArena = document.getElementById("arena");
    canArena = document.createElement("canvas");
    canArena.setAttribute("id", "canArena");
    canArena.setAttribute("height", ArenaHeight);
    canArena.setAttribute("width", ArenaWidth);
    conArena = canArena.getContext("2d");
    divArena.appendChild(canArena);
 
    player.init();
    
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

window.addEventListener("load", init, false);
