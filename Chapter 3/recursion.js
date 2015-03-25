function isEven(n){
	//added line to allow negative numbers
	n = n > 0 ? n : -n;
	//
	if(n === 0){
		return true;
	} else if (n === 1){
		return false;
	} else {
		isEven(n-2);
	}
}
console.log(isEven(50)); // true
console.log(isEven(75)); // false
console.log(isEven(-4)); // true
console.log(isEven(-1)); // false