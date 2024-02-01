/* eslint-disable require-jsdoc */

const _ = require("lodash");

exports.build = (recordsData, releasedStudentRecordsData) => {
  const records = _.map(recordsData, recordMapping);
  const lasReleasedRecords = releasedStudentRecordsData;
  const recordsAvg = _.reduce(records, addAvg, 0);


  return {recordsAvg, records, lasReleasedRecords};
};

function recordMapping(record) {
  return {
    "id": record["disciplina"],
    "className": record["nomeDisciplina"],
    "totalClasses": record["aulasPrevistas"],
    "totalClassesTaught": record["aulasMinistradas"],
    "type": record["situacaoDetalhe"],
    "class": record["turma"],
    "year": record["periodo"]["ano"],
    "semester": record["periodo"]["semestre"],
    "grades": {
      "avg": record["media"],
      "avgNum": _.defaultTo(record["mediaNumerica"], 0),
      "avgSubPeriods": record["mediaSubperiodos"],
    },
    "teacher": {
      "id": record["codDocente"],
      "name": record["nomeDocente"],
    },
    "abscence": {
      "limit": record["faltas"][0]["faltasPermitidas"],
      "percentage": record["faltas"][0]["percentualPresenca"],
      "total": record["faltas"][0]["faltasAcumuladas"],
    },
  };
}

function addAvg(result, record) {
  return result + record["grades"]["avgNum"];
}
