const combinatorics = require('js-combinatorics');
const _ = require('lodash');
const flatten = require('@flatten/array');
const permutate = require('./permutate');
const operations = require('./operations');
const memorize = require('./memorize');
const { getCacheKey, getSortedCacheKey } = require('./getCacheKey');

function isAcceptable(n) {
  return n > 0 && Number.isInteger(n);
}

const getPermutations = memorize(permutate, getSortedCacheKey);

const processSequence = memorize(function processSequence(sequence) {
  return sequence.length === 1 ? sequence : flatten(getPermutations(sequence).map(getPossibleNumbers));
}, getSortedCacheKey);

const getPossibleNumbers = memorize(function getPossibleNumbers(sequence) {
  const permutations = _.uniqBy(processOperations(sequence), getSortedCacheKey);
  const processedSequences = permutations.map(processSequence);
  return _.uniq(flatten(processedSequences)).filter(isAcceptable);
}, getCacheKey);

function processOperations(sequence) {
  return operations.map(operation => {
    const remainingNumbers = sequence.slice(2);
    remainingNumbers.push(operation(sequence[0], sequence[1]));
    return remainingNumbers;
  });
}

function possibleOutcomes(dies) {
  const sequences = combinatorics.cartesianProduct(...dies).toArray()
    .map(getPermutations).flat(1);

  const uniqueSequences = _.uniqBy(sequences, getCacheKey);
  const possibleOutcomes = uniqueSequences.map(getPossibleNumbers);
  const result = flatten(possibleOutcomes);

  return _.uniq(result).filter(isAcceptable);
}

module.exports = possibleOutcomes;
