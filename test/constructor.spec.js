const dniCountries = require("../src");

describe("Testing constructor for each country", () => {
  describe("CL", () => {
    const rut = dniCountries("cl", "rut");
    it("supports instanceof rut", () => {
      expect(rut() instanceof rut).toBeTruthy();
    });

    it("does not break isRut", () => {
      expect(rut.isRut(rut())).toBeTruthy();
    });
  });

  describe("AR", () => {
    const cuil = dniCountries("ar", "cuil");
    it("supports instanceof cuil", () => {
      expect(cuil() instanceof cuil).toBeTruthy();
    });

    it("does not break isCuil", () => {
      expect(cuil.isCuil(cuil())).toBeTruthy();
    });

    const cuit = dniCountries("ar", "cuit");
    it("supports instanceof cuit", () => {
      expect(cuit() instanceof cuit).toBeTruthy();
    });

    it("does not break isCuit", () => {
      expect(cuit.isCuit(cuit())).toBeTruthy();
    });
  });

  describe("MX", () => {
    const curp = dniCountries("mx", "curp");
    it("supports instanceof curp", () => {
      expect(curp() instanceof curp).toBeTruthy();
    });

    it("does not break isCurp", () => {
      expect(curp.isCurp(curp())).toBeTruthy();
    });
  });

  describe("PY", () => {
    const ruc = dniCountries("py", "ruc");
    it("supports instanceof ruc", () => {
      expect(ruc() instanceof ruc).toBeTruthy();
    });

    it("does not break isRuc", () => {
      expect(ruc.isRuc(ruc())).toBeTruthy();
    });
  });

  describe("PE", () => {
    const dni = dniCountries("pe", "dni");
    it("supports instanceof dni", () => {
      expect(dni() instanceof dni).toBeTruthy();
    });

    it("does not break isDni", () => {
      expect(dni.isDni(dni())).toBeTruthy();
    });
  });

  describe("EC", () => {
    const cc = dniCountries("ec", "cc");
    it("supports instanceof cc", () => {
      expect(cc() instanceof cc).toBeTruthy();
    });

    it("does not break isCC", () => {
      expect(cc.isCC(cc())).toBeTruthy();
    });
  });
});
