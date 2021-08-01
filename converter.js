function convert(text) {
  var matches;

  matches = text.match(/^\s*([0-9])+m\s*([0-9]+)?\s*$/);
  if (matches !== null) {
    return convert(matches[1] + "." + (matches[2] || 0) + "m");
  }

  matches = text.match(/^\s*([0-9]+(\.[0-9]+)?)\s*((c)?m)\s*$/);
  if (matches !== null) {
    var unit = matches[3];
    var multiplier = (function () {
      if (unit === "m") {
        return 100;
      }
      return 1;
    })();
    var cmHeight = parseFloat(matches[1]) * multiplier;
    var feet = Math.floor(cmHeight / 30.48);
    var inches = Math.round((cmHeight - feet * 30.48) / 2.54);
    return feet + "' " + inches + '"';
  }

  matches = text.match(/^\s*([0-9]+)'\s*([0-9]+)"?\s*$/);
  if (matches !== null) {
    var feet = parseInt(matches[1]);
    var inches = parseInt(matches[2]);
    return Math.round(feet * 30.48 + inches * 2.54) + "cm";
  }

  return text;
}
module.exports = convert;
