var { module11, getRandomNumber, clean } = require("../../helpers");

const isCuil = (c) => c instanceof Cuil;

const cuil = function (opt) {
  const options = typeof opt === "object" ? opt : {};
  return new Cuil(options);
};

class Cuil {
  constructor(opt) {
    this.opt = opt;
  }

  /**
   * Check the length of the CUIL
   * @param {String | Number} cuil
   * @returns {Boolean}
   */
  #isLengthOk(cuil) {
    return cuil.length === 11;
  }

  /**
   * Check the type of the CUIL
   * @param {String | Number} cuil
   * @returns {Boolean}
   */
  #isTypeOk = (cuil) => {
    const code = parseInt(cuil.substr(0, 2), 10);
    const validTypes = [20, 23, 24, 27];
    return validTypes.includes(code);
  };

  /**
   * Check the sum with the modulo 11 algorithm
   * @param {String | Number} cuil
   * @returns {Boolean}
   */
  #checksumIsOk(cuil) {
    const checkDigit = this.getCheckDigit(cuil.slice(0, -1));

    return checkDigit == cuil.slice(-1);
  }

  format(cuil) {
    return cuil.replace(/^(\d{2})(\d{7,8})(\d{1})$/, "$1-$2-$3");
  }

  /**
   * Verify that a CUIL from Argentina is valid
   * @param {String | Number} cuil
   * @returns {Boolean}
   */
  isValid = function (cuil) {
    if (!cuil) return false;

    cuil = clean(cuil);
    return (
      this.#isLengthOk(cuil) && this.#isTypeOk(cuil) && this.#checksumIsOk(cuil)
    );
  };

  /**
   * It allows to obtain the check digit of a Cuil
   * @param {String} cuil
   * @returns {Number}
   */
  getCheckDigit = function (cuil) {
    if (!!cuil && cuil.length === 10) {
      const mod11 = module11(cuil);
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
   * Generate a random CUIL
   * @returns {String}
   */
  generate = function () {
    var cuil = Math.floor(9e7 * Math.random() + 1e7).toString();
    const types = [20, 23, 24, 27];
    const index = getRandomNumber(0, 3);
    cuil = types[index] + cuil;
    var checkDigit = this.getCheckDigit(cuil);

    if (checkDigit === 10) {
      cuil = cuil.split("");
      cuil.splice(1, 1, "3");
      cuil = cuil.join("");

      checkDigit = this.getCheckDigit(cuil);
    }

    cuil += checkDigit;

    return this.opt.format ? this.format(cuil) : cuil;
  };
}

const proto = Cuil.prototype;
cuil.prototype = proto;
cuil.isCuil = isCuil;

module.exports = cuil;
