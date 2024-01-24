/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */

const Api = require("./api");
/**
 * @returns {Promise<import("axios").AxiosResponse>}
 */
exports.signIn = (credentials) => Api.singIn(credentials);
/**
 * @returns {Promise<import("axios").AxiosResponse>}
 */
exports.fetchSystems = (token) => Api.fetchSystems(token);
/**
 * @param {import("axios").AxiosRequestConfig} config
 * @returns {Promise<import("axios").AxiosResponse>}
 */
exports.fetch = (config) => Api.fetch(config);
/**
 * @returns {Promise<import("axios").AxiosResponse>}
 */
exports.fetchStudentProfile = (cookie) => Api.fetchStudentProfile(cookie);
