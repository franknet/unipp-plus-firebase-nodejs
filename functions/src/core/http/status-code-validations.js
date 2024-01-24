
module.exports = {
  Ok: (status) => status == 200,
  Redirect: (status) => status == 302,
};
