const { expect, it } = require("@jest/globals");
const dniCountries = require("../src");
const ruc = dniCountries("py", "ruc");

describe("Test PY", () => {
  it("Length validation from 6 to 9", () => {
    expect(ruc().isValid("45837")).toBeFalsy();
    expect(ruc().isValid("458376")).toBeTruthy();
    expect(ruc().isValid("3100405")).toBeTruthy();
    expect(ruc().isValid("24263907")).toBeTruthy();
    expect(ruc().isValid("500838160")).toBeTruthy();
    expect(ruc().isValid("1397072890")).toBeFalsy();
  });

  it("Has correct checksum", () => {
    expect(ruc().isValid("19202920")).toBeTruthy();
    expect(ruc().isValid("24353825")).toBeTruthy();
    expect(ruc().isValid("8465614")).toBeTruthy();
    expect(ruc().isValid("500822000")).toBeTruthy();
    expect(ruc().isValid("726367236")).toBeFalsy(); //invalid checksum
  });

  it("Has correct checksum with format or ruc number", () => {
    expect(ruc().isValid(4949765)).toBeTruthy();
    expect(ruc().isValid(54694795)).toBeTruthy();
    expect(ruc().isValid("5469479-5")).toBeTruthy();
    expect(ruc().isValid("4686123-8")).toBeTruthy;
  });

  it("Should not throw an error with letters", () => {
    expect(ruc().isValid("46sdsd8612kjads38")).toBeTruthy();
    expect(ruc().isValid("4dfdf6861ds2as33")).toBeFalsy(); //invalid checksum
    // TODO: It should return false when the letter K is not in the last position
  });

  it("Should not throw an error with a nullish value", () => {
    expect(ruc().isValid(undefined)).toBeFalsy();
    expect(ruc().isValid(null)).toBeFalsy();
    expect(ruc().isValid("")).toBeFalsy();
  });

  it("Check digit generator", () => {
    expect(ruc().getCheckDigit("4686123")).toBe(8);
    expect(ruc().getCheckDigit("4108710")).toBe(0);
    expect(ruc().getCheckDigit("2546523")).toBe(6);
  });

  it("Generator Ruc", () => {
    const ruc1 = ruc().generate();
    const ruc2 = ruc().generate();
    const ruc3 = ruc().generate();

    expect(ruc().isValid(ruc1)).toBeTruthy;
    expect(ruc().isValid(ruc2)).toBeTruthy;
    expect(ruc().isValid(ruc3)).toBeTruthy;
  });

  it("Format Ruc", () => {
    expect(ruc().format("1318039")).toBe("131803-9");
    expect(ruc().format("27029549")).toBe("2702954-9");
  });

  it("Generate a Ruc with format", () => {
    const regexValidator = /^(\d{5,8})-(\w{1})$/;
    const ruc1 = ruc({ format: true }).generate();
    const ruc2 = ruc({ format: true }).generate();
    expect(ruc1).toMatch(regexValidator);
    expect(ruc2).toMatch(regexValidator);
  });
});
