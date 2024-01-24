
const { HttpClient, HttpStatus } = require("../../../core").Http;

exports.fetchExtract = (session) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/PosicaoFinanceira/PosicaoFinanceira",
  headers: { "Cookie": session["cookie"] },
  validateStatus: HttpStatus.Ok
});

exports.fetchBills = (session) => HttpClient.request({
  url: "https://sec2.unip.br/NovaSecretaria/BoletoPagamentoOnline/BoletoPagamentoOnline",
  headers: { "Cookie": session["cookie"] },
  validateStatus: HttpStatus.Ok
});

exports.fetchBankSlipURL = (session, bankSlipId) => HttpClient.request({
  url: `https://sec2.unip.br/OpcaoDataPgto.aspx?Param=${bankSlipId}`,
  headers: { "Cookie": session["cookie"] },
  validateStatus: HttpStatus.Redirect
});

exports.fetchBankSlipPreview = (session, path) => HttpClient.request({
  url: `https://sec2.unip.br${path}`,
  headers: { "Cookie": session["cookie"] },
  validateStatus: HttpStatus.Ok
});

exports.fetchBankSlipPDF = (session, path, body) => HttpClient.request({
  url: `https://sec2.unip.br${path}`,
  headers: { "Cookie": session["cookie"] },
  method: "post",
  data: body,
  responseType: "arraybuffer",
  validateStatus: HttpStatus.Ok
});
