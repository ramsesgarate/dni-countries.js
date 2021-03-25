var dni = require("./src");

var cc = dni("ec", "cc");
var ccGenerate = cc().generate();
console.log(cc().isValid("013666151-9"));
