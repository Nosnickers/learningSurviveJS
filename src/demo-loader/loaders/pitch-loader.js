const loaderUtils = require("loader-utils");

module.exports = function (input) {
  console.log('pitch exports', input + loaderUtils.getOptions(this).text)
  return input + loaderUtils.getOptions(this).text;
};
module.exports.pitch = function (remaining, preceding, input) {
  console.log(`Remaining: ${remaining}, preceding: ${preceding}
Input: ${JSON.stringify(input, null, 2)}
  `);

  return "pitched";
};
