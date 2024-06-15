
const {Errors} = require("up-core/firebase");
const Repository = require("../data/repository");

exports.fetchPaymentsSummary = (session) => Repository.fetchPeriods(session)
    .catch(Errors.onError);
