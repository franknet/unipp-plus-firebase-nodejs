
const API = require("../api/ead-api");

exports.signIn = (credentials) => API.singIn(credentials);
exports.fetchContract = (cookie, userRg) => API.fetchContract(cookie, userRg);
exports.fetchUser = (cookie, userId) => API.fetchUser(cookie, userId);
