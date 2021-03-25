var { module11, clean } = require("../../helpers");

const isRut = (r) => r instanceof Rut;

const cleanRegex = /^0+|[^0-9kK]+/g;

const rut = function (opt) {
  const options = typeof opt === "object" ? opt : {};
  return new Rut(options);
};

class Rut {
  constructor(opt) {
    this.opt = opt;
  }

  /**
   * Check the length of the RUT
   * @param {String} rut
   * @returns {Boolean}
   */
  #isLengthOk(rut) {
    return rut.length >= 7 && rut.length <= 9;
  }

  /**
   * Check the sum with the module 11 algorithm
   * @param {String} rut
   * @returns {Boolean}
   */
  #checksumIsOk(rut) {
    const checkDigit = this.getCheckDigit(rut.slice(0, -1));

    return checkDigit == rut.slice(-1);
  }

  format(rut) {
    return rut.replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, "$1.$2.$3-$4");
  }

  /**
   * Verify that a Chilean RUT is valid
   * @param {String} rut
   * @returns {Boolean}
   */
  isValid(rut) {
    if (!rut) return false;

    rut = clean(rut, cleanRegex);
    return this.#isLengthOk(rut) && this.#checksumIsOk(rut);
  }

  /**
   * It allows to obtain the check digit of a rut
   * @param {String} rut
   * @returns {Number}
   */
  getCheckDigit(rut) {
    if (!!rut && rut.length >= 6 && rut.length <= 8) {
      const mod11 = module11(rut);
      switch (mod11) {
        case 11:
          return 0;
        case 10:
          return "K";
        default:
          return mod11;
      }
    } else {
      return false;
    }
  }

  /**
   * Generate a random RUT
   * @returns {String}
   */
  generate() {
    var rut = Math.floor(2e7 * Math.random() + 1e6).toString();
    rut += this.getCheckDigit(rut);
    return this.opt.format ? this.format(rut) : rut;
  }
}

const proto = Rut.prototype;
rut.prototype = proto;
rut.isRut = isRut;

module.exports = rut;
