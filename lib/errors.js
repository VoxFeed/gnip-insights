const buildError = (name, msg) => {
  const error = new Error(msg);
  error.name = name;
  return error;
};

const InvalidCredentials = msg => buildError('INVALID_CREDENTIALS', msg);
const RequestFailed = msg => buildError('REQUEST_FAILED', msg);

module.exports = {
  InvalidCredentials,
  RequestFailed
};
