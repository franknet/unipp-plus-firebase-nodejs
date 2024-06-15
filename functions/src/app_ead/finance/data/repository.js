
const API = require("../data/api");

exports.fetchPeriods = (session) => API.fetchPeriods(session);
exports.fetchExtract = (session, period) => API.fetchExtract(session, period);
