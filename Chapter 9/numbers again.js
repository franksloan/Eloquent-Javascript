//[EDIT: I have since found that javascript accepts a number such as +.5]

//This is actually not strictly correct as it accepts '+' followed by '.'
var number = /^(\+|-)?(\d+(\.\d*)?|\.\d+)(e(\+|-)?\d+)?$/i;
// Tests:
["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4",
 "1e+12"].forEach(function(s) {
  if (!number.test(s))
    console.log("Failed to match '" + s + "'");
});
["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5",
 "."].forEach(function(s) {
  if (number.test(s))
    console.log("Incorrectly accepted '" + s + "'");
});
//This version means that there has to be a number before the '.',
// note the re-arrange of brackets.
var number = /^((\+|-)?\d+(\.\d*)?|\.\d+)(e(\+|-)?\d+)?$/i;
// Tests: above but with the second array containing +.1

