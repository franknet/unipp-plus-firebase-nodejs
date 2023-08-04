/* eslint-disable max-len */

const API = require("./api");

exports.fetchAcademicRecords = async (session) => {
  return (await API.fetchAcademicRecords(session)).data;
};
