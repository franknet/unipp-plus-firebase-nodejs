
const API = require("../api/api");

exports.signIn = (credentials) => API.singIn(credentials);
exports.fetchSystems = (token) => API.fetchSystems(token);
