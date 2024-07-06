/* eslint-disable max-len */

require("firebase-admin").initializeApp();
const {Functions} = require("up-core").Firebase;
const express = require("express");
const app = express();

const {signIn} = require("./app");

app.post("/v1/sign_in", signIn.signInHandler);
// app.get("/profile", profile.fetchProfileHandler);
// app.get("/notifications", sec.notifications.fetchNotificationsHandler);
// app.get("/student_records", sec.studentRecords.fetchSudentRecordsHandler);
// app.get("/academic_records", sec.academicRecords.fetchAcademicRecordsHandler);
// app.get("/finance/extract", sec.finance.fetchExtractHandler);
// app.get("/finance/bills", sec.finance.fetchBillshandler);

exports.api = Functions.onRequest(app);
