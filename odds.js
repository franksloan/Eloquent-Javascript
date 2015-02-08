var Players = function(goal, lBack, rBack, cDefence1, cDefence2) {
	this.goal = goal;
	this.lBack = lBack;
	this.rBack = rBack;
	this.cDefence1 = cDefence1;
	this.cDefence2 = cDefence2;
	this.defence = function() {
		return (this.cDefence1 + this.cDefence2) + 0.8*(this.lBack + this.rBack);
	}
};

var Form = function(won, drawn, lost, homeGames, awayGames) {
	this.won = won;
	this.drawn = drawn;
	this.lost = lost;
	this.homeGames = homeGames;
	this.awayGames = awayGames;
	this.winRate = function() {
		return this.won/(this.won + this.drawn + this.lost);
	};
	this.formRating = function() {
		return this.winRate() * (this.awayGames/this.homeGames);
	};
};

var aForm = new Form(3,4,1,6,7);
var bForm = new Form(1,4,4,6,5);

var Team = function(form, players, home) {
	this.form = form;
	this.players = players;
	this.home = home;
	
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
	if (team1.home === team2.home) {
		console.log('One team must be at home and one team must be away');
	} else if (sameTeam) {
		console.log('These teams are either the same teams or they are a perfect match');
	} else {
		var formH2H = team1.form.formRating() / team2.form.formRating();
	}
	console.log(formH2H);
};

