import dayjs from 'dayjs';

const getRandomNumber = (minNumber, maxNumber, digits = 0) => {
  // if (minNumber < 0 || maxNumber < 0) {
  //   throw new RangeError('Диапазон может быть только положительным');
  // }

  let randomNumber = maxNumber - Math.random() * (maxNumber - minNumber);
  randomNumber *= 10**digits;
  randomNumber = Math.round(randomNumber);
  randomNumber /= 10**digits;

  if (randomNumber < Math.min(minNumber, maxNumber) || randomNumber > Math.max(minNumber, maxNumber)) {
    throw new RangeError('Невозможно получить число с таким округлением в заданном диапазоне');
  }

  return randomNumber;
};

const getRandomInteger = (minNumber, maxNumber) => getRandomNumber(minNumber, maxNumber);

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const generateRandomArray = (lengthRange, generateElement) => Array.from(
  {length: getRandomInteger(lengthRange[0], lengthRange[1])},
  generateElement,
);

const createRandomUniqueIntegerGenerator = (min, max) => {
  const generatedValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);

    if (generatedValues.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа диапазона');
    }

    while (generatedValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    generatedValues.push(currentValue);
    return currentValue;
  };
};

// Работа с датами
const createNewDateChain = (startDate = dayjs()) => {
  // каждая следующая дата после предыдущейы
  let date = startDate;

  return ({
    from(timeBetweenEvents) {
      date = dayjs(date).add(timeBetweenEvents, 'minute');

      return date;
    },
    to(eventDuration) {
      date = dayjs(date).add(eventDuration, 'minute');

      return date;
    }
  });
};

const formatDate = (date, dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ') => dayjs(date).format(dateFormat);

const getDateDifference = (date1, date2) => {
  const difference = Math.abs(date1.diff(date2, 'minute'));

  const days = Math.floor(difference / 60 / 24);
  const hours = Math.floor(difference % (60*24) / 60);
  const minutes = difference % 60;

  return `${days >= 1 ? `${days}D`: ''} ${hours >= 1 ? `${hours  }H` : ''} ${minutes < 10 ? '0' : ''}${minutes}M`;
};

export {
  getRandomArrayElement,
  getRandomInteger,
  generateRandomArray,
  createRandomUniqueIntegerGenerator,
  createNewDateChain,
  formatDate,
  getDateDifference,
};
