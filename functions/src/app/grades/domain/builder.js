
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const _ = require("lodash");
const {toNumber, isNumber} = require("../../../utils/number-utils");
const {table} = require("../../../utils/html-parser");

const nfLabels = ["cod", "discipline", "special", "type", "obs", "np1", "np2", "mf", "obsences"];
const meLabels = ["cod", "discipline", "special", "type", "obs", "obsences", "ms", "ex", "mf"];
const tableClass = "table-striped";
const unreleasedStatus = ["NL", "--"];
const releasedStatus = ["AP", "NC"];

exports.buildGrades = (nfHtml, meHtml) => {
  const nf = table(nfHtml, tableClass, nfLabels);
  const me = table(meHtml, tableClass, meLabels);
  const disciplines = _.merge(nf, me);
  const lastReleased = _.filter(_.map(disciplines, filterLastReleased), (o) => !_.isNil(o));
  _.forEach(disciplines, setStatus);
  let totalAvg = _.reduce(disciplines, addAvg, 0);
  totalAvg = _.round(totalAvg / disciplines.length, 1);
  return {
    "data": {
      "totalAvg": totalAvg,
      "disciplines": _.groupBy(disciplines, "type"),
      "lastReleased": lastReleased,
    },
  };
};

function filterLastReleased(discipline) {
  const released = {};
  const grades = [];
  const np1 = discipline["np1"];
  const np2 = discipline["np2"];
  const ms = discipline["ms"];
  const ex = discipline["ex"];
  const mf = discipline["mf"];

  if (!unreleasedStatus.includes(np1) || releasedStatus.includes(np1)) {
    grades.push({
      "name": "np1",
      "value": toNumber(np1),
    });
  }
  if (!unreleasedStatus.includes(np2) || releasedStatus.includes(np2)) {
    grades.push({
      "name": "np2",
      "value": toNumber(np2),
    });
  }
  if ((!unreleasedStatus.includes(np1) || !unreleasedStatus.includes(np2)) && !unreleasedStatus.includes(ms) || releasedStatus.includes(ms)) {
    grades.push({
      "name": "ms",
      "value": toNumber(ms),
    });
  }
  if (!unreleasedStatus.includes(ex) || releasedStatus.includes(ex)) {
    grades.push({
      "name": "ex",
      "value": toNumber(ex),
    });
  }
  if ((!unreleasedStatus.includes(np1) || !unreleasedStatus.includes(np2)) && !unreleasedStatus.includes(ms) || releasedStatus.includes(mf)) {
    grades.push({
      "name": "mf",
      "value": toNumber(mf),
    });
  }
  if (grades.length == 0) {
    return null;
  }
  released["discipline"] = discipline["discipline"];
  released["grades"] = grades;
  return released;
}

function addAvg(result, discipline) {
  result + discipline["mf"];
  return result;
}

function setStatus(discipline) {
  const np1 = discipline["np1"];
  const np2 = discipline["np2"];
  const ms = discipline["ms"];
  const ex = discipline["ex"];
  const mf = discipline["mf"];

  const np1Num = toNumber(np1);
  const np2Num = toNumber(np2);
  const msNum = toNumber(ms);
  const exNum = toNumber(ex);
  const mfNum = toNumber(mf);

  discipline["np1"] = np1Num;
  discipline["np2"] = np2Num;
  discipline["ms"] = msNum;
  discipline["ex"] = exNum;
  discipline["mf"] = mfNum;

  const status = {
    code: 0,
    message: [],
  };
  if (mf == "AP" || mfNum >= 5) {
    status.code = 2;
    status.message.push("Aprovado!");
    discipline["status"] = status;
    return;
  }
  if (np1 == "NC") {
    status.message.push("Você não compareceu na prova da NP1!");
  }
  if (isNumber(np1) && !isNumber(np2)) {
    const minGrade = ((7 + np1Num) / 2) + np1Num;
    status.message.push(`Você precisa tirar no mínimo ${_.round(minGrade, 1)} na NP2`);
  }
  if (np2 == "NC") {
    status.message.push("Você não compareceu na prova da NP2!");
  }
  if (isNumber(np2) && isNumber(ms) && !isNumber(ex)) {
    const minGrade = 10 - msNum;
    status.message.push(`Você precisa tirar no mínimo ${_.round(minGrade, 1)} no exame`);
  }
  if (isNumber(np1) && isNumber(np2) && isNumber(mf)) {
    const hasPassed = mfNum >= 5;
    status.code = hasPassed ? 2 : 1;
    status.message.push(hasPassed ? "Aprovado!" : "Reprovado!");
  }
  discipline["status"] = status;
}
