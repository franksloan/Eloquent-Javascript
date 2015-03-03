function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Failure to match '" + s + "'");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Unexpected match for '" + s + "'");
  });
}

//car or cat
verify(/(ca)+[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

//pop and prop
verify(/p+(r?)+op/,
       ["pop culture", "mad props"],
       ["plop"]);

//ferret, ferry, ferrari
verify(/fe(r{2})+(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

//ious
verify(/ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

//whitespace character followed by a dot, comma, colon, semicolon
verify(/\s+[\.\,\:\;]/,
       ["bad punctuation ."],
       ["escape the dot"]);

//a word longer than six letters
verify(/\w{7,}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

//word without the letter e
verify(/\b[a-df-z]/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);