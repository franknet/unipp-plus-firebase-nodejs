/* eslint-disable max-len */

require("firebase-admin").initializeApp();

const {Functions} = require("up-core").Firebase;

const app = require("./app");
exports.sign_in = Functions.onCall(app.signIn.signInHandler);
exports.fetch_notifications = Functions.onCall(app.notifications.fetchNotificationsHandler);
exports.fetch_student_records = Functions.onCall(app.studentRecords.fetchSudentRecordsHandler);
exports.fetch_academic_records = Functions.onCall(app.academicRecords.fetchAcademicRecordsHandler);
exports.fetch_extract = Functions.onCall(app.finance.fetchExtractHandler);
exports.fetch_bills = Functions.onCall(app.finance.fetchBillshandler);

const eadApp = require("./app_ead");
exports.ead_fetch_notifications = Functions.onCall(eadApp.notifications.fetchNotificationsHandler);
exports.ead_fetch_grades = Functions.onCall(eadApp.grades.fetchGradesHandler);
exports.ead_fetch_academic_records = Functions.onCall(eadApp.academicRecords.fetchAcademicRecordsHandler);

const paymentService = require("./payment_service");
exports.payment_service_sync_customer = Functions.beforeUserSignedIn(paymentService.customers.syncCustomer);
exports.payment_service_sync_product = Functions.onProductCreated(paymentService.products.syncProduct);
