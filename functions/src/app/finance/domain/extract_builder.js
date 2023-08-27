
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const _ = require("lodash");
const {toNumber, toCurrency} = require("../../../utils/number-utils");
const HTMLParser = require("../../../utils/html-parser");
// const {log} = require("../../../../utils/logger");

const PAYMENT_TYPE = {
  MS: "Mensalidade",
  PC: "Parcelamento de mensalidades",
  DF: "Diferença de mensalidade",
  TX: "Taxa de serviços",
  CD: "Confissão de dívida",
};

const ACCEPTED_STATUS = [
  "OK",
  "ABONO",
];

const TABLE_COLUMNS = [
  "seq",
  "install",
  "docType",
  "paymentPlan",
  "dueDate",
  "docValue",
  "paymentDate",
  "valuePaid",
  "reversalValue",
  "status",
  "receipt",
];

exports.buildExtract = function(html) {
  const payments = HTMLParser.table(html, "table-striped", TABLE_COLUMNS);
  refactorPayments(payments);
  const totalPaid = _.sumBy(payments, "valuePaid");
  return {
    "data": {
      "totalPaid": toCurrency(_.round(totalPaid, 2)),
      "paymentTypes": paymentTypes(payments),
    },
  };
};

function refactorPayments(payments) {
  _.forEach(_.reverse(payments), (payment, index) => {
    payment["status"] = paymentStatus(payment);
    payment["seq"] = payment["seq"].split("/").reverse().join("/");
    payment["docValue"] = toNumber(_.replace(payment["docValue"], "R$", ""));
    payment["valuePaid"] = toNumber(_.replace(payment["valuePaid"], "R$", ""));
    payment["reversalValue"] = toNumber(_.replace(payment["reversalValue"], "R$", ""));
  });
}

function paymentStatus(payment) {
  const status = {
    "code": ACCEPTED_STATUS.includes(payment["status"]) ? 1 : 0,
  };
  if (payment["status"] == "OK") {
    status["message"] = `Pago no dia ${payment["paymentDate"]}`;
  } else if (payment["status"] == "ABONO") {
    status["message"] = "Pagamento abonado";
  } else {
    status["message"] = `Vence no dia ${payment["dueDate"]}`;
  }
  return status;
}

function paymentTypes(payments) {
  return _.map(_.groupBy(payments, "docType"), (groupPayments, groupType) => {
    const totalGroupValue = _.sumBy(groupPayments, "valuePaid");

    _.forEach(groupPayments, (payment, index) => {
      const nextPayment = groupPayments[index + 1];
      payment["difference"] = calcDifference(payment, nextPayment);
      payment["valuePaid"] = toCurrency(payment["valuePaid"]);
      payment["docValue"] = toCurrency(payment["docValue"]);
      payment["reversalValue"] = toCurrency(payment["reversalValue"]);
    });

    return {
      "totalPaid": toCurrency(_.round(totalGroupValue, 2)),
      "type": groupType,
      "typeName": PAYMENT_TYPE[groupType],
      "payments": groupPayments,
    };
  });
}

function calcDifference(payment, nextPayment) {
  if (_.isNil(nextPayment)) {
    return null;
  }
  const diferrenceValue = _.round(payment["docValue"] - nextPayment["docValue"], 2);
  return {
    "code": diferrenceValue > 0 ? -1 : diferrenceValue == 0 ? 0 : 1,
    "value": toCurrency(diferrenceValue),
  };
}
