function flatten(arr){
	arr.reduce(function(a,b){
		return a.concat(b);
	}, []);
};
var arrays = [[1,2,3],[4,5],[6,7],[8,9]];

console.log(flatten(arrays));
