const Combinatorics = require('js-combinatorics');
const _ = require('lodash');
const permutate = require('./permutate');
const operations = require('./operations');
const memorize = require('./memorize');
const { getSortedCacheKey } = require('./getCacheKey');

const getPermutations = memorize(permutate, getSortedCacheKey);

function possibleOutcomes(dies) {
  const possibleNums = dice => {
    if(dice.length == 1){
      return dice;
    }
    const out = [];
    const rolls = getPermutations(dice);
    let test = [];
    for(let x of rolls){
      for(let y of operations){
        const v = x.slice(2,x.length);
        v.push(y(x[0],x[1]));
        test.push(v);
      }
    }
    test = _.uniqBy(test,r=>r.sort().join(','));
    for(let x of test){
      const u = possibleNums(x);
      for(let y of u){
        out.includes(y) || out.push(y);
      }
    }
    return out;
  };

  const result = [];
  const rolls = Combinatorics.cartesianProduct(...dies).toArray();
  const uRolls = _.uniqBy(rolls,r=>r.sort().join(','));
  for(let x of uRolls){
    const key = x.join(',');
    const nums = possibleNums(x);
    const o = nums.filter(r => r > 0 && Number.isInteger(r));
    result.push(o);
  }
  return _.uniq(result.flat());
}

module.exports = possibleOutcomes;
