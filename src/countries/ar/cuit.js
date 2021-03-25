var { module11, getRandomNumber, clean } = require("../../helpers");

const isCuit = (c) => c instanceof Cuit;

const cuit = function (opt) {
  const options = typeof opt === "object" ? opt : {};
  return new Cuit(options);
};

class Cuit {
  constructor(opt) {
    this.opt = opt;
  }

  /**
   * Check the length of the CUIT
   * @param {String | Number} cuit
   * @returns {Boolean}
   */
  #isLengthOk(cuit) {
    return cuit.length === 11;
  }

  /**
   * Check the type of the CUIT
   * @param {String | Number} cuit
   * @returns {Boolean}
   */
  #isTypeOk = (cuit) => {
    const code = parseInt(cuit.substr(0, 2), 10);
    const validTypes = [30, 33, 34];
    return validTypes.includes(code);
  };

  /**
   * Check the sum with the modulo 11 algorithm
   * @param {String | Number} cuit
   * @returns {Boolean}
   */
  #checksumIsOk(cuit) {
    const checkDigit = this.getCheckDigit(cuit.slice(0, -1));

    return checkDigit == cuit.slice(-1);
  }

  format(cuit) {
    return cuit.replace(/^(\d{2})(\d{7,8})(\d{1})$/, "$1-$2-$3");
  }

  /**
   * Verify that a CUIT from Argentina is valid
   * @param {String | Number} cuit
   * @returns {Boolean}
   */
  isValid = function (cuit) {
    if (!cuit) return false;

    cuit = clean(cuit);
    return (
      this.#isLengthOk(cuit) && this.#isTypeOk(cuit) && this.#checksumIsOk(cuit)
    );
  };

  /**
   * It allows to obtain the check digit of a CUIT
   * @param {String} cuit
   * @returns {Number}
   */
  getCheckDigit = function (cuit) {
    if (!!cuit && cuit.length === 10) {
      const mod11 = module11(cuit);
      switch (mod11) {
        case 11:
          return 0;
        default:
          return mod11;
      }
    } else {
      return false;
    }
  };

  /**
   * Generate a random CUIT
   * @returns {String}
   */
  generate = function () {
    var cuit = Math.floor(9e7 * Math.random() + 1e7).toString();
    const types = [30, 33, 34];
    const index = getRandomNumber(0, 2);
    cuit = types[index] + cuit;
    var checkDigit = this.getCheckDigit(cuit);

    if (checkDigit === 10) {
      cuit = cuit.split("");
      cuit.splice(1, 1, "0");
      cuit = cuit.join("");

      checkDigit = this.getCheckDigit(cuit);
    }

    cuit += checkDigit;

    return this.opt.format ? this.format(cuit) : cuit;
  };
}

const proto = Cuit.prototype;
cuit.prototype = proto;
cuit.isCuit = isCuit;

module.exports = cuit;
