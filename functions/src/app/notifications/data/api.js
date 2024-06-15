
const {HttpClient, HttpStatus} = require("up-core").Http;

exports.fetchSecHome = (cookie) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/Home/Inicio",
  headers: {"Cookie": cookie},
  validateStatus: HttpStatus.Ok,
});
