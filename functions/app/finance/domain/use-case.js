/* eslint-disable max-len */
const _ = require("lodash");

const repository = require("../data/repository");
const {buildExtract} = require("./extract_builder");
const {buildBills} = require("./bills_builder");
const {buildBankSlipParams} = require("./bank_slip_builder");
const {trackError} = require("../../../utils/logger");

exports.fetchExtract = async function(session, context) {
  const data = await repository.fetchExtract(session);
  return buildExtract(data);
};

exports.fetchBills = async function(session, context) {
  const data = await repository.fetchBills(session);
  const result = buildBills(data);
  const bills = result["bills"];
  const tasks = _.flatMap(bills, (bill) => saveBankSlipPDF(session, bill));
  await Promise.all(tasks);
  return result;
};

const saveBankSlipPDF = async function(session, bill) {
  const bankSlipId = bill["bankSlipId"];
  const userRg = session["user"]["rg"];
  const bankSlipPDFFile = repository.fetchBankSlipPDFFile(`bank_slip/${userRg}_${bankSlipId}.pdf`);

  if (await bankSlipPDFFile.exists()[0]) {
    return false;
  }
  try {
    const headers = await repository.fetchBankSlipURL(session, bankSlipId);
    const bankSlipUrl = headers["location"];
    const html = await repository.fetchBankSlipPreview(session, bankSlipUrl);
    const params = buildBankSlipParams(html);
    const pdfData = await repository.fetchBankSlipPDF(session, bankSlipUrl, params);
    return await repository.saveBankSlipPDF(bankSlipPDFFile, pdfData);
  } catch (error) {
    trackError(error);
    bill["bankSlipId"] = null;
    bill["status"] = {
      "code": 0,
      "message": "Download não disponível",
    };
    return false;
  }
};
