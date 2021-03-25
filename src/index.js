var ar = require("./countries/ar");
var cl = require("./countries/cl");
var ec = require("./countries/ec");
var py = require("./countries/py");

function dni(country, dniType) {
  country = country.toUpperCase();

  switch (country) {
    case "AR":
      return ar[dniType];
    case "CL":
      return cl[dniType];
    case "EC":
      return ec[dniType];
    case "PY":
      return py[dniType];
  }
}

module.exports = dni;
