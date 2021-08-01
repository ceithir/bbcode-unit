function convert(text) {
  var matches;

  matches = text.match(/([0-9]+)\s*cm/);
  if (matches !== null) {
    var cmHeight = parseInt(matches[1]);
    var feet = Math.floor(cmHeight / 30.48);
    var inches = Math.round((cmHeight - feet * 30.48) / 2.54);
    return feet + "' " + inches + '"';
  }

  matches = text.match(/([0-9]+)'\s*([0-9]+)"/);
  if (matches !== null) {
    var feet = parseInt(matches[1]);
    var inches = parseInt(matches[2]);
    return Math.round(feet * 30.48 + inches * 2.54) + "cm";
  }

  return text;
}
module.exports = convert;
