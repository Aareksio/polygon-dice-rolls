module.exports = function memorize(f, generateKey) {
  const cache = new Map();

  return function memorized(...args) {
    const cacheKey = generateKey(...args);
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    const result = f(...args);
    cache.set(cacheKey, result);
    return result;
  }
};
