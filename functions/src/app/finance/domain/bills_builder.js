/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const _ = require("lodash");
const {toNumber, toCurrency} = require("../../../utils/number-utils");
const HTMLParser = require("../../../utils/html-parser");
// const {logObject} = require("../../../../utils/logger");

exports.buildBills = function(html) {
  const fields = ["seq", "install", "docType", "paymentPlan", "dueDate", "docValue", "paymentDate", "valuePaid", "reversalDate", "reversalValue", "status", "paymentMethods"];
  const bills = HTMLParser.table(html, "table-striped", fields, "html");
  const result = [];

  // join extract and bills list, and add new fields
  _.forEach(_.reverse(bills), (bill, index) => {
    const docValue = _.replace(bill["docValue"], "R$", "");
    const valuePaid = _.replace(bill["valuePaid"], "R$", "");
    const reversalValue = _.replace(bill["reversalValue"], "R$", "");

    bill["bankSlipId"] = setBankSlipId(bill["paymentMethods"]);
    bill["status"] = bill["status"] === "OK" ? `Pago no dia ${bill["paymentDate"]}` : `Vence no dia ${bill["dueDate"]}`;
    bill["seq"] = bill["seq"].split("/").reverse().join("/");
    bill["docValue"] = toCurrency(toNumber(docValue));
    bill["valuePaid"] = toCurrency(toNumber(valuePaid));
    bill["reversalValue"] = toCurrency(toNumber(reversalValue));

    result.push(_.omit(bill, ["paymentMethods"]));
  });

  return {
    "data": result,
  };
};

function setBankSlipId(html) {
  const regex = new RegExp("(?<=AbrirPagamentoBoleto\\(')(.*)(?='\\))", "g");
  const bankSlipId = html.match(regex)[0];
  return bankSlipId;
}
