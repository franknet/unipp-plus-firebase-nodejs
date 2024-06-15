/* eslint-disable no-extend-native */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const _ = require("lodash");

exports.build = (extractData1, extractData2) => {
  const totalToPay = _.add(extractData1["valorTotalAPagar"], extractData2["valorTotalAPagar"]);
  const totalPaid = _.add(extractData1["valorTotalPago"], extractData2["valorTotalPago"]);
  const payments = _.concat(extractData1["extrato"], extractData2["extrato"]);
  payments.forEach(addContents);
  return {
    totalToPay,
    totalPaid,
    payments,
  };
};

function addContents(payment, index, payments) {
  return true;
}



//   const payments = _.concat(extractData1["extrato"], extractData2["extrato"]).map((payment, index, payments) => {
//     const nextPayment = payments[index+1];
//     let differenceValue = 0;
//     if (!_.isNil(nextPayment)) {
//       differenceValue = _.round(payment["valorFinalDaCobranca"] - nextPayment["valorFinalDaCobranca"], 2);
//     }
//     const isDownloadAvaliable = payment["tipoPagamento"] == null;
//     const isReceiptAvaliable = !_.isNil(payment["pedidoPgto"]) ? payment["pedidoPgto"]["statusProcessamento"] == "Aprovado" : false;
//     const obj = {
//       "type": payment["tipo"],
//       "date": payment["anoMes"], // yyyy/MM
//       "dueDate": new Date(payment["dataDeVencimento"]).toLocaleDateString("en-ZA"), // yyyy/MM/dd
//       "bankSlipUrl": isDownloadAvaliable ? `/api_ead/v1/finance/download-bank-slip?code=${payment["boleto"]}` : null,
//       "receiptUrl": isReceiptAvaliable ? `/api_ead/v1/finance/download-receipt?code=${payment["pedidoPgto"]["idPedidoPgto"]}` : null,
//       "totalValue": payment["valorFinalDaCobranca"] || 0,
//       "differenceValue": differenceValue,
//       "contents": [
//         {
//           "id": 0,
//           "title": "Dados do faturamento",
//           "items": [
//             mapping("Valor bruto", payment["valorLancadoDaDivida"] || 0),
//             mapping("Decontos", payment["valorDescontadoDaDivida"] || 0),
//             mapping("Bolsa", payment["valorTotalDeBolsaDaDivida"] || 0),
//             mapping("Valor liquido", payment["valorFinalDaCobranca"] || 0),
//             mapping("Acerto", payment["valorItensAcerto"] || 0),
//             mapping("Valor a pagar", payment["valorItensAPagar"] || 0),
//           ],
//         },
//         {
//           "id": 1,
//           "title": "Dados do pagamento",
//           "items": [
//             mapping("Desconto pontualidade", payment["valorTotalDescontoPagamento"]),
//             mapping("Encargo calculado", payment["valorTotalEncargoPagamento"]),
//             mapping("Valor pago", payment["valorFaturadoDaCobranca"] || 0),
//             mapping("Data do pagamento", new Date(payment["dataDoPagamento"]).toLocaleDateString("en-ZA")), // yyyy/MM/dd
//             mapping("Tipo de pagamento", payment["tipoPagamento"]),
//           ],
//         },
//       ],
//     };

//     addPgtoRequestSegment(payment, obj.contents);

//     if (!_.isEmpty(payment["pedidoPgtoCartoes"])) {
//       const cards = payment["pedidoPgtoCartoes"];
//       const pgto = {
//         "id": 3,
//         "title": "Cartões utilizados",
//         "items": cards.map((card) => {
//           return {
//             "brand": card["bandeira"],
//               "cardNumber": card["finalcartao"],
//               "nsu": card["nsu"],
//               "installments": card["numeroparcelas"],
//             }
//           };
//         })
//       obj.contents.push(pgto);
//     }

//     return obj;
//   });

//   return {
//     "totalToPay": totalToPay,
//     "totalPaid": totalPaid,
//     "payments": payments,
//   };

const mapping = (name, value) => ({name, value});

function addPgtoRequestSegment(payment, arr) {
  if (!_.isNil(payment["pedidoPgto"])) {
    const requestPgto = payment["pedidoPgto"];
    const cardPgto = {
      "id": 2,
      "title": "Dados do pagamento com cartão",
      "items": [
        mapping("Número do pedido", requestPgto["idPedidoPgto"]),
        mapping("Data de processamento", new Date(requestPgto["dataProcessamento"]).toLocaleDateString("en-ZA")), // yyyy/MM/dd
        mapping("Status de processamento", requestPgto["statusProcessamento"]),
      ],
    };
    arr.push(cardPgto);
  }
}
