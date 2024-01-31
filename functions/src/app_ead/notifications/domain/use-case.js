/* eslint-disable max-len */

const {Errors, Logger} = require("up-core").Firebase;
const _ = require("lodash");

const Repository = require("../data/repository");
const Builder = require("./builder");


exports.fetchNotifications = async (session) => {
  try {
    const {data} = await Repository.fetchNotifications(session);
    const notifications = Builder.build(data);
    await Promise.all(fetchAttachmentsTasks(notifications, session));
    return {
      data: notifications,
    };
  } catch (error) {
    throw Errors.onError(error);
  }
};

const containsAttachments = (notification) => !_.isNil(notification["attachmentId"]);

const filterNotifications = (notifications) => _.filter(notifications, containsAttachments);

const fetchAttachmentsTasks = (notifications, session) => {
  return _.flatMap(filterNotifications(notifications), (notification) => fetchAttachments(session, notification));
};

const fetchAttachments = async (session, notification) => {
  const {data} = await Repository.fetchAttachments(session, notification["id"]);
  await Promise.all(_.flatMap(data, (attachment) => saveAttachment(session, notification, attachment)));
  notification["attachments"] = data;
};

const saveAttachment = async (session, notification, attachment) => {
  try {
    const filePath = `${session["user"]["rg"]}/${notification["id"]}/${attachment["nome_arq"]}`;
    const file = Repository.fetchAttachmentFile(filePath);
    const existis = await file.exists()[0];
    if (existis) {
      return true;
    }
    const {data} = await Repository.downloadAttachment(session, notification["id"], attachment["idAnexo"]);
    return await Repository.saveAttachmentFile(file, data);
  } catch (error) {
    Logger.trackError(error);
    return false;
  }
};
