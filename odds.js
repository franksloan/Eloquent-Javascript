var arsenalPlayers = [{position: 'G', rating: 7},
						{position: 'D', rating: 7},
						{position: 'D', rating: 8},
						{position: 'D', rating: 4},
						{position: 'D', rating: 9},
						{position: 'M', rating: 9},
						{position: 'M', rating: 5},
						{position: 'M', rating: 6},
						{position: 'M', rating: 8},
						{position: 'A', rating: 9},
						{position: 'A', rating: 2}		
					];
var arsenal = {};

var sortPlayers = function(playersArr) {
	if (playersArr.length !== 11) {
		return 'You must have 11 players';
	};
	var teamName = {};
	var positions = {G: 'goalkeeper', 
		D: 'defenders', 
		M: 'midfielders', 
		A: 'attackers'};
	playersArr.forEach(function(player) {
		if (teamName[positions[player.position]] === undefined){
			if (player.position in positions) {
				teamName[positions[player.position]] = [player];
			}
		} else {
			teamName[positions[player.position]].push(player);
		}
	});
	return teamName;
};

var Form = function(won, drawn, lost, homeGames, awayGames, goalsFor, goalsAgainst) {
	this.won = won;
	this.drawn = drawn;
	this.lost = lost;
	this.homeGames = homeGames;
	this.awayGames = awayGames;
	this.goalsFor = goalsFor;
	this.goalsAgainst = goalsAgainst;
	this.winRate = function() {
		return this.won/(this.won + this.drawn + this.lost);
	};
	this.formRating = function() {
		return this.winRate() * (this.awayGames/this.homeGames);
	};
};

var aForm = new Form(3,4,1,6,7,8,7);
var bForm = new Form(1,4,4,6,5);

//called with players array (not players object);
var Team = function(form, players, home) {
	this.form = form;
	this.players = sortPlayers(players);
	this.home = home;
	//for use in positionRating scope
	var team = this;
	//function to work out the rating for each player group
	var positionRating = function(position) {
		var playerGroup = team.players[position];
		console.log(playerGroup);
		var rating = 0;
		var average = 0;
		var forOrAgainst = ((position === 'attackers') || (position === 'midfielders')) ? 'goalsFor' : 'goalsAgainst';
		if ((position === 'attackers') || (position === 'midfielders')) {
			//If attacking player - given a goal
			var goalsPerGame = (team.form['goalsFor'] + 1)/(team.form.homeGames + team.form.awayGames);
		} else {
			//Fraction is upside down as goals conceded is bad
			var goalsPerGame = (team.form.homeGames + team.form.awayGames)/(team.form['goalsAgainst'] + 1);
		}
		for(var player in playerGroup) {
			rating += playerGroup[player].rating;
		};
		average = rating/playerGroup.length;
		return average * goalsPerGame;
	};
	this.goal = positionRating('goalkeeper');
	this.defence = positionRating('defenders');
	this.midfield = positionRating('midfielders');
	this.attack = positionRating('attackers');
};

var equal = true;
var deepEqual = function(arg1, arg2){
	if (arg1 === arg2) {
		// equal = true;
		console.log(arg1 + ' = ' + arg2 + ' is ' + equal);
		return equal;
	} else if (typeof arg1 === 'object' && typeof arg2 === 'object' && arg1 !== null && arg2 !== null){
		for (var propName in arg1) {
			
			if (arg2.hasOwnProperty(propName)){
				console.log('Comparing: ' + arg1[propName] + ' and ' + arg2[propName]);
				deepEqual(arg1[propName], arg2[propName]);
			} else {
				console.log('No property for ' + propName + ' in ' + arg2);
				equal = false;
				return equal;
			};
		}
	} else {
		equal = false;
		console.log(arg1 + ' = ' + arg2 + ' is ' + equal);
		return equal;
	}
	return equal;
};

var decimalToFraction = function(input) {
	var wholeNum = Math.floor(input);
	var decimals = input - wholeNum;
	var denominator = 1000;
	//numerator as whole number
	var numerator = Math.round(decimals * denominator);
	// try and reduce the numerator and denominator by dividing by a common factor
	for(var i = 2; i <= numerator; i++) {
		if ((numerator % i === 0) && (denominator % i === 0)) {
			numerator = numerator/i;
			denominator = denominator/i;
			i = 1;
		};
	}
	var numerator = numerator + (wholeNum * denominator);
	return numerator.toString() + '/' + denominator.toString();
};

var matchOdds = function(team1, team2) {
	var sameTeam = deepEqual(team1, team2);
	console.log(sameTeam);
	
	if (sameTeam) {
		console.log('These teams are either the same teams or they are a perfect match');
	} else if (team1.home === team2.home) {
		console.log('One team must be at home and one team must be away');
	} else {
		var attAdv1 = team1.attack + (0.5 * team1.midfield) - team2.defence - (1.2 * team2.goal);
		var attAdv2 = team2.attack + (0.5 * team2.midfield) - team1.defence - (1.2 * team1.goal);
		var midVsMid = team1.midfield / team2.midfield;
		//if a team's midfield is better than the others it can help attack
		//this will increase advantage but if worse - midfield must defend
		//this will worsen the attacking advantage
		var playerTeam = (addAdv1 * midVsMid) - (attAdv2 / midVsMid);
		//the form rating of each team may make the better side even stronger
		//but if better team is not in form, the game may be more even
		var formH2H = team1.form.formRating() / team2.form.formRating();
	}
	console.log(formH2H);
};

