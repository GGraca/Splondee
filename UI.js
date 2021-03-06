function mainMenu(){
	stage.scene = "mainMenu";

	/* BACKGROUND */
	var background = new createjs.Bitmap("res/img/backgrounds/mainMenu.png");

	/* LETTERING */

	var lettering = new createjs.Bitmap("res/img/slide-to-play.png");
	lettering.x = 200;
	lettering.y = 330;

	/* SLIDER MENU - SLIDE TO PLAY */

	var _spriteSlider = new Image();
	_spriteSlider.src = "res/img/spriteSlider.png";

	var data = {
	    images: [_spriteSlider],
	    frames: { width: 153, height: 209, count: 2},
	    animations: { normal: [0], hover: [1] }
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var slider = new createjs.Sprite(spriteSheet, "normal");
	var x_origin;
	var helper = new createjs.ButtonHelper(slider, "normal", "hover");

	slider.x = 70;
	slider.y = 300;

	slider.on("mousedown", function(evt){
		x_origin = this.x;
		this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
	});
	slider.on("pressmove", function(evt){
		this.x = evt.stageX + this.offset.x;
		update = true;
	});
	slider.on("pressup", function (evt) {
		if(this.x-x_origin>440){
			levelMenu();
		}
		else{
			this.x = x_origin;
		}
	})

	stage.addChild(background);
	stage.addChild(lettering);
	stage.addChild(slider);

	loadMenu();
	stage.update();
}

function levelMenu(){
	stage.scene = "levelMenu";
	stage.removeAllChildren();

	/* BACKGROUND */
	var background = new createjs.Bitmap("res/img/backgrounds/levelMenu.png");
	stage.addChild(background);

	/* GENERATE BUTTONS FOR EVERY LEVEL */	
	var offsetX = 130;
	var offsetY = 50;

	var buttonLevelSprite = [];
	var buttonLevelHelper = [];
	var level = 0;

	for(var a=0;a<=2;a++){
		for(var b=0;b<=2;b++){
			var _spriteLevel = new Image();
			_spriteLevel.src = "res/img/levels/level" + (level+1) + ".png";

			var data = {
			    images: [_spriteLevel],
			    frames: { width: 150, height: 150, count: 3},
			    animations: { normal: [0], blocked: [1], hover: [2] }
			};

			var spriteSheet = new createjs.SpriteSheet(data);
			buttonLevelSprite[level] = new createjs.Sprite(spriteSheet, "normal");
			buttonLevelHelper[level] = new createjs.ButtonHelper(buttonLevelSprite[level], "normal", "hover");

			buttonLevelSprite[level].x = b * 200 + offsetX;
			buttonLevelSprite[level].y = a * 150 + offsetY;

			buttonLevelSprite[level].level = level;

			buttonLevelSprite[level].on("mousedown", function(evt){
				loadLevel(this.level);
			});

			stage.addChild(buttonLevelSprite[level]);
			level++;
		}
	}

	loadMenu();
	stage.update();
}

function instructions(){
	stage.scene = "instructions";
	stage.removeAllChildren();

	/* BACKGROUND */
	var background = new createjs.Bitmap("res/img/backgrounds/instructions.png");
	stage.addChild(background);

	loadMenu();
	stage.update();
}

function loadMenu(){

	var _spriteSound = new Image();
	_spriteSound.src = "res/img/buttons/sound.png";
	var dataSound = {
	    images: [_spriteSound],
	    frames: { width: 50, height: 50, count: 4},
	    animations: { normalOFF: [0], hoverOFF: [1], normalON: [2], hoverON:[3] }
	};
	var spriteSheetSound = new createjs.SpriteSheet(dataSound);
	var buttonSpriteSound = new createjs.Sprite(spriteSheetSound, "normal");

	var helperSound = new createjs.ButtonHelper(buttonSpriteSound, "normalOFF", "hoverOFF");
	buttonSpriteSound.x = 740;
	buttonSpriteSound.y = 535;

	var toogleSound = true;
	buttonSpriteSound.on("mousedown", function(evt){
		if(toogleSound){
			helperSound.outLabel = "normalON";
			helperSound.overLabel = "hoverON";
			createjs.Sound.setVolume(0);
			toogleSound = false;
		}
		else{
			helperSound.outLabel = "normalOFF";
			helperSound.overLabel = "hoverOFF";
			createjs.Sound.setVolume(0.5);
			toogleSound = true;
		}
	});

	stage.addChild(buttonSpriteSound);

	/*********************/

	if(stage.scene=="mainMenu"){
		var _spriteInstructions = new Image();
		_spriteInstructions.src = "res/img/buttons/instructions.png";
		var dataInstructions = {
		    images: [_spriteInstructions],
		    frames: { width: 50, height: 50, count: 2},
		    animations: { normal: [0], hover: [1] }
		};		

		var spriteSheetInstructions = new createjs.SpriteSheet(dataInstructions);
		var buttonSpriteInstructions = new createjs.Sprite(spriteSheetInstructions, "normal");

		var helperInstructions = new createjs.ButtonHelper(buttonSpriteInstructions, "normal", "hover");
		buttonSpriteInstructions.x = 690;
		buttonSpriteInstructions.y = 535;

		buttonSpriteInstructions.on("mousedown", function(evt){
			instructions();
		});

		stage.addChild(buttonSpriteInstructions);
	}
	else{
		var _spriteBack = new Image();
		_spriteBack.src = "res/img/buttons/back.png";
		var dataBack = {
		    images: [_spriteBack],
		    frames: { width: 50, height: 50, count: 2},
		    animations: { normal: [0], hover: [1] }
		};

		var spriteSheetBack = new createjs.SpriteSheet(dataBack);
		var buttonSpriteBack = new createjs.Sprite(spriteSheetBack, "normal");
		
		var helperBack = new createjs.ButtonHelper(buttonSpriteBack, "normal", "hover");
		buttonSpriteBack.x = 10;
		buttonSpriteBack.y = 535;

		stage.addChild(buttonSpriteBack);

		if(stage.scene=="levelMenu"){
			buttonSpriteBack.on("mousedown", function(evt){
				mainMenu();
			});
		}
		else if(stage.scene=="instructions"){
			buttonSpriteBack.on("mousedown", function(evt){
				mainMenu();
			});
		}
		else if(stage.scene=="gameplay"){
			var _spriteTimer = new Image();

			_spriteTimer.src = "res/img/timer.png";

			var dataTimer = {
		    images: [_spriteTimer],
		    frames: { width: 200, height: 35, count: 24},
		    animations: { anim: [0, 23, "empty", 1/(map.time/24)], empty: [24]}
			};	

			var spriteSheetTimer = new createjs.SpriteSheet(dataTimer);
			var spriteTimer = new createjs.Sprite(spriteSheetTimer, "anim");
			spriteTimer.x = 290;
			spriteTimer.y = 545;
			stage.addChild(spriteTimer);

			buttonSpriteBack.on("mousedown", function(evt){
				levelMenu();
			});
		}
	}
	
}