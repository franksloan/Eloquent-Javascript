function every(array, fnc) {
	for (var i = 0; i < array.length; i++){
		if ( fnc(array[i]) === false) {
			return false;
		}
	}
	return true;
};

function some(array, fnc) {
	for (var i = 0; i < array.length; i++){
		if ( fnc(array[i]) === true) {
			return true;
		}
	}
	return false;
};