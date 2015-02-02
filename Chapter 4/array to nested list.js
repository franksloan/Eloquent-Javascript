//List constructor for use in arrayToList abd prepend
function listOb (value, rest) {
		this.value = value;
    	this.rest = rest;
}

var arrayToList = function(arr){
	
    var ob = new listOb(arr[(arr.length) - 1 ], null);
    for (var i = 1; i < arr.length; i++) {
        ob = new listOb(arr[(arr.length) - 1 - i], ob);
    };
    return ob;
};

var listToArray = function(list){
	var arrOfList = [];
	for (var node = list; node; node = node.rest){
		arrOfList.push(node.value);
	}
	return arrOfList;
};

var prepend = function(preVal, list){
	var preOb = new listOb(preVal, list);
};

var nth = function(list, n){
	var nthVal;
	for (var i = n; i > 0; i--){
		nthVal = list.value
		list = list.rest;
	};
	return nthVal;
};