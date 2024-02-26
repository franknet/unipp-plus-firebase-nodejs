
module.exports = {
  Ok: (status) => status === 200,
  Created: (status) => status === 201,
  Redirect: (status) => status === 302,
};
