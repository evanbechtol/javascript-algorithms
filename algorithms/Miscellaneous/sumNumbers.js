function sumNumbers(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sumNumbers([1,3,10]))
