function and(a, b) {
  return a && b;
}
function or3(a, b, c) {
  return a || b || c;
}
function not(a) {
  return !a;
}
function xor(a, b) {
  return (a && !b) || (!a && b);
}
function and3(a, b, c) {
  return a && b && c;
}
function eq(a, b) {
  return a == b;
}

function expr(arr) {
  const a = arr[0];
  const b = arr[1];
  const c = arr[2];
  const d = arr[3];
  console.log(a,b,c,d);
  if ((and(not(a), not(b)))) {
    console.log("1");
    return true;
  }
  if ((and(xor(a, b), eq(a, c)))) {
    console.log("2");
    return true;
  }
  if ((and3(a, b, eq(c, d)))) {
    console.log("3");
    return true;
  }
  console.log("4");
  return false;
  // return or3(
  //   (and(not(a), not(b))),
  //   (and(xor(a, b), eq(a, c))),
  //   (and3(a, b, eq(c, d)))
  // );
}

function createVals(num) {
  if (num == 1) {
    return [[0], [1]];
  }
  let vals = [];
  let shorter = createVals(num - 1);
  for (i = 0; i < Math.pow(2, num); i++) {
    let lead = (i < Math.pow(2, num - 1) ? 0 : 1);
    vals.push([lead].concat(shorter[(i % Math.pow(2, num - 1))]));
  }
  return vals;
}

function valuation(num, fun) {
  return createVals(num).map(fun);
}

 
console.log(valuation(4, expr));