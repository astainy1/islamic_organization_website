exports.test = (req, res) => {
  let result = doesNotExist(); // ReferenceError
  res.send(result);
};
