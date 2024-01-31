
const {HttpClient, HttpStatus} = require("up-core").Http;

exports.fetchAcademicRecords = (session) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/IntegralizacaoCurricular/IntegralizacaoCurricular",
  headers: {"Cookie": session["cookie"]},
  validateStatus: HttpStatus.Ok,
});
