/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const HTMLParser = require("../../../utils/html-parser");

exports.buildBankSlipParams = function(html) {
  const params = new URLSearchParams();
  params.append("__VIEWSTATE", HTMLParser.getElementById(html, "__VIEWSTATE")["value"]);
  params.append("__VIEWSTATEGENERATOR", HTMLParser.getElementById(html, "__VIEWSTAT__VIEWSTATEGENERATORE")["value"]);
  params.append("Button1", "Ir para impressão");
  return params;
};
