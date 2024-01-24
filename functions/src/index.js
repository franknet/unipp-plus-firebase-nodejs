/* eslint-disable max-len */

require("firebase-admin").initializeApp();

const { Functions } = require("./core").Firebase;

const app = require("./app");
exports.sign_in = Functions.onCall(app.signIn.signInHandler);
// exports.fetch_notifications = onCall(app.notifications.fetchNotificationsHandler);
// exports.fetch_grades = onCall(app.grades.fetchGradesHandler);
// exports.fetch_academic_records = onCall(app.academicRecords.fetchAcademicRecordsHandler);
// exports.fetch_extract = onCall(app.finance.fetchExtractHandler);
// exports.fetch_bills = onCall(app.finance.fetchBillshandler);

// const eadApp = require("./app_ead");
// exports.ead_fetch_notifications = onCall(eadApp.notifications.fetchNotificationsHandler);
// exports.ead_fetch_grades = onCall(eadApp.grades.fetchGradesHandler);
// exports.ead_fetch_academic_records = onCall(eadApp.academicRecords.fetchAcademicRecordsHandler);
