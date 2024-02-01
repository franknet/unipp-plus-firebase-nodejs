
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const _ = require("lodash");
const {Number} = require("up-core").Utils;
const {HtmlParser} = require("up-core").Http;

const unreleasedStatus = ["NL", "--"];
const releasedStatus = ["AP", "NC"];

exports.build = (nfHtml, meHtml) => {
  let records = parseRecords(nfHtml, meHtml);
  const lasReleasedRecords = lastReleasedRecords(records);
  const recordsAvg = calculateRecordsAvg(records);
  records.forEach(addStatus);
  records = _.groupBy(records, "type");
  return {recordsAvg, records, lasReleasedRecords};
};

function parseRecords(nfHtml, meHtml) {
  const nfLabels = ["cod", "courseName", "special", "type", "obs", "np1", "np2", "mf", "obsences"];
  const meLabels = ["cod", "courseName", "special", "type", "obs", "obsences", "ms", "ex", "mf"];
  const tableClass = "table-striped";
  const nf = HtmlParser.table(nfHtml, tableClass, nfLabels);
  const me = HtmlParser.table(meHtml, tableClass, meLabels);
  return _.merge(nf, me);
}

function lastReleasedRecords(records) {
  return _.filter(_.map(records, filterLastReleased), (o) => !_.isNil(o));
}

function calculateRecordsAvg(records) {
  const totalAvg = _.reduce(records, addAvg, 0);
  return _.round(totalAvg / records.length, 1);
}

function filterLastReleased(discipline) {
  const grades = [];
  const {np1, np2, ms, ex, mf} = discipline;

  addNp1(np1, grades);
  addNp2(np1, grades);
  addMs(np1, np2, ms, grades);
  addEx(ex, grades);
  addMf(np1, np2, ms, mf, grades);

  if (grades.length === 0) {
    return null;
  }
  const courseName = discipline["courseName"];
  return {courseName, grades};
}

function addNp1(np1, grades) {
  if (!unreleasedStatus.includes(np1) || releasedStatus.includes(np1)) {
    grades.push(mapping("np1", Number.toNumber(np1)));
  }
}

function addNp2(np2, grades) {
  if (!unreleasedStatus.includes(np2) || releasedStatus.includes(np2)) {
    grades.push(mapping("np1=2", Number.toNumber(np2)));
  }
}

function addMs(np1, np2, ms, grades) {
  if ((!unreleasedStatus.includes(np1) || !unreleasedStatus.includes(np2)) && !unreleasedStatus.includes(ms) || releasedStatus.includes(ms)) {
    grades.push(mapping("ms", Number.toNumber(ms)));
  }
}

function addEx(ex, grades) {
  if (!unreleasedStatus.includes(ex) || releasedStatus.includes(ex)) {
    grades.push(mapping("ex", Number.toNumber(ex)));
  }
}

function addMf(np1, np2, ms, mf, grades) {
  if ((!unreleasedStatus.includes(np1) || !unreleasedStatus.includes(np2)) && !unreleasedStatus.includes(ms) || releasedStatus.includes(mf)) {
    grades.push(mapping("mf", Number.toNumber(mf)));
  }
}

function addAvg(result, record) {
  result + record["mf"];
  return result;
}

function addStatus(record) {
  const status = {
    code: 0,
    message: [],
  };

  const {np1, np2, ms, ex, mf} = record;
  const np1Num = Number.toNumber(np1);
  const np2Num = Number.toNumber(np2);
  const msNum = Number.toNumber(ms);
  const exNum = Number.toNumber(ex);
  const mfNum = Number.toNumber(mf);

  record["np1"] = np1Num;
  record["np2"] = np2Num;
  record["ms"] = msNum;
  record["ex"] = exNum;
  record["mf"] = mfNum;

  if (validateApStatus(mf, mfNum, status, record)) {
    return;
  }
  validateNp1Status(np1, np1Num, np2, status);
  validateNp2Status(np2, ex, ms, msNum, status);
  validateMfStatus(np1, np2, mf, mfNum, status);
  record["status"] = status;
}

function validateApStatus(mf, mfNum, status, record) {
  if (mf == "AP" || mfNum >= 5) {
    status.code = 2;
    status.message.push("Aprovado!");
    record["status"] = status;
    return true;
  }
  return false;
}

function validateNp1Status(np1, np1Num, np2, status) {
  if (np1 == "NC") {
    status.message.push("Você não compareceu na prova da NP1!");
  }
  if (Number.isNumber(np1) && !Number.isNumber(np2)) {
    const minGrade = ((7 + np1Num) / 2) + np1Num;
    status.message.push(`Você precisa tirar no mínimo ${_.round(minGrade, 1)} na NP2`);
  }
}

function validateNp2Status(np2, ex, ms, msNum, status) {
  if (np2 == "NC") {
    status.message.push("Você não compareceu na prova da NP2!");
  }
  if (Number.isNumber(np2) && Number.isNumber(ms) && !Number.isNumber(ex)) {
    const minGrade = 10 - msNum;
    status.message.push(`Você precisa tirar no mínimo ${_.round(minGrade, 1)} no exame`);
  }
}

function validateMfStatus(np1, np2, mf, mfNum, status) {
  if (Number.isNumber(np1) && Number.isNumber(np2) && Number.isNumber(mf)) {
    const hasPassed = mfNum >= 5;
    status.code = hasPassed ? 2 : 1;
    status.message.push(hasPassed ? "Aprovado!" : "Reprovado!");
  }
}

function mapping(name, value) {
  return {name, value};
}
