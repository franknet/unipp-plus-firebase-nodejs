const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.fetchNF = (session) => request({
  url: "https://sec2.unip.br/NovaSecretaria/NotasFaltasMediaFinal/NotasFaltasMediaFinal",
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});

exports.fetchME = (session) => request({
  url: "https://sec2.unip.br/NovaSecretaria/MediasExamesFinais/MediasExamesFinais",
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});
