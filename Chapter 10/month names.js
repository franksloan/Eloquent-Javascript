var month = function() {
	var names = ['January', 'February', 'March', 'April', 'May',
				'June', 'July', 'August', 'September','October',
				'November','December'];
	return {
		name: function(index) {
			return names[index];
		},
		number: function(month) {
			return names.indexOf(month);
		}
	};
}();
console.log(month.name(2));
console.log(month.number('May'));