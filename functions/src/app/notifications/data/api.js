const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.fetchSecHome = (session) => request({
  url: "https://sec2.unip.br/NovaSecretaria/Home/Inicio",
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});
