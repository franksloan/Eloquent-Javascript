var range = function(start, end, diff){
  var arrays = [];
  var gap = 0;
  var mult = diff;
  if (end >= start){
     gap = end - start;
  } else {
     gap = start - end;
  };
  if (mult < 0){
     mult = -mult;
  };
  gap = gap/( mult || 1);
  for(var i = 0; i < gap + 1; i++){
    arrays.push(start);
    start += diff || 1;
  };
  return arrays;
};

var sum = function(arr){
  var runTot = 0;
  
  for(var i = 0; i < arr.length; i++){
    runTot += arr[i];
    
  };
  return runTot;
};
undefined
range(101, 3, -7)
[101, 94, 87, 80, 73, 66, 59, 52, 45, 38, 31, 24, 17, 10, 3]