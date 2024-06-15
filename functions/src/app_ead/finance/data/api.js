
const {HttpClient} = require("up-core/http");

exports.fetchPeriods = (session) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/financeiro/codAluno/${session["user"]["rg"]}/listarAnosDividaAluno?codPessoa=${session["user"]["id"]}`,
  method: "get",
  headers: {"Cookie": session["cookie"]},
});

exports.fetchExtract = (session, period) => HttpClient.request({
  url: "https://gfa.unip.br/aluno/apix/financeiro/obterExtratoFinanceiro",
  method: "post",
  headers: {
    "Content-Type": "application/json",
    "Cookie": session["cookie"],
  },
  data: {
    "ano": period["year"],
    "codAluno": session["user"]["rg"],
    "codPessoa": session["user"]["id"],
    "dataVencimentoFinal": "",
    "dataVencimentoInicial": "",
    "periodo": period["semester"],
  },
});
