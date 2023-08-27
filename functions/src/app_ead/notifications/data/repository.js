/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
const API = require("./api");
const Storage = require("firebase-admin").storage().bucket("attachments");

exports.fetchNotifications = (session) => API.fetchNotifications(session);

exports.fetchAttachments = (session, notificationId) => API.fetchAttachments(session, notificationId);

exports.downloadAttachment = (session, notificationId, attachmentId) => API.downloadAttachment(session, notificationId, attachmentId);

exports.fetchAttachmentFile = (fileName) => Storage.file(fileName);

/**
 * @param {File} file
 */
exports.saveAttachmentFile = (file, pdfData) => new Promise((resolve, reject) => {
  const stream = file.createWriteStream({
    contentType: "application/pdf",
  });
  stream.write(pdfData);
  stream.end();
  stream.on("finish", resolve(true));
  stream.on("error", reject);
});
