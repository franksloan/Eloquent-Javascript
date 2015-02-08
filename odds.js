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
						{position: 'A', rating: 8}		
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

var Team = function(form, players, home) {
	this.form = form;
	this.players = sortPlayers(players);
	this.home = home;
	//for use in positionRating scope
	var team = this;
	//function to work out the rating for each player group
	var positionRating = function(position) {
		var playerGroup = team.players[position];
		var rating = 0;
		var average = 0;
		var forOrAgainst = (position == ('attackers' || 'midfielders')) ? 'goalsFor' : 'goalsAgainst';
		var goalsPerGame = team.form[forOrAgainst]/
			(team.form.homeGames + team.form.awayGames);
		for(var player in playerGroup) {
			rating += playerGroup[player].rating;
		};
		average = rating/playerGroup.length;
		return average * goalsPerGame;
	};
	this.defence2 = function() {
		var defenders = this.players.defenders;
		var rating = 0;
		var average = 0;
		var goalsPerGame = this.form.goalsAgainst/
			(this.form.homeGames + this.form.awayGames);
		for(var defender in defenders) {
			rating += defenders[defender].rating;
		};
		average = rating/defenders.length;
		return average * goalsPerGame;
	};
	this.defence = positionRating('defenders');
	this.attack = positionRating('attackers');
};

var aTeam = new Team(aForm, "Hi", true);
var bTeam = new Team(bForm, "Hi", false);

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

var matchOdds = function(team1, team2) {
	var sameTeam = deepEqual(team1, team2);
	console.log(sameTeam);
	
	if (sameTeam) {
		console.log('These teams are either the same teams or they are a perfect match');
	} else if (team1.home === team2.home) {
		console.log('One team must be at home and one team must be away');
	} else {
		var formH2H = team1.form.formRating() / team2.form.formRating();
	}
	console.log(formH2H);
};

