var reverseArray = function(arr){
    var revArr = [];
    for (var i = 0; i < arr.length; i++){
       revArr.push(arr[arr.length - i - 1]);
    };
    return revArr;
};

var reverseArrayInPlace = function(arr){
    var ob;
    for (var i = 0; i < arr.length; i++){
       ob = arr.splice(arr.length - 1 - i,1);
       arr.push(ob);
    };
    return "Array: " + arr;   
};