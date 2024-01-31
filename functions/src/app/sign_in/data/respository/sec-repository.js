
const API = require("../api/sec-api");

exports.fetchSec = (url) => API.fetchSec(url);
exports.fetchStudentProfile = (cookie) => API.fetchStudentProfile(cookie);
