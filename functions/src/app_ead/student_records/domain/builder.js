/* eslint-disable require-jsdoc */

const _ = require("lodash");

exports.build = (recordsData, releasedRecordsData) => {
  let records = _.flatMap(recordsData, record);
  records = _.groupBy(records, "type");
  const releasedRecords = releasedRecordsData;
  return {records, releasedRecords};
};

function record(data) {
  return {
    "id": data["disciplina"],
    "name": data["nomeDisciplina"],
    "totalClasses": data["aulasPrevistas"],
    "totalClassesTaught": data["aulasMinistradas"],
    "type": data["situacaoDetalhe"],
    "class": data["turma"],
    "year": data["periodo"]["ano"],
    "semester": data["periodo"]["semestre"],
    "grade": grade(data),
    "teacher": teacher(data),
    "abscence": abscence(data),
  };
}

function grade(data) {
  return {
    "avg": data["media"],
    "avgNum": data["mediaNumerica"],
    "avgSubPeriods": data["mediaSubperiodos"],
  };
}

function teacher(data) {
  return {
    "id": data["codDocente"],
    "name": data["nomeDocente"],
  };
}

function abscence(data) {
  return {
    "limit": data["faltas"][0]["faltasPermitidas"],
    "percentage": data["faltas"][0]["percentualPresenca"],
    "total": data["faltas"][0]["faltasAcumuladas"],
  };
}
