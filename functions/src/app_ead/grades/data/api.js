/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const {HttpClient, HttpStatus} = require("up-core").Http;

exports.fetchGrades = (session) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["user"]["id"]}/alunos/${session["user"]["rg"]}/boletim`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: HttpStatus.Ok,
});

exports.fetchReleasedGrades = (session) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["user"]["id"]}/alunos/${session["user"]["rg"]}/ultimasNotas`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: HttpStatus.Ok,
});

exports.fetchAttendanceDetails = (session, config) => HttpClient.request({
  url: "https://gfa.unip.br/aluno/apix/pessoas/lista_detalhes_frequencia",
  method: "post",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Cookie": session["cookie"],
  },
  json: config,
  validateStatus: HttpStatus.Ok,
});
