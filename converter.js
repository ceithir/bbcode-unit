function convert(text) {
  text = text.replace(/\s+/g, "");
  text = text.replace(/([0-9]+),([0-9]{3})/g, "$1$2");
  text = text.replace(/,/g, ".");

  var matches;

  matches = text.match(/^([0-9]+(\.[0-9]+)?)((c)?m)$/);
  if (matches !== null) {
    var value = parseFloat(matches[1]);
    var unit = matches[3];
    if (unit === "m" && value >= 100) {
      return convert(value / 1000 + "km");
    }
    var multiplier = (function () {
      if (unit === "m") {
        return 100;
      }
      return 1;
    })();
    var cmHeight = value * multiplier;
    var feet = Math.floor(cmHeight / 30.48);
    var inches = Math.round((cmHeight - feet * 30.48) / 2.54);
    return feet + "' " + inches + '"';
  }

  matches = text.match(/^([0-9]+)m([0-9]+)?$/);
  if (matches !== null) {
    return convert(matches[1] + "." + (matches[2] || 0) + "m");
  }

  matches = text.match(/^([0-9]+)'([0-9]+)"?$/);
  if (matches !== null) {
    var feet = parseInt(matches[1]);
    var inches = parseInt(matches[2]);
    return Math.round(feet * 30.48 + inches * 2.54) + " cm";
  }

  matches = text.match(/^([0-9]+(\.[0-9]+)?)°?C$/);
  if (matches !== null) {
    var celsius = parseFloat(matches[1]);
    return ((celsius * 9) / 5 + 32).toFixed(2) + "°F";
  }

  matches = text.match(/^([0-9]+(\.[0-9]+)?)°?F$/);
  if (matches !== null) {
    var fahrenheit = parseFloat(matches[1]);
    return (((fahrenheit - 32) * 5) / 9).toFixed(2) + "°C";
  }

  matches = text.match(/^([0-9]+(\.[0-9]+)?)mi(\.|les)?$/);
  if (matches !== null) {
    var miles = parseFloat(matches[1]);
    return (miles * 1.609344).toFixed(2) + " km";
  }

  matches = text.match(/^([0-9]+(\.[0-9]+)?)km$/);
  if (matches !== null) {
    var km = parseFloat(matches[1]);
    return (km / 1.609344).toFixed(2) + " miles";
  }

  return null;
}
module.exports = convert;
