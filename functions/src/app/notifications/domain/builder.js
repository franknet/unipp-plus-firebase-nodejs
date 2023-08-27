
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const cheerio = require("cheerio");
const TurndownService = require("turndown");
const {debugLog} = require("../../../utils/logger");

exports.buildNotifications = (html) => {
  const notifications = [];
  const $ = cheerio.load(html);
  const notificationsNodes = $(".modal-body", "#carrosselPopupDskMob");
  notificationsNodes.each((i, elem) => {
    const markdownText = new TurndownService().turndown($(elem).html());
    debugLog("notification", markdownText);
    notifications.push(markdownText);
  });
  return {
    "data": notifications,
  };
};
