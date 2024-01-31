
const {HttpClient, HttpStatus} = require("up-core").Http;

exports.fetchSec = (url) => new Promise((resolve, reject) => {
  HttpClient.request({
    url: url,
    validateStatus: HttpStatus.Redirect,
  }).then((response) => {
    const cookie = response["headers"]["set-cookie"];
    const newSecUrl = response["headers"]["location"];
    
    HttpClient.request({
      url: newSecUrl,
      headers: {"Cookie": cookie},
      validateStatus: HttpStatus.Redirect,
    }).then(resolve(response)).catch(reject)
  }).catch(reject)
});

exports.fetchStudentProfile = (cookie) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/CadastroSecretariaOnline/CadastroSecretariaOnline",
  headers: {"Cookie": cookie},
  validateStatus: HttpStatus.Ok,
});
