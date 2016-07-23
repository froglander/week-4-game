/* ****************************************	*/
	/* Array of character objects 				*/
	/* ****************************************	*/
	var characters = {
		
			"blackWidow" : {
				"name": "Black Widow",
				"healthPoints": 100,
				"attackPower": 10,
				"baseAttack": 10,
				"counterAttackPower": 10,
				"team": "avengers"
			},
			"captainAmerica" : {
				"name": "Captain America",
				"healthPoints": 180,
				"attackPower": 18,
				"baseAttack": 18,
				"counterAttackPower": 18,
				"team": "avengers"
			},
			"redSkull" : {
				"name": "Red Skull",
				"healthPoints": 140,
				"attackPower": 14,
				"baseAttack": 14,
				"counterAttackPower": 14,
				"team": "hydra"
			},
			"vonStrucker" : {
				"name": "Baron Von Strucker",
				"healthPoints": 160,
				"attackPower": 16,
				"baseAttack": 16,
				"counterAttackPower": 16,				
				"team": "hydra"
			},
	}
	/* ****************************************	*/
	/* JSON object containing game action		*/
	/* methods 									*/
	/* ****************************************	*/
	var gameMethods = {
		hasTarget : false,
		myCurrentHero : "",
		myCurrentTarget : "",
		/* Returns character name, requires index value */
		getCharName : function (index) {
			return characters[index].name;
		},
		/* Returns character image, requires index value */
		getCharImg : function (index) {
			return characters[index].image;
		},
		/* Creates clickable image divs */
		createCharImgDivs : function () {
			var self = this;
			$.each(characters, function (index) {
				//console.log(index);
				//console.log(characters[index].name);

				var img = $('<img>');
				img.attr('src', 'assets/images/' + index + '.png');
				img.attr('id', index);
				img.addClass("character " + characters[index].team);
				img.appendTo('#chooseCharacter');
				// var imgName = $('<div>');
				// imgName.addClass("imgOverlay");
				// console.log("imgName", imgName);
				// imgName.html(self.getCharName(index));
				// imgName.appendTo('#charImg');				
			});
		},
		chooseHero : function(myHero) {
			//var myChar = myHero;	// The image that I have clicked on		
			var self = this;
			//console.log("myHero", myHero);
			//console.log("myChar", myChar);
			this.myCurrentHero = myHero.id;
			$(myHero).remove();
			$("#yourCharacter").append(myHero);

			$("#chooseCharacter").children().each(function () {
				var yourChar = this;
				$(yourChar).removeClass("character");
				$(yourChar).addClass("enemy");
				$(yourChar).remove();
				$("#chooseEnemies").append(yourChar);
			});

			$(".enemy").on("click", function () {
				self.chooseEnemy(this);
			});
		},
		chooseEnemy : function(myEnemy) {
			var self = this;
			console.log(this.hasTarget);
			if (this.hasTarget) return;

			$(myEnemy).remove();
			$("#myTarget").append($(myEnemy).addClass("currentTarget"));
			this.hasTarget = true;

			$(".currentTarget").on("click", function () {		
				self.attackTarget(this);
			});

		},
		attackTarget : function(myTarget) {			
			//console.log("myTarget id", myTarget.id);
			//console.log("myCurrentTarget", characters[myTarget.id]);
			//this.myCurrentTarget = myTarget.id;

			

			characters[myTarget.id].healthPoints = characters[myTarget.id].healthPoints - characters[this.myCurrentHero].attackPower;
			characters[this.myCurrentHero].attackPower += characters[this.myCurrentHero].baseAttack;

			// console.log("health", characters[this.myCurrentTarget].healthPoints);
			// console.log("attack", characters[this.myCurrentHero].attackPower);

			 console.log("myCurrentTarget", characters[myTarget.id]);
			 console.log("myCurrentHero", characters[this.myCurrentHero]);

		}, 
	}

	//console.log(gameMethods.getCharImg(1));
	gameMethods.createCharImgDivs();
	//console.log("Line after createCharImgDivs");

	$(".character").on("click", function () {
		gameMethods.chooseHero(this);
	});


