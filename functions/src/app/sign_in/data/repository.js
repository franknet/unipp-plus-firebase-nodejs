/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */

const API = require("./api");
const Storage = require("firebase-admin").storage().bucket();
const {Status} = require("../../../utils/status-code-validations");

/**
 * @param {{identificacao:string,senha:string}} credentials
 */
exports.signIn = (credentials) => API.singIn(credentials);

exports.fetchSystems = (token) => API.fetchSystems(token);

exports.fetchSec = (cookie, secUrl) => API.fetch({
  cookie: cookie,
  url: secUrl,
  validateStatus: Status.redirect,
});

exports.fetchStudentPhoto = (cookie) => API.fetchStudentPhoto(cookie);

exports.fetchUserPhotoFile = (userRg) => Storage.file(`photos/${userRg}.png`);

/**
 * @param {File} file
 * @param {String} base64
 * @returns {Promise<boolean>}
 */
exports.saveUserImage = (file, base64) => new Promise((resolve, reject) => {
  const data = Buffer.from(base64, "base64");
  const stream = file.createWriteStream({
    contentType: "image/png",
  });
  stream.write(data);
  stream.end();
  stream.on("finish", resolve(true));
  stream.on("error", reject);
});
