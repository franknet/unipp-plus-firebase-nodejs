/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const {Errors} = require("up-core").Firebase;
const SecUseCase = require("./sec-use-case");
const EadUseCase = require("./ead-use-case");

exports.fetchRecords = (session) => checkStudentCourseType(session)
    .then(onCheckStudentCourseType)
    .catch(Errors.onError);

async function checkStudentCourseType(session) {
  const isEad = session["student"]["isEad"] === true;
  return {session, isEad};
}

async function onCheckStudentCourseType({session, isEad}) {
  if (isEad) {
    return EadUseCase.fetchRecords(session);
  } else {
    return SecUseCase.fetchRecords(session);
  }
}
