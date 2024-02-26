const {HttpClient, HttpStatus} = require("up-core").Http;
const Firestore = require("./firestore");

// eslint-disable-next-line max-len
const creds = `${process.env.PAYMENT_SERVICE_USERNAME}:${process.env.PAYMENT_SERVICE_API_SECRET}`;

exports.createCustomer = async (user) => {
  const customer = await Firestore.fetchCustomer(user);

  if (customer) {
    return;
  }

  const response = await HttpClient.request({
    url: `${process.env.PAYMENT_SERVICE_ENDPOINT}/customers`,
    method: "post",
    headers: {
      "Authorization": `Basic ${Buffer.from(creds).toString("base64")}`,
    },
    data: {
      email: user.email,
      reference_id: user.uid,
    },
    validateStatus: HttpStatus.Ok,
  });

  return response.data;
};
