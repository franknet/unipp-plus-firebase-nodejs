/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const {HttpClient} = require("up-core").Http;

exports.fetchGrades = (session) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["user"]["id"]}/alunos/${session["user"]["rg"]}/boletim`,
  headers: {"Cookie": session["cookie"]},
});

exports.fetchReleasedGrades = (session) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["user"]["id"]}/alunos/${session["user"]["rg"]}/ultimasNotas`,
  headers: {"Cookie": session["cookie"]},
});

exports.fetchAttendanceDetails = (session, data) => HttpClient.request({
  url: "https://gfa.unip.br/aluno/apix/pessoas/lista_detalhes_frequencia",
  method: "post",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Cookie": session["cookie"],
  },
  json: data,
});
