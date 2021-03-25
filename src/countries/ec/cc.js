var { module10, clean, getRandomNumber } = require("../../helpers");

const isCC = (r) => r instanceof CC;
const cleanRegex = /[^0-9]+/g;

const cc = function (opt) {
  const options = typeof opt === "object" ? opt : {};
  return new CC(options);
};

class CC {
  constructor(opt) {
    this.opt = opt;
  }

  /**
   * Check the length of the CC
   * @param {String} cc
   * @returns {Boolean}
   */
  #isLengthOk(cc) {
    return cc.length === 10;
  }

  /**
   * Check the sum with the module 10 algorithm
   * @param {String} cc
   * @returns {Boolean}
   */
  #checksumIsOk(cc) {
    const checkDigit = this.getCheckDigit(cc.slice(0, -1));

    return checkDigit == cc.slice(-1);
  }

  #isValidProvinceCode(cc) {
    let provinceCode = parseInt(cc.substring(0, 2));

    return provinceCode >= 1 && provinceCode <= 24;
  }

  format(cc) {
    return cc.replace(/^(\d{9})(\w{1})$/, "$1-$2");
  }

  /**
   * Verify that a Ecuador CC is valid
   * @param {String} cc
   * @returns {Boolean}
   */
  isValid(cc) {
    if (!cc) return false;

    cc = clean(cc, cleanRegex);

    return (
      this.#isLengthOk(cc) &&
      this.#isValidProvinceCode(cc) &&
      this.#checksumIsOk(cc)
    );
  }

  /**
   * It allows to obtain the check digit of a CC
   * @param {String} cc
   * @returns {Number}
   */
  getCheckDigit(cc) {
    if (!!cc && cc.length === 9) {
      const mod10 = module10(cc);

      switch (mod10) {
        case 10:
          return 0;
        default:
          return mod10;
      }
    } else {
      return false;
    }
  }

  /**
   * Generate a random CC
   * @returns {String}
   */
  generate() {
    var consecutiveDigits = Math.floor(9e5 * Math.random() + 1e5).toString();
    var provinceCode = getRandomNumber(1, 24);
    var thirdDigit = getRandomNumber(0, 5);
    provinceCode = provinceCode < 10 ? `0${provinceCode}` : provinceCode;

    var cc = `${provinceCode}${thirdDigit}${consecutiveDigits}`;
    cc += this.getCheckDigit(cc);

    return this.opt.format ? this.format(cc) : cc.toString();
  }
}

const proto = CC.prototype;
cc.prototype = proto;
cc.isCC = isCC;

module.exports = cc;
