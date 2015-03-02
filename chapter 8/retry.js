function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  	// Your code here.
  	for(;;) {
	  try {
	  	var mult = primitiveMultiply(a,b);
	  	console.log('Answer is ' + mult);
	  	return;
	  } catch(e) {
	  	if(e instanceof MultiplicatorUnitFailure) {
	  		console.log("Didn't calculate this time");
	  	} else {
	  		throw e;
	  	}

	  }
	}
}

console.log(reliableMultiply(8, 8));