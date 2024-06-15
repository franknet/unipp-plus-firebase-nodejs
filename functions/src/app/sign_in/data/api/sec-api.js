
const {HttpClient, HttpStatus} = require("up-core").Http;

exports.fetchSec = (url) => HttpClient.request({
  url: url,
  validateStatus: HttpStatus.Redirect,
});

exports.fetchSec2 = ({url, cookie}) => HttpClient.request({
  url: url,
  headers: {"Cookie": cookie},
  validateStatus: HttpStatus.Redirect,
});

exports.fetchStudentProfile = (cookie) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/CadastroSecretariaOnline/CadastroSecretariaOnline",
  headers: {"Cookie": cookie},
});
