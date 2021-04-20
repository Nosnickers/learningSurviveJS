module.exports = function (input) {
  const callback = this.async();

  // No callback -> return synchronous results
  // if (callback) { ... }

  callback(null, input + input);
  // callback(new Error("Demo error"));
};

module.exports.raw = true
// module.exports = () => "foobar";