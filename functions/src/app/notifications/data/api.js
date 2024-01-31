
const {HttpClient, HttpStatus} = require("up-core").Http;

exports.fetchSecHome = (session) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/Home/Inicio",
  headers: {"Cookie": session["cookie"]},
  validateStatus: HttpStatus.Ok,
});
