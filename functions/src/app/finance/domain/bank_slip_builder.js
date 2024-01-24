/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const { HtmlParser } = require("../../../core").Http;

exports.buildBankSlipParams = function(html) {
  const params = new URLSearchParams();
  params.append("__VIEWSTATE", HtmlParser.getElementById(html, "__VIEWSTATE")["value"]);
  params.append("__VIEWSTATEGENERATOR", HtmlParser.getElementById(html, "__VIEWSTAT__VIEWSTATEGENERATORE")["value"]);
  params.append("Button1", "Ir para impressão");
  return params;
};
