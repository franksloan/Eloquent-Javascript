//get http dependency
var http = require('http');

//request the initial challenge
http.get("http://aerial-valor-93012.appspot.com/challenge", function(res){
	
	var parts = [];
	//as data comes through add it to array
	res.on('data', function(part){
		parts.push(part);
	}).on('end', function() {
		//put all the buffers together into a JS
    	var body = JSON.parse(Buffer.concat(parts));
    	//initialise 
    	var total = 0;
    	//add up 'values' in the object
    	for(var i = 0; i < body.values.length; i++){
    		total += body.values[i];
    	}
    	//send new request to retrieve the answer
    	http.get("http://aerial-valor-93012.appspot.com/challenge/"+
    		body.token+"/"+total,
    		function(res){
    			//repeat same process of getting buffer data 
    			parts = [];
    			res.on('data', function(part){
    				parts.push(part);
    			}).on('end', function() {
    				var body = JSON.parse(Buffer.concat(parts));
    				//finally log out the answer
    				console.log(body.answer);
    			});
    		});
    });
    //
}).on('error', function(e){
	console.log(e);
});