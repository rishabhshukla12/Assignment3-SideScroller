//<!---------------------   Name Of the Game : HanumanWars (Side Scroller) ------------------------------------------------------------>
//<!---------------------      Source File Name : game.js  -   --------------------------------------------------------->
//<!--------------------     Author's Name : Rishabh Shukla     -------------------------------------------------------->
//<!--------------------     Last Modified By : Rishabh Shukla  -------------------------------------------------------->
//<!--------------------  Date Last Modified : 2015/03/20 10:45PM ------------------------------- ---------------------->
//<!------------          Program Description : game.js file  --------------------------------------------------------->
//<!------------   Author's Github Profile :http://rishabhshukla12.github.io/Assignment3-SideScroller/  -------->
//<!----------------------------------------------------------------------------------------------------------------------->
/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="references/constants.ts" />
/// <reference path="states/gameplay.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/hanuman.ts" />
/// <reference path="objects/dragon.ts" />
/// <reference path="objects/fire.ts" />
// Global game Variables
var canvas;
var stage;
var assets;
var assetLoader;
var currentScore = 0;
var highScore = 0;
// Game State Variables
var currentState;
var currentStateFunction;
var stateChanged = false;
var gamePlay;
var gameOver;
var menu;
var instructions;
var manifest = [
    { id: "logo", src: "assets/images/logo.png" },
    { id: "shark", src: "assets/images/dragon.png" },
    { id: "fish", src: "assets/images/fire.png" },
    { id: "ocean", src: "assets/images/background.png" },
    { id: "diver", src: "assets/images/hanuman.png" },
    { id: "playButton", src: "assets/images/playButton.png" },
    { id: "tryAgainButton", src: "assets/images/tryAgainButton.png" },
    { id: "menuButton", src: "assets/images/menuButton.png" },
    { id: "instructionsButton", src: "assets/images/instructionsButton.png" },
    { id: "underwater", src: "assets/audio/hanumantrack.mp3" },
    { id: "life", src: "assets/audio/lost.wav" },
    { id: "caught", src: "assets/audio/powerup.wav" }
];
function Preload() {
    assetLoader = new createjs.LoadQueue(); // create a new preloader
    assetLoader.installPlugin(createjs.Sound); // need plugin for sounds
    assetLoader.on("complete", init, this); // when assets finished preloading - then init function
    assetLoader.loadManifest(manifest);
}
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    currentState = constants.MENU_STATE;
    changeState(currentState);
}
function gameLoop() {
    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }
}
function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            menu = new states.GameMenu();
            currentStateFunction = menu;
            break;
        case constants.PLAY_STATE:
            // instantiate game play screen
            gamePlay = new states.GamePlay();
            currentStateFunction = gamePlay;
            break;
        case constants.GAME_INSTRUCTION_STATE:
            // instantiate game play screen
            instructions = new states.GameInstruction();
            currentStateFunction = instructions;
            break;
        case constants.GAME_OVER_STATE:
            // instantiate game over screen
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;
    }
}
//# sourceMappingURL=game.js.map