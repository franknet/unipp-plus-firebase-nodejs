/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const {HttpClient} = require("up-core").Http;

exports.fetchRecords = (session) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["student"]["id"]}/alunos/${session["student"]["rg"]}/boletim`,
  headers: {"Cookie": session["cookie"]},
});

exports.fetchReleasedRecords = (session) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["student"]["id"]}/alunos/${session["student"]["rg"]}/qtddNotas/10/ultimasNotas`,
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
