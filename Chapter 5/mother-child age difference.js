function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function hasKnownMother(person) {
	if (byName[person.mother] !== undefined) {
		return true;
	}
}

var knownMothers = ancestry.filter(function(person){
	return hasKnownMother(person);
});

var ages = knownMothers.map(function(person){
	return person.born - byName[person.mother].born;
})

console.log(average(ages));
