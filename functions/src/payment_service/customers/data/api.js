const {HttpClient, HttpStatus} = require("up-core").Http;
const Firestore = require("./firestore");
const {basicAuthHeader} = require("../../config");

exports.createCustomer = async (user) => {
  const customer = await Firestore.fetchCustomer(user);

  if (customer) {
    return;
  }

  const response = await HttpClient.request({
    url: `${process.env.PAYMENT_SERVICE_ENDPOINT}/customers`,
    method: "post",
    headers: {
      "Authorization": basicAuthHeader,
    },
    data: {
      email: user.email,
      reference_id: user.uid,
    },
    validateStatus: HttpStatus.Created,
  });

  return response.data;
};
