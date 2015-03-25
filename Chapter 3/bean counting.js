function countBs(string) {
	var count = 0;
	for( var i = 0; i < string.length; i++) {
		if(string.charAt(i) === 'B') {
			count++
		}
	}
	return count;
}
console.log(countBs("BBC"));

function countChar(string, chr) {
	var count = 0;
	for( var i = 0; i < string.length; i++) {
		if(string.charAt(i) === chr) {
			count++
		}
	}
	return count;
}

console.log(countChar("kakkerlak", "k"));

function countBs(string) {
	return countChar(string, 'B');
}

console.log(countBs("BBC"));