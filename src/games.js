import readlineSync from 'readline-sync';

// переменные
let userName;
let sign;
let firstRandomNumber;
let secondRandomNumber;
let resultOfCorrectAnswer;
let isGameOver;
let hideOfProgressionNumber;
let stepForProgression;

// приведствие и получение имени пользователя
const greetings = () => {
  userName = readlineSync.question('Welcome to the Brain Games! \nMay I have your name? ');
  console.log(`${'Hello,'} ${userName}${'!'}`);
};

// получение имени пользователя
const getUsersName = () => userName;

// правила игр
const rulesOfGame = (nameGame) => {
  switch (nameGame) {
    case 'brain-even':
      console.log('Answer "yes" if the number is even, otherwise answer "no".');
      break;
    case 'brain-calc':
      console.log('What is the result of the expression?');
      break;
    case 'brain-gcd':
      console.log('Find the greatest common divisor of given numbers.');
      break;
    case 'brain-progression':
      console.log('What number is missing in the progression?');
      break;
    case 'brain-prime':
      console.log('Answer "yes" if given number is prime. Otherwise answer "no".');
      break;
    default:
      console.log('Sorry, something wrong');
      break;
  }
};

// вывод рандомного числа
function getRandom(min, max) {
  const minCopy = Math.ceil(min);
  const maxCopy = Math.floor(max);
  return Math.floor(Math.random() * (maxCopy - minCopy)) + minCopy;
}

// вывод рандомного математического знака
const getRandomMathSign = () => {
  const mas = ['+', '-', '*'];
  const i = Math.floor(Math.random() * mas.length);
  const operator = mas[i];
  return operator;
};

// вывод вопроса для игры brain progression
const progression = () => {
  stepForProgression = getRandom(2, 10);
  const hideOfIndexNumber = getRandom(1, 10);
  let mas = [];
  const endProgression = firstRandomNumber + stepForProgression * 10;
  for (
    let i = firstRandomNumber;
    i < endProgression;
    i += stepForProgression
  ) {
    mas.push(i);
  }
  hideOfProgressionNumber = mas.splice(hideOfIndexNumber, 1, '..');
  mas = mas.join(' ');
  return mas;
};

// вопрос пользователю
const question = (nameGame) => {
  firstRandomNumber = getRandom(2, 100);
  secondRandomNumber = getRandom(1, 100);
  sign = getRandomMathSign();
  let questionResult;
  switch (nameGame) {
    case 'brain-even':
      questionResult = console.log(`${'Question:'} ${firstRandomNumber}`);
      break;
    case 'brain-calc':
      questionResult = console.log(`${'Question:'} ${firstRandomNumber} ${sign} ${secondRandomNumber}`);
      break;
    case 'brain-gcd':
      questionResult = console.log(`${'Question:'} ${firstRandomNumber} ${secondRandomNumber}`);
      break;
    case 'brain-progression':
      questionResult = console.log(`${'Question:'} ${progression(firstRandomNumber, stepForProgression)}`);
      break;
    case 'brain-prime':
      questionResult = console.log(`${'Question:'} ${firstRandomNumber}`);
      break;
    default:
      console.log('Sorry, something wrong');
      break;
  }
  return questionResult;
};

// получение ответа пользователя
const getUsersAnswer = () => readlineSync.question('Your answer: ');

// проверка правильного ответа в brain even
const brainEvenCorrectAnswer = (a) => {
  if (a % 2 === 0) {
    resultOfCorrectAnswer = 'yes';
  } else if (a % 2 !== 0) {
    resultOfCorrectAnswer = 'no';
  }
  return resultOfCorrectAnswer;
};

const textOfcorrectAnswer = () => {
  console.log('Correct!');
};

// расчет правильно ответа для игры brain calc
const brainCalcCorrectAnswer = (a, b) => {
  if (sign === '+') {
    resultOfCorrectAnswer = a + b;
  } else if (sign === '-') {
    resultOfCorrectAnswer = a - b;
  } else {
    resultOfCorrectAnswer = a * b;
  }
  return resultOfCorrectAnswer;
};

// расчет правильно ответа для игры brain gcd

const brainGcdCorrectAnswer = (a, b) => {
  if (!b) {
    return a;
  }
  return brainGcdCorrectAnswer(b, a % b);
};

// расчет правильно ответа для игры brain prime
const brainPrimeCorrectAnswer = (a) => {
  for (let i = 2; i < a; i += 1) {
    if (a % i === 0) {
      return 'no';
    }
  }
  return 'yes';
};

// определение правильного ответа в зависимости от названия игры
const correctAnswer = (nameGame) => {
  switch (nameGame) {
    case 'brain-even':
      brainEvenCorrectAnswer(firstRandomNumber);
      break;
    case 'brain-calc':
      brainCalcCorrectAnswer(firstRandomNumber, secondRandomNumber);
      break;
    case 'brain-gcd':
      resultOfCorrectAnswer = brainGcdCorrectAnswer(firstRandomNumber, secondRandomNumber);
      break;
    case 'brain-progression':
      resultOfCorrectAnswer = hideOfProgressionNumber;
      break;
    case 'brain-prime':
      resultOfCorrectAnswer = brainPrimeCorrectAnswer(firstRandomNumber);
      break;
    default:
      console.log('Sorry, something wrong');
      break;
  }
  return resultOfCorrectAnswer.toString();
};

// сравнение правильного результата с результатом пользователя
const compareOfAnswer = (nameGame) => {
  const userAnswer = getUsersAnswer();
  const answer = correctAnswer(nameGame);
  if (answer === userAnswer) {
    textOfcorrectAnswer();
  } else {
    console.log(`${userAnswer} ${'is wrong answer ;(. Correct answer was'} ${answer}.\n${"Let's try again,"} ${getUsersName()}!`);
    isGameOver = 'true';
  }
};

// запуск игры по названию
const runGameWithCounter = (nameGame) => {
  greetings();
  rulesOfGame(nameGame);
  const count = 3;
  let i = 0;
  while (i < count && isGameOver !== 'true') {
    question(nameGame);
    correctAnswer(nameGame);
    compareOfAnswer(nameGame);
    i += 1;
  }
  if (i === 3 && isGameOver !== 'true') {
    console.log(`${'Congratulations,'} ${getUsersName()}!`);
  }
};
export default runGameWithCounter;