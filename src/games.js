import readlineSync from 'readline-sync';

// переменные
let userName;
let firstRandomNumber;
let resultOfCorrectAnswer;
let isGameOver;

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

// вопрос пользователю
const question = (nameGame) => {
  firstRandomNumber = getRandom(2, 100);
  let questionResult;
  switch (nameGame) {
    case 'brain-even':
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

// Функция определения правильного ответа в зависимости от названия игры
const correctAnswer = (nameGame) => {
  switch (nameGame) {
    case 'brain-even':
      brainEvenCorrectAnswer(firstRandomNumber);
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
