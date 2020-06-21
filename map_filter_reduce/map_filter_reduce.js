arr = [1, 2, 3, 4, 5, 6, 1.5]

mapped = arr.map(item => item * 2)
console.log(mapped);

filtered = arr.filter(item => item <= 3)
console.log(filtered);

reduce = arr.reduce((acc, cum) => (acc + cum), 0)
console.log(reduce);

sort = arr.sort((a, b) => a - b)
console.log(sort);