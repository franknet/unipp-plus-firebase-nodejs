/* eslint-disable max-len */
const credentials = `${process.env.PAYMENT_SERVICE_USERNAME}:${process.env.PAYMENT_SERVICE_API_SECRET}`;

exports.basicAuthHeader = `Basic ${Buffer.from(credentials).toString("base64")}`;
