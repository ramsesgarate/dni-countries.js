var { modulePy, clean } = require("../../helpers");

const isRuc = (r) => r instanceof Ruc;

const ruc = function (opt) {
  const options = typeof opt === "object" ? opt : {};
  return new Ruc(options);
};

class Ruc {
  constructor(opt) {
    this.opt = opt;
  }

  /**
   * Check the length of the Ruc
   * @param {String} ruc
   * @returns {Boolean}
   */
  #isLengthOk(ruc) {
    return ruc.length >= 6 && ruc.length <= 9;
  }

  /**
   * Check the sum with the module paraguay algorithm
   * @param {String} ruc
   * @returns {Boolean}
   */
  #checksumIsOk(ruc) {
    const checkDigit = this.getCheckDigit(ruc.slice(0, -1));

    return checkDigit == ruc.slice(-1);
  }

  format(ruc) {
    return ruc.replace(/^(\d{5,8})(\w{1})$/, "$1-$2");
  }

  /**
   * Verify that a Chilean RUC is valid
   * @param {String} ruc
   * @returns {Boolean}
   */
  isValid(ruc) {
    if (!ruc) return false;

    ruc = clean(ruc);
    return this.#isLengthOk(ruc) && this.#checksumIsOk(ruc);
  }

  /**
   * It allows to obtain the check digit of a RUC
   * @param {String} ruc
   * @returns {Number}
   */
  getCheckDigit(ruc) {
    if (!!ruc && ruc.length >= 5 && ruc.length <= 8) {
      const mod11 = modulePy(ruc);
      switch (mod11) {
        case 11:
        case 10:
          return 0;
        default:
          return mod11;
      }
    } else {
      return false;
    }
  }

  /**
   * Generate a random RUC
   * @returns {String}
   */
  generate() {
    var ruc = Math.floor(1e7 * Math.random() + 1e5).toString();
    ruc += this.getCheckDigit(ruc);
    return this.opt.format ? this.format(ruc) : ruc;
  }
}

const proto = Ruc.prototype;
ruc.prototype = proto;
ruc.isRuc = isRuc;

module.exports = ruc;
