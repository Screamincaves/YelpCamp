module.exports = (func) => {
  //Passes in a function and handles any errors, replaces the need for try/catch
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
