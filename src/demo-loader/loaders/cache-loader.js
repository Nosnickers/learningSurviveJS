const cache = new Map();

module.exports = function (content) {
  // Calls only once for given resourcePath
  const callbacks = cache.get(this.resourcePath);
  callbacks.forEach((callback) => callback(null, content));
  cache.set(this.resourcePath, content);
  // console.log('exports' ,JSON.stringify(content, null, 4), JSON.stringify(this, null, 4))
  return content;
};
module.exports.pitch = function () {
  if (cache.has(this.resourcePath)) {
    const item = cache.get(this.resourcePath);

    if (item instanceof Array) {
      item.push(this.async()); // Load to cache
    } else {
      return item; // Hit cache
    }
  } else {
    cache.set(this.resourcePath, []); // Missed cache
  }
  console.log('pitch', JSON.stringify(cache, null, 4))
};