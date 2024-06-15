/* eslint-disable max-len */

require("firebase-admin").initializeApp();
const {Functions} = require("up-core").Firebase;
const express = require("express");
const app = express();

const sec = require("./app");
app.post("/sign_in", sec.signIn.signInHandler);
app.get("/notifications", sec.notifications.fetchNotificationsHandler);
app.get("/student_records", sec.studentRecords.fetchSudentRecordsHandler);
app.get("/academic_records", sec.academicRecords.fetchAcademicRecordsHandler);
app.get("/finance/extract", sec.finance.fetchExtractHandler);
app.get("/finance/bills", sec.finance.fetchBillshandler);

const secEad = require("./app_ead");
app.get("/ead/notifications", secEad.notifications.fetchNotificationsHandler);
app.get("/ead/student_records", secEad.studentRecords.fetchStudentRecordsHandler);
app.get("/ead/academic_records", secEad.academicRecords.fetchAcademicRecordsHandler);

exports.api = Functions.onRequest(app);
