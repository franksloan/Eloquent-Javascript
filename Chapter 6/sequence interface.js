

function ArraySeq(array) {
	this.array = array;
	this.now = 0;
}

ArraySeq.prototype.next = function() {
	if(this.array.length - this.now > 1) {
		return true;
	}
	return false;
}

ArraySeq.prototype.current = function() {
	this.now++;
	return this.array[this.now - 1];
}

function logFive(sequence) {
	for( var i = 0; i < 5 && sequence.next() ; i++) {
		console.log(sequence);
		console.log(sequence.current());
				
	}	
}
