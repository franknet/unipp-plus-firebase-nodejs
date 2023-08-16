/* eslint-disable max-len */

const api = require("./api");
const storage = require("firebase-admin").storage().bucket();

exports.fetchExtract = (session) => api.fetchExtract(session);

exports.fetchBills = (session) => api.fetchBills(session);

exports.fetchBankSlipURL = (session, bankSlipId) => api.fetchBankSlipURL(session, bankSlipId);

exports.fetchBankSlipPreview = (session, bankSlipURL) => api.fetchBankSlipPreview(session, bankSlipURL);

exports.fetchBankSlipPDF = (session, bankSlipURL, body) => api.fetchBankSlipPDF(session, bankSlipURL, body);

exports.fetchBankSlipPDFFile = (name) => storage.file(name);

/**
 * @param {File} name
 * @param {any} data
 * @returns {Promise<boolean>}
 */

exports.saveBankSlipPDF = (file, data) => {
  const stream = file.createWriteStream({
    contentType: "application/pdf",
  });
  return new Promise((resolve, reject) => {
    stream.write(data);
    stream.end();
    stream.on("finish", resolve(true));
    stream.on("error", reject);
  });
};
