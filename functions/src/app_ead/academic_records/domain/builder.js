/* eslint-disable max-len */
const _ = require("lodash");

const enronTypes = {
  "Transf_Imediata": "Transferência imediata",
};

const map = (label, value) => ({
  "label": label, "value": value,
});

exports.buildAcademicRecords = (courseInfo, disciplines) => {
  return {
    "courseInfo": [
      map("Ingresso em", new Date(courseInfo["DT_INGRESSO"]).toLocaleDateString("pt-BR")),
      map("Tipo de ingresso", enronTypes[courseInfo["TIPO_INGRESSO"]]),
      map("Currículo", courseInfo["CURRICULO"]),
      map("Port/decreto", courseInfo["DECRETO"]),
      map("Public D.O.U", new Date(courseInfo["DT_DOU"]).toLocaleDateString("pt-BR")),
      map("CH exigida", courseInfo["CARGA_HORARIA"]),
      map("CH cumprida", courseInfo["totalCargaHorariaCursada"]),
    ],
    "disciplines": _.flatMap(disciplines, buildDiscipline),
  };
};

const buildDiscipline = (discipline) => {
  return {
    "grade": discipline["serie"],
    "year": discipline["ano"],
    "status": discipline["situacao"],
    "items": [
      map("Ano", discipline["ano"]),
      map("Semestre", discipline["semestre"]),
      map("Disciplina", discipline["disciplina"]),
      map("Carga horária", discipline["cargaHoraria"]),
      map("Média", discipline["notaFinal"]),
      map("Situação", discipline["situacao"]),
    ],
  };
};
