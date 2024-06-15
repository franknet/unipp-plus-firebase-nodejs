
const API = require("../api/sec-api");

exports.fetchSec = (url) => API.fetchSec(url);
exports.fetchSec2 = ({url, cookie}) => API.fetchSec2({url, cookie});
exports.fetchStudentProfile = (cookie) => API.fetchStudentProfile(cookie);
