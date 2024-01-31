/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const _ = require("lodash");
const {Number} = require("up-core").Utils;
const {HtmlParser} = require("up-core").Http;

const labels = ["semester", "code", "name", "workload", "avg", "year", "status"];
const tableClass = "table-striped";

exports.buildRecords = function(html) {
  const subjects = parseHTML(html);
  const semesters = _.groupBy(subjects, "semester");
  return refactorSemesters(semesters);
};

function parseHTML(html) {
  const subjects = HtmlParser.table(html, tableClass, labels);
  return _.filter(subjects, filterEmptySubjects);
}

function refactorSemesters(semesters) {
  const result = [];
  _.forIn(semesters, (semesterSubjects, semester) => {
    const totalAvg = _.reduce(semesterSubjects, addValidAvg, 0);
    const validDisciplineCount = _.reduce(semesterSubjects, countValidDisciplines, 0);
    const avg = _.round(totalAvg / validDisciplineCount, 1);
    const statusMessage = addStatusMessage(avg);
    result.push({
      "avg": _.defaultTo(avg, 0),
      "semester": semester,
      "subjects": semesterSubjects,
      "message": statusMessage,
    });
  });
  return result;
}

const filterEmptySubjects = (subject) => subject["semester"] != "";

const invalidDisciplineStatus = ["NÃO CURSADA", "A CURSAR", "CURSANDO NORMAL"];

function countValidDisciplines(result, discipline) {
  if (!_.includes(invalidDisciplineStatus, discipline["status"])) {
    result += 1;
  }
  return result;
}

function addValidAvg(result, discipline) {
  let avg = discipline["avg"];
  const status = discipline["status"];

  if (avg == "--" && status == "APROVADO") {
    avg = "10";
  }
  if (!_.includes(invalidDisciplineStatus, status)) {
    result += Number.toNumber(avg);
  }

  discipline["avg"] = Number.toNumber(avg);
  return result;
}

function addStatusMessage(avg) {
  if (_.isNaN(avg)) {
    return null;
  }
  if (avg > 7.9) {
    return "Seu aproveitamento está ótimo!";
  }
  if (_.inRange(avg, 6, 7.9)) {
    return "Seu aproveitamento está bom!";
  }
  if (_.inRange(avg, 5, 5.9)) {
    return "Seu aproveitamento está mediano!";
  }
  if (_.inRange(avg, 4, 4.9)) {
    return "Seu aproveitamento está ruim!";
  }
  if (avg < 4) {
    return "Seu aproveitamento está muito ruim!";
  }
}
