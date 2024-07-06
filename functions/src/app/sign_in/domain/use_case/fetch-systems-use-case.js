
const Repository = require("../../data/respository");

exports.fetchSystems = async (token) => {
  const tokenBuffer = Buffer.from(`br.unip.central-aluno:${token}`);
  const authentication = `Basic ${tokenBuffer.toString("base64")}`;
  const {data} = await Repository.fetchSystems(authentication);
  return data;
};
