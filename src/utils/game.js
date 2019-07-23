/**
 * Обработчик быков и коров
 * @param input {string} догадка пользователя
 * @param secret {string} секрет, который необходимо отгадать
 * @return {string}
 */
export function bullAndCow(input, secret) {
  const contains = "K";
  const notFound = "_";
  const right = "В";

  let buf = String();

  [...input].forEach((s, i) => {
    if (s === secret[i]) {
      buf += right;
      return;
    }
    if (secret.includes(s)) {
      buf += contains;
      return;
    }
    buf += notFound;
  });
  return buf;
}

/**
 * Массив функции для фильтра пользовательского ввода
 * @type {Array.<Function>} Функции для фильтра
 */
export const rules = {
  required(value) {
    return !!value || "Заполните поле";
  },
  digitMask(value) {
    return /^[0-9]*$/.test(value) || "Только цифры";
  },
  notZero(value) {
    return parseInt(value) === 0 ? "Не должно быть равно нулю" : true;
  }
};

/**
 * Форматирует дату
 * @param dt {string}
 * @return {string}
 */
export function dateFormatter(dt) {
  const date = new Date(dt);
  const day = date.getDate();
  const monthNumber = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  return `${hours}:${minutes}:${second} ${day}-${monthNumber}-${year}`;
}
