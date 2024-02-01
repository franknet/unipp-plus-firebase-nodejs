
const {HttpClient, HttpStatus} = require("up-core").Http;

exports.fetchSec = (url) => new Promise((resolve, reject) => {
  HttpClient.request({
    url: url,
    validateStatus: HttpStatus.Redirect,
  }).then((response) => {
    HttpClient.request({
      url: response["headers"]["location"],
      headers: {"Cookie": response["headers"]["set-cookie"]},
      validateStatus: HttpStatus.Redirect,
    }).then(resolve(response)).catch(reject);
  }).catch(reject);
});

exports.fetchStudentProfile = (cookie) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/CadastroSecretariaOnline/CadastroSecretariaOnline",
  headers: {"Cookie": cookie},
});
