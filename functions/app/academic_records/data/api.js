const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.fetchAcademicRecords = (session) => {
  return request({
    url: "https://sec2.unip.br/NovaSecretaria/IntegralizacaoCurricular/IntegralizacaoCurricular",
    headers: {"Cookie": session["cookie"]},
    validateStatus: Status.Ok,
  });
};
