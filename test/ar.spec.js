const { expect, it } = require("@jest/globals");
const dniCountries = require("../src");
const cuil = dniCountries("ar", "cuil");
const cuit = dniCountries("ar", "cuit");

describe("Test AR ", () => {
  describe("CUIL", () => {
    it("Length validation", () => {
      expect(cuil().isValid("2070540946")).toBeFalsy();
      expect(cuil().isValid("23705409463")).toBeTruthy();
      expect(cuil().isValid("277054094633")).toBeFalsy();
    });

    it("Has correct checksum", () => {
      expect(cuil().isValid("27234036551")).toBeTruthy();
      expect(cuil().isValid("24978616034")).toBeTruthy();
      expect(cuil().isValid("20910655699")).toBeTruthy();
      expect(cuil().isValid("23705409463")).toBeTruthy(); //invalid checksum
      expect(cuil().isValid("23783409463")).toBeFalsy(); //invalid checksum
    });

    it("Has correct type (first 2 digits)", () => {
      expect(cuil().isValid("12345678901")).toBeFalsy();
      expect(cuil().isValid("24978616034")).toBeTruthy();
      expect(cuil().isValid("20910655699")).toBeTruthy();
      expect(cuil().isValid("27234036551")).toBeTruthy();
      expect(cuil().isValid("23705409463")).toBeTruthy();
      expect(cuil().isValid("33935903438")).toBeFalsy();
      expect(cuil().isValid("34778992487")).toBeFalsy();
      expect(cuil().isValid("33677446841")).toBeFalsy();
    });

    it("Has correct checksum with format or rut number", () => {
      expect(cuil().isValid(24978616034)).toBeTruthy();
      expect(cuil().isValid(20910655699)).toBeTruthy();
      expect(cuil().isValid("20-91065569-9")).toBeTruthy();
      expect(cuil().isValid("24-97861603-4")).toBeTruthy;
    });

    it("Should not throw an error with letters", () => {
      expect(cuil().isValid("249qwqw7861aww6034")).toBeTruthy();
      expect(cuil().isValid("20910dad655sf687")).toBeFalsy(); //invalid checksum
      // TODO: It should return false when the letter K is not in the last position
    });

    it("Should not throw an error with a nullish value", () => {
      expect(cuil().isValid(undefined)).toBeFalsy();
      expect(cuil().isValid(null)).toBeFalsy();
      expect(cuil().isValid("")).toBeFalsy();
    });

    it("Check digit generator", () => {
      expect(cuil().getCheckDigit("2038381477")).toBe(5);
      expect(cuil().getCheckDigit("2359059689")).toBe(2);
      expect(cuil().getCheckDigit("2497906754")).toBe(9);
    });

    it("Generator Cuil", () => {
      const cuil1 = cuil().generate();
      const cuil2 = cuil().generate();
      const cuil3 = cuil().generate();

      expect(cuil().isValid(cuil1)).toBeTruthy;
      expect(cuil().isValid(cuil2)).toBeTruthy;
      expect(cuil().isValid(cuil3)).toBeTruthy;
    });

    it("Format Cuil", () => {
      expect(cuil().format("23797506486")).toBe("23-79750648-6");
      expect(cuil().format("24979067549")).toBe("24-97906754-9");
    });

    it("Generate a Cuil with format", () => {
      const regexValidator = /^(\d{2})-(\d{7,8})-(\d{1})$/;
      const cuil1 = cuil({ format: true }).generate();
      const cuil2 = cuil({ format: true }).generate();

      expect(cuil1).toMatch(regexValidator);
      expect(cuil2).toMatch(regexValidator);
    });
  });

  describe("CUIT", () => {
    it("Length validation", () => {
      expect(cuit().isValid("3311735538")).toBeFalsy();
      expect(cuit().isValid("34121209405")).toBeTruthy();
      expect(cuit().isValid("341212094052")).toBeFalsy();
    });

    it("Has correct checksum", () => {
      expect(cuit().isValid("34121209405")).toBeTruthy();
      expect(cuit().isValid("33172999862")).toBeTruthy();
      expect(cuit().isValid("30217461983")).toBeTruthy();
      expect(cuit().isValid("30234461983")).toBeFalsy(); //invalid checksum
      expect(cuit().isValid("33172459862")).toBeFalsy(); //invalid checksum
    });

    it("Has correct type (first 2 digits)", () => {
      expect(cuit().isValid("12345678901")).toBeFalsy();
      expect(cuit().isValid("33172999862")).toBeTruthy();
      expect(cuit().isValid("34121209405")).toBeTruthy();
      expect(cuit().isValid("30217461983")).toBeTruthy();
      expect(cuit().isValid("23705409463")).toBeFalsy();
      expect(cuit().isValid("24978616034")).toBeFalsy();
      expect(cuit().isValid("20910655699")).toBeFalsy();
      expect(cuit().isValid("27234036551")).toBeFalsy();
    });

    it("Has correct checksum with format or rut number", () => {
      expect(cuit().isValid(34121209405)).toBeTruthy();
      expect(cuit().isValid(33172999862)).toBeTruthy();
      expect(cuit().isValid("33-17299986-2")).toBeTruthy();
      expect(cuit().isValid("30-21746198-3")).toBeTruthy;
    });

    it("Should not throw an error with letters", () => {
      expect(cuit().isValid("3021asd7461asd983")).toBeTruthy();
      expect(cuit().isValid("30736a46e1983")).toBeFalsy(); //invalid checksum
      // TODO: It should return false when the letter K is not in the last position
    });

    it("Should not throw an error with a nullish value", () => {
      expect(cuit().isValid(undefined)).toBeFalsy();
      expect(cuit().isValid(null)).toBeFalsy();
      expect(cuit().isValid("")).toBeFalsy();
    });

    it("Check digit generator", () => {
      expect(cuit().getCheckDigit("3021746198")).toBe(3);
      expect(cuit().getCheckDigit("3370806972")).toBe(3);
      expect(cuit().getCheckDigit("3415264320")).toBe(0);
    });

    it("Generator cuit", () => {
      const cuit1 = cuit().generate();
      const cuit2 = cuit().generate();
      const cuit3 = cuit().generate();

      expect(cuit().isValid(cuit1)).toBeTruthy;
      expect(cuit().isValid(cuit2)).toBeTruthy;
      expect(cuit().isValid(cuit3)).toBeTruthy;
    });

    it("Format cuit", () => {
      expect(cuit().format("34152643200")).toBe("34-15264320-0");
      expect(cuit().format("33784683538")).toBe("33-78468353-8");
    });

    it("Generate a cuit with format", () => {
      const regexValidator = /^(\d{2})-(\d{7,8})-(\d{1})$/;
      const cuit1 = cuit({ format: true }).generate();
      const cuit2 = cuit({ format: true }).generate();

      expect(cuit1).toMatch(regexValidator);
      expect(cuit2).toMatch(regexValidator);
    });
  });
});
