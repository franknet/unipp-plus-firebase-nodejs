/* eslint-disable max-len */
const repository = require("../data/repository");
const {onError} = require("../../../utils/https-errors");
const {trackError} = require("../../../utils/logger");
const notificationsBuilder = require("./builder");
const _ = require("lodash");

exports.fetchNotifications = async (session) => {
  try {
    const {data} = await repository.fetchNotifications(session);
    const notifications = notificationsBuilder.build(data);
    await Promise.all(fetchAttachmentsTasks(notifications, session));
    return {
      data: notifications,
    };
  } catch (error) {
    throw onError(error);
  }
};

const containsAttachments = (notification) => !_.isNil(notification["attachmentId"]);

const filterNotifications = (notifications) => _.filter(notifications, containsAttachments);

const fetchAttachmentsTasks = (notifications, session) => {
  return _.flatMap(filterNotifications(notifications), (notification) => fetchAttachments(session, notification));
};

const fetchAttachments = async (session, notification) => {
  const {data} = await repository.fetchAttachments(session, notification["id"]);
  await Promise.all(_.flatMap(data, (attachment) => saveAttachment(session, notification, attachment)));
  notification["attachments"] = data;
};

const saveAttachment = async (session, notification, attachment) => {
  try {
    const filePath = `${session["user"]["rg"]}/${notification["id"]}/${attachment["nome_arq"]}`;
    const file = repository.fetchAttachmentFile(filePath);
    const existis = await file.exists()[0];
    if (existis) {
      return true;
    }
    const {data} = repository.downloadAttachment(session, notification["id"], attachment["idAnexo"]);
    return await repository.saveAttachmentFile(file, data);
  } catch (error) {
    trackError(error);
    return false;
  }
};
