/* eslint-disable max-len */
const _ = require("lodash");

const repository = require("../data/repository");
const {buildExtract} = require("./extract_builder");
const {buildBills} = require("./bills_builder");
const {buildBankSlipParams} = require("./bank_slip_builder");
const {trackError} = require("../../../utils/logger");
const {onError} = require("../../../utils/https-errors");

exports.fetchExtract = async function(session) {
  try {
    const {data} = await repository.fetchExtract(session);
    return buildExtract(data);
  } catch (error) {
    throw onError(error);
  }
};

exports.fetchBills = async function(session) {
  try {
    const {data} = await repository.fetchBills(session);
    const result = buildBills(data);
    const bills = result["bills"];
    const tasks = _.flatMap(bills, (bill) => saveBankSlipPDF(session, bill));
    await Promise.all(tasks);
    return result;
  } catch (error) {
    throw onError(error);
  }
};

const saveBankSlipPDF = async function(session, bill) {
  const bankSlipId = bill["bankSlipId"];
  const userRg = session["user"]["rg"];
  const bankSlipPDFFile = repository.fetchBankSlipPDFFile(`bank_slips/${userRg}/${bankSlipId}.pdf`);
  const isSaved = await bankSlipPDFFile.exists()[0];
  console.log(`Is file saved: ${isSaved}`);

  if (isSaved) {
    return false;
  } else {
    try {
      const bankSlipURLResponse = await repository.fetchBankSlipURL(session, bankSlipId);
      const bankSlipUrl = bankSlipURLResponse.headers["location"];
      const bankSlipPreviewResponse = await repository.fetchBankSlipPreview(session, bankSlipUrl);
      const bankSlipParams = buildBankSlipParams(bankSlipPreviewResponse.data);
      const bankSlipPDFResponse = await repository.fetchBankSlipPDF(session, bankSlipUrl, bankSlipParams);
      return await repository.saveBankSlipPDF(bankSlipPDFFile, bankSlipPDFResponse.data);
    } catch (error) {
      trackError(error);
      bill["bankSlipId"] = null;
      bill["status"] = {
        "code": 0,
        "message": "Download não disponível",
      };
      return false;
    }
  }
};
