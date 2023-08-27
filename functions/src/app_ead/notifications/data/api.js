/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const {request} = require("../../../utils/http-client");
const {Status} = require("../../../utils/status-code-validations");

exports.fetchNotifications = (session) => request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["user"]["id"]}/alunos/${session["user"]["rg"]}/avisos`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});
exports.fetchAttachments = (session, notificationId) => request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/cod_aviso/${notificationId}/lista_anexo_aviso`,
  headers: {"Cookie": session["cookie"]},
  validateStatus: Status.Ok,
});

exports.downloadAttachment = (session, notificationId, attachmentId) => request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/cod_aviso/${notificationId}/cod_anexo/${attachmentId}/baixar_anexo_aviso`,
  headers: {"Cookie": session["cookie"]},
  responseType: "arraybuffer",
  validateStatus: Status.Ok,
});
