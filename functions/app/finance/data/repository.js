
const api = require("./api");
const storageBucket = require("firebase-admin").storage().bucket();

exports.fetchExtract = async function(session) {
  return (await api.fetchExtract(session)).data;
};

exports.fetchBills = async function(session) {
  return (await api.fetchBills(session)).data;
};

exports.fetchBankSlipURL = async function(session, bankSlipId) {
  return (await api.fetchBankSlipURL(session, bankSlipId)).headers;
};

exports.fetchBankSlipPreview = async function(session, bankSlipURL) {
  return (await api.fetchBankSlipPreview(session, bankSlipURL)).data;
};

exports.fetchBankSlipPDF = async function(session, bankSlipURL, body) {
  return (await api.fetchBankSlipPDF(session, bankSlipURL, body)).data;
};

exports.fetchBankSlipPDFFile = (name) => storageBucket.file(name);

/**
 * @param {File} name
 * @param {any} data
 * @returns {Promise<boolean>}
 */

exports.saveBankSlipPDF = function(file, data) {
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
