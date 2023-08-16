/* eslint-disable max-len */

const admin = require("firebase-admin");
admin.initializeApp();

const {onCall} = require("./utils/https-function");
const {signInHandler} = require("./app/sign_in/controller");
const {fetchGradesHandler} = require("./app/grades/controller");
const {fetchAcademicRecordsHandler} = require("./app/academic_records/controller");
const {fetchExtractHandler, fetchBillshandler} = require("./app/finance/controller");

exports.sign_in = onCall(signInHandler);
exports.fetch_grades = onCall(fetchGradesHandler);
exports.fetch_academic_records = onCall(fetchAcademicRecordsHandler);
exports.fetch_extract = onCall(fetchExtractHandler);
exports.fetch_bills = onCall(fetchBillshandler);
