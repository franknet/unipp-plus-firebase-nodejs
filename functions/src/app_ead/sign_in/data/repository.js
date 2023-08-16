/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
const API = require("./api");

/**
 * @param {{username:string,password:string,pagina:string}} credentials
 */
exports.signIn = (credentials) => API.singIn(credentials);
exports.fetchContract = (cookie, userCode) => API.fetchContract(cookie, userCode);
exports.fetchUser = (cookie, userId) => API.fetchUser(cookie, userId);
