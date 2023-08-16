const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.fetchExtract = (session) => request({
  url: "https://sec2.unip.br/NovaSecretaria/PosicaoFinanceira/PosicaoFinanceira",
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});

exports.fetchBills = (session) => request({
  url: "https://sec2.unip.br/NovaSecretaria/BoletoPagamentoOnline/BoletoPagamentoOnline",
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});

exports.fetchBankSlipURL = (session, bankSlipId) => request({
  url: `https://sec2.unip.br/OpcaoDataPgto.aspx?Param=${bankSlipId}`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Redirect,
});

exports.fetchBankSlipPreview = (session, path) => request({
  url: `https://sec2.unip.br${path}`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});

exports.fetchBankSlipPDF = (session, path, body) => request({
  url: `https://sec2.unip.br${path}`,
  headers: {"Cookie": session["cookie"]},
  method: "post",
  data: body,
  responseType: "arraybuffer",
  validateStatus: Status.Ok,
});
