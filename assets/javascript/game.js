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
				"name": "Von Strucker",
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
		/* Creates clickable image divs */
		createCharImgDivs : function () {
			var self = this;
			$.each(characters, function (index) {
				var div = $('<div>').addClass("image character").attr('id', index);
				var img = $('<img>').attr('src', 'assets/images/' + index + '.png').addClass(characters[index].team);

				img.appendTo(div);
				$('<h3>').html(characters[index].name + "<br />" + characters[index].healthPoints).appendTo(div);
				div.appendTo('#chooseCharacter');				
			});
		},
		chooseHero : function(myHero) {			
			var self = this;

			this.myCurrentHero = myHero.id;
			$(myHero).remove();
			$("#selectChar").hide();
			$("#currentHeroStats").show();

			$("#heroHealth").html(characters[this.myCurrentHero].healthPoints);
			$("#heroAttack").html(characters[this.myCurrentHero].attackPower);

			$("#yourChar, #availEnemies").show();
			$("#yourCharacter").append(myHero);

			$("#chooseCharacter").children().each(function () {
				var yourChar = this;
				$(yourChar).removeClass("character").addClass("enemy").remove();
				$("#chooseEnemies").append(yourChar);
			});

			$(".enemy").on("click", function () {
				self.chooseEnemy(this);
			});
		},
		chooseEnemy : function(myEnemy) {
			var self = this;
			
			if (this.hasTarget) return;			

			$(myEnemy).remove();
			$("#curTarget").show();

			$("#myTarget").append($(myEnemy).addClass("currentTarget"));
			this.hasTarget = true;

			$(".currentStats").show();
			$("#targetHealth").html(characters[myEnemy.id].healthPoints);
			$("#targetAttack").html(characters[myEnemy.id].attackPower);

			$(".currentTarget").on("click", function () {		
				self.attackTarget(this);
			});

		},
		attackTarget : function(myTarget) {	
			characters[myTarget.id].healthPoints = characters[myTarget.id].healthPoints - characters[this.myCurrentHero].attackPower;
			characters[this.myCurrentHero].attackPower += characters[this.myCurrentHero].baseAttack;
			characters[this.myCurrentHero].healthPoints -= characters[myTarget.id].counterAttackPower;

			
			$("#targetHealth").html(characters[myTarget.id].healthPoints);
			$("#targetAttack").html(characters[myTarget.id].attackPower);

			$("#heroHealth").html(characters[this.myCurrentHero].healthPoints);
			$("#heroAttack").html(characters[this.myCurrentHero].attackPower);

			if(characters[myTarget.id].healthPoints <= 0 && characters[this.myCurrentHero].healthPoints > 0) {
				$("#gameStatus").html("Good job you beat " + characters[myTarget.id].name);
				$(myTarget).removeClass("currentTarget").remove();
				$(".currentStats").hide();
				this.hasTarget = false;
			} else if (characters[myTarget.id].healthPoints > 0 && characters[this.myCurrentHero].healthPoints <= 0) {
				$("#gameStatus").html("Oh no! " + characters[myTarget.id].name + " beat you!");
				$(myTarget).removeClass("currentTarget").remove();
				$(".currentStats").hide();
			}

		}, 
	}

	gameMethods.createCharImgDivs();
	
	$(".character").on("click", function () {
		gameMethods.chooseHero(this);
	});


