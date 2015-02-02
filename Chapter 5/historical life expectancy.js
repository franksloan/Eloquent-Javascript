var ancestry = JSON.parse(ancestry);

//Define the the object
var agesInEachCent = {};
//Look through every person in the array and find the century died in
//Then categorise them into groups for each of these centuries 
ancestry.forEach(function(person) {
  var centuryDied = Math.ceil(person.died / 100);
  if (agesInEachCent[centuryDied] === undefined){
    agesInEachCent[centuryDied] = [person];
  } else {
    agesInEachCent[centuryDied].push(person);
  }
});

//
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
};

function avAge(ob) {
  for (var ageGroup in ob) {
    console.log(average(ob[ageGroup].map( function(person) {
      return person.died - person.born;
    }));
  }
};

avAge(agesInEachCent);

// For bonus points group by function
// very similar to original grouping just that it can be applied now to different objects
// which get passed in as groupsName, the groupFunc is how to work out
// which group to give that object to
var agesInEachCentury = {};
function groupBy(array, groupFunc, groupsName) {
  array.forEach(function(index){
    var groupName = groupFunc(index);
    if (groupsName[groupName] === undefined) {
      groupsName[groupName] = [index];
    } else {
      groupsName[groupName].push(index);
    }
  });
};

groupBy(ancestry, function(person) {
  return Math.ceil(person.died / 100)
}, agesInEachCentury);

