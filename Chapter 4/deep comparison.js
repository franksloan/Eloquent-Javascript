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

var deepEqual = function(arg1, arg2) {
	if (arg1 === arg2) {
		return true;
	} else {
		return false;
	}
}

var ob1 = {word: "Hi", a: {bis: "ho", hack: {hip: "ho", hop: "qui"}, bus: "qui"}, b: "same"};
var ob2 = {word: "Hi", a: {bis: "ho", hack: {hip: "ho", hop: "qui"}, bus: "qui"}, b: "same"};
var a = {   a:{ Name: "Stella Artois" }, 
			b:{ Name: "Corona Extra" }, 
			c:{ Name: "Leffe Blonde Leffe Brune/Brown" }, 
			d:{ Name: "Stella Artois" }, 
			e:{ Name: "Cidre Apple" }, 
			f:{ Name: "Hoegaarden" }, 
			g:{ Name: "Jupiler Modelo Especial" }, 
			h:{ Name: "Negra Modelo" }, 
			i:{ Name: "Quilmes Crystal" }, 
			j:{ Name: "Brahma Chopp Skol" }, 
			k:{ Name: "Harbin Ice" }, 
			l:{ Name: "Hertog Jan Grand Prestige" }, 
			m:{ Name: "Shock Top" }, 
			n:{ Name: "Patagnoia Weisse" }, 
			o:{ Name: "Patagonia Amber Lager" }, 
			p:{ Name: "Patagonia" }, 
			q:{ Name: "Bohemia Lager Bohemia" }, 
			r:{ Name: "Alexander Keith IPA" }, 
			s:{ Name: "Goose Island 312 Urban Wheat" }, 
			t:{ Name: "Goose Island Sofie" }, 
			u:{ Name: "Goose Island Matilda" } 
		};
var b = { 	a:{ Name: "Stella Artois" }, 
			b:{ Name: "Corona Extra" }, 
			c:{ Name: "Leffe Blonde Leffe Brune/Brown" }, 
			d:{ Name: "Stella Artois" }, 
			e:{ Name: "Cidre Apple" }, 
			f:{ Name: "Hoegaarden" }, 
			g:{ Name: "Jupiler Modelo Especial" }, 
			h:{ Name: "Negra Modelo" }, 
			i:{ Name: "Quilmes Crystal" }, 
			j:{ Name: "Brahma Chopp Skol" }, 
			k:{ Name: "Harbin Ice" }, 
			l:{ Name: "Hertog Jan Grand Prestige" }, 
			m:{ Name: "Shock Top" }, 
			n:{ Name: "Patagnoia Weisse" }, 
			o:{ Name: "Patagonia Amber Lager" }, 
			p:{ Name: "Patagonia" }, 
			q:{ Name: "Bohemia Lager Bohemia" }, 
			r:{ Name: "Alexander Keith IPA" }, 
			s:{ Name: "Goose Island 312 Urban Wheat" }, 
			t:{ Name: "Goose Island Sofie" }, 
			u:{ Name: "Goose Island Matilda" } 
		};