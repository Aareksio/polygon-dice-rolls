const algorithms = {
  new: require('./new'),
  old: require('./old')
};

function test(algorithm, dies) {
  const start = Date.now();
  const result = algorithm(dies);
  return { time: Date.now() - start, result };
}

const selectedAlgorithm = algorithms[process.argv[2]];
if (!selectedAlgorithm) throw new Error('Selected algorithm unavailable');

const dies = new Array(4).fill([1, 2, 3, 4, 5, 6]);
const { time, result } = test(selectedAlgorithm, dies);
console.log(`  - Time: ${time}ms`);
console.log(`  - Possible numbers: ${result.length}`);
