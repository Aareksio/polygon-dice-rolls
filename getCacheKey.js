function getCacheKey(sequence) {
  return sequence.join('|');
}

function getSortedCacheKey(sequence) {
  return getCacheKey([...sequence].sort())
}

module.exports = {
  getCacheKey,
  getSortedCacheKey
};
