/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */

const API = require("./api");

exports.fetchExtract = (session) => API.fetchExtract(session);

exports.fetchBills = (session) => API.fetchBills(session);

exports.fetchBankSlipURL = (session, bankSlipId) => API.fetchBankSlipURL(session, bankSlipId);

exports.fetchBankSlipPreview = (session, bankSlipURL) => API.fetchBankSlipPreview(session, bankSlipURL);

exports.fetchBankSlipPDF = (session, bankSlipURL, body) => API.fetchBankSlipPDF(session, bankSlipURL, body);
