const { expect, it } = require("@jest/globals");
const dniCountries = require("../src");
const rut = dniCountries("cl", "rut");

describe("Test CL", () => {
  it("Length validation from 7 to 9", () => {
    expect(rut().isValid("458376")).toBeFalsy();
    expect(rut().isValid("5698154")).toBeTruthy();
    expect(rut().isValid("50701344")).toBeTruthy();
    expect(rut().isValid("222896304")).toBeTruthy();
    expect(rut().isValid("1397072890")).toBeFalsy();
  });

  it("Has correct checksum", () => {
    expect(rut().isValid("231513388")).toBeTruthy();
    expect(rut().isValid("6682246k")).toBeTruthy();
    expect(rut().isValid("63413410")).toBeTruthy();
    expect(rut().isValid("726367236")).toBeFalsy(); //invalid checksum
  });

  it("Has correct checksum with format or rut number", () => {
    expect(rut().isValid(231513388)).toBeTruthy();
    expect(rut().isValid(63413410)).toBeTruthy();
    expect(rut().isValid("6.682.246-k")).toBeTruthy();
    expect(rut().isValid("19.482.085-2")).toBeTruthy;
  });

  it("Should not throw an error with letters", () => {
    expect(rut().isValid("19as417sd597sa3")).toBeTruthy();
    expect(rut().isValid("23msd7323ndf323")).toBeFalsy(); //invalid checksum
    // TODO: It should return false when the letter K is not in the last position
  });

  it("Should not throw an error with a nullish value", () => {
    expect(rut().isValid(undefined)).toBeFalsy();
    expect(rut().isValid(null)).toBeFalsy();
    expect(rut().isValid("")).toBeFalsy();
  });

  it("Check digit generator", () => {
    expect(rut().getCheckDigit("18178749")).toBe("K");
    expect(rut().getCheckDigit("6341341")).toBe(0);
    expect(rut().getCheckDigit("14123663")).toBe(6);
  });

  it("Generator Rut", () => {
    const rut1 = rut().generate();
    const rut2 = rut().generate();
    const rut3 = rut().generate();

    expect(rut().isValid(rut1)).toBeTruthy;
    expect(rut().isValid(rut2)).toBeTruthy;
    expect(rut().isValid(rut3)).toBeTruthy;
  });

  it("Format Rut", () => {
    expect(rut().format("194615574")).toBe("19.461.557-4");
    expect(rut().format("64195352")).toBe("6.419.535-2");
  });

  it("Generate a Rut with format", () => {
    const regexValidator = /^(\d{1,2}).(\d{3}).(\d{3})-(\w{1})$/;
    const rut1 = rut({ format: true }).generate();
    const rut2 = rut({ format: true }).generate();

    expect(rut1).toMatch(regexValidator);
    expect(rut2).toMatch(regexValidator);
  });
});
