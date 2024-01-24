/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const { HttpClient, HttpStatus } = require("../../../core").Http;

exports.fetchNotifications = (session) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/${session["user"]["id"]}/alunos/${session["user"]["rg"]}/avisos`,
  headers: { "Cookie": session["cookie"] },
  validateStatus: HttpStatus.Ok
});
exports.fetchAttachments = (session, notificationId) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/cod_aviso/${notificationId}/lista_anexo_aviso`,
  headers: { "Cookie": session["cookie"] },
  validateStatus: HttpStatus.Ok
});

exports.downloadAttachment = (session, notificationId, attachmentId) => HttpClient.request({
  url: `https://gfa.unip.br/aluno/apix/pessoas/cod_aviso/${notificationId}/cod_anexo/${attachmentId}/baixar_anexo_aviso`,
  headers: { "Cookie": session["cookie"] },
  responseType: "arraybuffer",
  validateStatus: HttpStatus.Ok
});
