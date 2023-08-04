
const API = require("./api");
const storageBucket = require("firebase-admin").storage().bucket();

exports.signIn = async (credentials) => {
  return (await API.singIn(credentials)).data;
};

exports.fetchSystems = async (token) => {
  const {headers, data} = await API.fetchSystems(token);
  return {
    "cookie": headers["set-cookie"],
    "systems": data,
  };
};

exports.fetchSec = async (cookie, secUrl) => {
  const {headers} = await API.fetchResource(cookie, secUrl, 302);
  return {
    "cookie": headers["set-cookie"],
    "home-url": headers["location"],
  };
};

exports.fetchHome = async (cookie, secUrl) => {
  await API.fetchResource(cookie, secUrl, 302);
};

exports.fetchStudentPhoto = async (cookie) => {
  return (await API.fetchStudentPhoto(cookie)).data;
};

exports.userPhotoFile = (userRg) => storageBucket.file(`photos/${userRg}.png`);

/**
 *
 * @param {File} file
 * @param {String} base64
 * @returns {Promise<boolean>}
 */

exports.saveUserImage = function(file, base64) {
  const data = Buffer.from(base64, "base64");
  const stream = file.createWriteStream({
    contentType: "image/png",
  });
  return new Promise((resolve, reject) => {
    stream.write(data);
    stream.end();
    stream.on("finish", resolve(true));
    stream.on("error", reject);
  });
};
