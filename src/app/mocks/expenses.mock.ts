
import { Expense } from '@models/expense';

function getRandomDate(): Date {
  const date = new Date();
  date.setMonth(2);
  date.setDate(Math.random() * 30 + 1);
  return date;
}


function getRandomValue() {
  return Math.floor(Math.random() * 30000) / 100;
}

function generateExpenses(): Expense[] {
  const randomExpenses = [];
  for (let i = 0; i < 10; i++) {
    randomExpenses.push(
      {
        id: i,
        value: getRandomValue(),
        datetime: getRandomDate(),
        //...getRandomCategory()
      }
    );
  }
  return randomExpenses.sort((a, b) => a.datetime - b.datetime);
}

export const expenses = generateExpenses();
