const { expect, it } = require("@jest/globals");
const dniCountries = require("../src");
const cc = dniCountries("ec", "cc");

describe("Test EC", () => {
  it("Length validation from 10", () => {
    expect(cc().isValid("17131750711")).toBeFalsy();
    expect(cc().isValid("0136661519")).toBeTruthy();
    expect(cc().isValid("2009665122")).toBeTruthy();
    expect(cc().isValid("1713175071")).toBeTruthy();
    expect(cc().isValid("20096651222")).toBeFalsy();
  });

  it("Has correct checksum", () => {
    expect(cc().isValid("2009665122")).toBeTruthy();
    expect(cc().isValid("0347093080")).toBeTruthy();
    expect(cc().isValid("1713175071")).toBeTruthy();
    expect(cc().isValid("1713175325")).toBeFalsy(); //invalid checksum
  });

  it("Has correct checksum with format or rut number", () => {
    expect(cc().isValid(1713175071)).toBeTruthy();
    expect(cc().isValid(2009665122)).toBeTruthy();
    expect(cc().isValid("013666151-9")).toBeTruthy();
    expect(cc().isValid("200966512-2")).toBeTruthy;
  });

  it("Should not throw an error with letters", () => {
    expect(cc().isValid("2009sdfsd665ssdf12d2")).toBeTruthy();
    expect(cc().isValid("013sas626s15as9")).toBeFalsy(); //invalid checksum
    // TODO: It should return false when the letter K is not in the last position
  });

  it("Should not throw an error with a nullish value", () => {
    expect(cc().isValid(undefined)).toBeFalsy();
    expect(cc().isValid(null)).toBeFalsy();
    expect(cc().isValid("")).toBeFalsy();
  });

  it("Check digit generator", () => {
    expect(cc().getCheckDigit("034709308")).toBe(0);
    expect(cc().getCheckDigit("112223346")).toBe(1);
    expect(cc().getCheckDigit("212338301")).toBe(6);
  });

  it("Generator CC", () => {
    const cc1 = cc().generate();
    const cc2 = cc().generate();
    const cc3 = cc().generate();

    expect(cc().isValid(cc1)).toBeTruthy;
    expect(cc().isValid(cc2)).toBeTruthy;
    expect(cc().isValid(cc3)).toBeTruthy;
  });

  it("Format CC", () => {
    expect(cc().format("0347093080")).toBe("034709308-0");
    expect(cc().format("1122233461")).toBe("112223346-1");
  });

  it("Generate a CC with format", () => {
    const regexValidator = /^(\d{9})-(\w{1})$/;
    const cc1 = cc({ format: true }).generate();
    const cc2 = cc({ format: true }).generate();

    expect(cc1).toMatch(regexValidator);
    expect(cc2).toMatch(regexValidator);
  });
});
