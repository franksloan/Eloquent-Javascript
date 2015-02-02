var deepEqual = function(arg1, arg2){
	var equal = true;
	console.log('start as true');
	var count = 0;
	if (typeof arg1 === 'object' && typeof arg2 === 'object' && arg1 !== null && arg2 !== null){
		for (var propName in arg1){
			console.log(propName)
			console.log(count);
			if (arg2.hasOwnProperty(propName)){
				console.log('Run func');
				deepEqual(arg1[propName], arg2[propName]);
			} else { 
				return false
			}
			count++;
		}
	} else if (arg1 === arg2) {
		equal = true;
		console.log('true so far');
	} else {
		console.log('false');
		equal = false;
	}
	return equal
};