/* eslint-disable max-len */
// const _ = require("lodash");

const repository = require("../data/repository");
const {buildExtract} = require("./extract_builder");
const {buildBills} = require("./bills_builder");
// const {buildBankSlipParams} = require("./bank_slip_builder");
const {Errors} = require("up-core").Firebase;

exports.fetchExtract = async function(session) {
  try {
    const {data} = await repository.fetchExtract(session);
    return buildExtract(data);
  } catch (error) {
    throw Errors.onError(error);
  }
};

exports.fetchBills = async function(session) {
  try {
    const {data} = await repository.fetchBills(session);
    const result = buildBills(data);
    // const bills = result["bills"];
    // const filterBills = _.filter(bills, (bill) => bill["status"]["code"] == 0);
    // const tasks = _.flatMap(filterBills, (bill) => saveBankSlipPDF(session, bill));
    // await Promise.all(tasks);
    return result;
  } catch (error) {
    throw Errors.onError(error);
  }
};

// const saveBankSlipPDF = async function(session, bill) {
//   try {
//     const bankSlipId = bill["bankSlipId"];
//     // const userRg = session["user"]["rg"];
//     // const file = repository.fetchBankSlipPDFFile(`${userRg}/${bankSlipId}.pdf`);
//     // const exists = await file.exists()[0];
//     // if (exists) {
//     //   return false;
//     // }
//     const bankSlipURLResponse = await repository.fetchBankSlipURL(session, bankSlipId);
//     const bankSlipUrl = bankSlipURLResponse.headers["location"];
//     const bankSlipPreviewResponse = await repository.fetchBankSlipPreview(session, bankSlipUrl);
//     const bankSlipParams = buildBankSlipParams(bankSlipPreviewResponse.data);
//     // const bankSlipPDFResponse = await repository.fetchBankSlipPDF(session, bankSlipUrl, bankSlipParams);
//     // return await repository.saveBankSlipPDF(file, bankSlipPDFResponse.data);
//     return bankSlipParams;
//   } catch (error) {
//     Logger.trackError(error);
//     bill["bankSlipId"] = null;
//     bill["status"] = {
//       "code": 0,
//       "message": "Download não disponível",
//     };
//     return false;
//   }
// };
