function pad(n) {
  n = parseInt(n); //ex. if already passed '05' it will be converted to number 5
  var ret = n > 9 ? "" + n : "0" + n;
  return ret;
}

export { pad };
