const parser = require("cheerio");
const _ = require("lodash");

exports.table = function(html, className, keys, valueType) {
  const objs = [];
  const doc = parser.load(html);
  const table = doc(`.${className}`).first();
  let trs = table.find("tr");
  trs = trs.slice(1); // remove table header
  const tdInterceptor = (index, td) => {
    const key = keys[index];
    const value = valueType == "html" ? doc(td).html() : doc(td).text().trim();
    if (!_.isNil(key)) {
      _.last(objs)[key] = value;
    }
  };
  const trInterceptor = (_, tr) => {
    objs.push({});
    doc(tr).find("td").each(tdInterceptor);
  };
  trs.each(trInterceptor);
  return objs;
};

exports.getElementById = function(html, id) {
  const $ = parser.load(html);
  const obj = $(`#${id}`);

  if (_.isNil(obj)) {
    return null;
  }

  return {
    "value": $(obj).val(),
    "text": $(obj).text(),
    "attrs": $(obj).attr(),
  };
};

exports.getElementByClass = function(html, className) {
  const $ = parser.load(html);
  const elements = $(`.${className}`);

  if (_.isNil(elements)) {
    return null;
  }

  return $(elements).map((i, el) => {
    return {
      "value": $(this).val(),
      "text": $(this).text(),
      "attrs": $(this).attr(),
    };
  });
};
