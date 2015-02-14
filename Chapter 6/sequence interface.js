

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

function RangeSeq(from, to) {
	this.from = from;
	this.to = to;
}

RangeSeq.prototype.next = function() {
	if(this.from <= this.to) {
		return true;
	}
	return false;
}

RangeSeq.prototype.current = function() {
	this.from++;
	return this.from - 1;
}
