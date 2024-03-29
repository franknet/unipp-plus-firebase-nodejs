
const {HttpClient} = require("up-core").Http;

exports.fetchNF = (session) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/NotasFaltasMediaFinal/NotasFaltasMediaFinal",
  headers: {"Cookie": session["cookie"]},
});

exports.fetchME = (session) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/MediasExamesFinais/MediasExamesFinais",
  headers: {"Cookie": session["cookie"]},
});
