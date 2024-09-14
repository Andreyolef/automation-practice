//Task 1
let i = 1;
while (i < 346) {
  console.log(`Task#1: ${i}`);
  i++;
}

// Task 2
let result = 0;
for (let i = 1; i <= 100; i++) {
  result = result + i;
  if (i === 100) {
    console.log(`Task#2: ${result}`);
  }
}

//task 3
let inc = 241;
do {
  console.log(`Task#3: ${inc} `);
  inc--;
} while (inc >= 1);
