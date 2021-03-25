const module11 = (dni) => {
  let dniReverse = dni.split("").map(Number).reverse();
  let total = dniReverse.reduce(
    (acc, cur, index) => acc + cur * (2 + (index % 6)),
    0
  );

  return 11 - (total % 11);
};

const module10 = (dni) => {
  dni = dni.split("").map(Number);
  let total = dni.reduce((acc, cur, index) => {
    let aux = cur * (index % 2 === 0 ? 2 : 1);
    if (aux > 9) aux -= 9;
    return aux + acc;
  }, 0);

  return 10 - (total % 10);
};

const modulePy = (dni) => {
  let dniReverse = dni.split("").map(Number).reverse();
  let total = dniReverse.reduce(
    (acc, cur, index) => acc + cur * (2 + index),
    0
  );

  return 11 - (total % 11);
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const clean = (dni, regex = /^0+|[^0-9]+/g) => {
  let dniStr = dni.toString();
  return dniStr.replace(regex, "").toUpperCase();
};

module.exports = {
  module11,
  modulePy,
  module10,
  getRandomNumber,
  clean,
};
