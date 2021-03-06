var stage, map, editor;
var srcMusic = "res/sound/music.mp3";
var srcEffect = "res/sound/soundEffect.mp3";
init();

function init(){
	stage = new createjs.Stage("myCanvas");
	stage.enableMouseOver();
	createjs.Ticker.addEventListener("tick", update);
	createjs.Ticker.setFPS(24);

	createjs.Sound.registerSound(srcMusic);
	createjs.Sound.registerSound(srcEffect);

	createjs.Sound.play(srcMusic, "none", 0, 0, -1, 0.2, 0);
 	mainMenu();
	//loadLevel(0);
}

function update(){
	if(map != null)
		map.update();
	stage.update();
}

function loadLevel(level){
	stage.scene = "gameplay";
	stage.removeAllChildren();

	map = new Map(level);
	stage.addChild(map.container);
	stage.level = level;
	if(level==0)
	{
		var tips = new createjs.Bitmap("res/img/backgrounds/tips.png");
		stage.addChild(tips);

		tips.on("mousedown", function(evt){
			stage.removeChild(tips);
		});
	}

	var _spriteFill = new Image();
	_spriteFill.src = "res/img/buttons/fill.png";
	var dataFill = {
	    images: [_spriteFill],
	    frames: { width: 150, height: 150, count: 2},
	    animations: { normal: [0], hover: [1]}
	};
	var spriteSheetFill = new createjs.SpriteSheet(dataFill);
	var buttonSpriteFill = new createjs.Sprite(spriteSheetFill, "normal");
	var helperButtonFill = new createjs.ButtonHelper(buttonSpriteFill, "normal", "hover");

	buttonSpriteFill.x = 660;
	buttonSpriteFill.y = 350;

	buttonSpriteFill.on("mousedown", function(){
		map.flow();
		createjs.Sound.play(srcEffect, "none", 0, 0, 0, 1, 0);
	});

	stage.addChild(buttonSpriteFill);
	loadMenu();
}

function gameover(){
	var dialog = new createjs.Bitmap("res/img/backgrounds/gameover.png");

	var _spriteButton = new Image();
	_spriteButton.src = "res/img/buttons/restart.png";

	var data = {
	    images: [_spriteButton],
	    frames: { width: 60, height: 60, count: 2},
	    animations: { normal: [0], hover: [1] }
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var buttonContinue = new createjs.Sprite(spriteSheet, "normal");
	var helper = new createjs.ButtonHelper(buttonContinue, "normal", "hover");
	buttonContinue.x = 680;
	buttonContinue.y = 475;

	stage.addChild(dialog);
	stage.addChild(buttonContinue);

	buttonContinue.on("mousedown", function(evt){
		loadLevel(stage.level);
	});
}

function success(){
	var dialog = new createjs.Bitmap("res/img/backgrounds/success.png");

	var _spriteButton = new Image();
	_spriteButton.src = "res/img/buttons/continue.png";

	var data = {
	    images: [_spriteButton],
	    frames: { width: 48, height: 97, count: 2},
	    animations: { normal: [1], hover: [0] }
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var buttonContinue = new createjs.Sprite(spriteSheet, "normal");
	var helper = new createjs.ButtonHelper(buttonContinue, "normal", "hover");
	buttonContinue.x=600;
	buttonContinue.y=410;

	stage.addChild(dialog);
	stage.addChild(buttonContinue);

	buttonContinue.on("mousedown", function(evt){
		loadLevel(stage.level+1);
	});
}