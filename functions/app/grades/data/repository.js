/* eslint-disable max-len */

const API = require("./api");
const HTMLParser = require("../../../utils/html-parser");

exports.fetchNF = async (cookie) => {
  const html = (await API.fetchNF(cookie)).data;
  const labels = ["cod", "discipline", "special", "type", "obs", "np1", "np2", "mf", "obsences"];
  return HTMLParser.table(html, "table-striped", labels);
};

exports.fetchME = async (cookie) => {
  const html = (await API.fetchME(cookie)).data;
  const labels = ["cod", "discipline", "special", "type", "obs", "obsences", "ms", "ex", "mf"];
  return HTMLParser.table(html, "table-striped", labels);
};
