const {HttpClient, HttpStatus} = require("up-core").Http;
const Firestore = require("./firestore");
const {basicAuthHeader} = require("../../config");

exports.createProduct = async (product) => {
  if (product.paymentServiceProductId) {
    return;
  }

  const {data} = await HttpClient.request({
    url: `${process.env.PAYMENT_SERVICE_ENDPOINT}/products`,
    headers: {
      Authorization: basicAuthHeader,
    },
    data: {
      reference_id: product.id,
      name: product.name,
    },
    validateStatus: HttpStatus.Created,
  });

  await Firestore.updateProduct(data);

  return data;
};
