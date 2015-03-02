function Vector(x, y) {
	this.x = x;
	this.y = y;
};


Vector.prototype.plus = function(a, b) {
	return new Vector(this.x + a, this.y + b);
};

Vector.prototype.minus = function(a, b) {
	return new Vector(this.x - a, this.y - b);
};

Object.defineProperty(Vector.prototype, "length", {
	get: function() { return Math.sqrt(this.x*this.x + this.y*this.y)}
});