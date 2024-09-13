import { test, expect } from "@playwright/test";

function isEven(n: number) {
  if (n % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

test("IF-1 Number is even", async ({}) => {
  expect(isEven(2)).toBeTruthy;
});

test("IF-1 Number is odd", async ({}) => {
  expect(isEven(3)).toBeFalsy;
});

function greaterOfTwo(firstNumber: number, secondNumber: number) {
  if (firstNumber > secondNumber) {
    return `${firstNumber} is greater then ${secondNumber}`;
  } else if (firstNumber === secondNumber) {
    return `${firstNumber} is equal to ${secondNumber}`;
  } else {
    return `${secondNumber} is greater then ${firstNumber}`;
  }
}

test("IF-2 one number is greater", async ({}) => {
  expect(greaterOfTwo(2, 4)).toMatch("4 is greater then 2");
});

test("IF-2 numbers are equal", async ({}) => {
  expect(greaterOfTwo(2, 2)).toMatch("2 is equal to 2");
});
