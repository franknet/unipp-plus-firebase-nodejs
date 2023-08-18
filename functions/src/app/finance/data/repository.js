/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */

const API = require("./api");
const Storage = require("firebase-admin").storage().bucket();

exports.fetchExtract = (session) => API.fetchExtract(session);

exports.fetchBills = (session) => API.fetchBills(session);

exports.fetchBankSlipURL = (session, bankSlipId) => API.fetchBankSlipURL(session, bankSlipId);

exports.fetchBankSlipPreview = (session, bankSlipURL) => API.fetchBankSlipPreview(session, bankSlipURL);

exports.fetchBankSlipPDF = (session, bankSlipURL, body) => API.fetchBankSlipPDF(session, bankSlipURL, body);

exports.fetchBankSlipPDFFile = (name) => Storage.file(name);

/**
 * @param {File} name
 * @param {any} data
 * @returns {Promise<boolean>}
 */
exports.saveBankSlipPDF = (file, data) => new Promise((resolve, reject) => {
  const stream = file.createWriteStream({
    contentType: "application/pdf",
  });
  stream.write(data);
  stream.end();
  stream.on("finish", resolve(true));
  stream.on("error", reject);
});
