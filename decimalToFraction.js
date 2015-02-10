//There may be a more concise way of doing this
//but I thought this was quite nice
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

decimalToFraction(0.368);