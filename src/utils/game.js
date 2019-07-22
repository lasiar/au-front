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
export const rules = [
  function required(value) {
    return !!value || "Заполните поле. ";
  },
  function digitMask(value) {
    return /^[0-9]*$/.test(value) || "Только цифры";
  }
];

/**
 * Форматирует дату
 * @param dt {string}
 * @return {string}
 */
export function dateFormatter(dt) {
  const date = new Date(dt);
  let day = date.getDate();
  let monthNumber = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let second = date.getSeconds();
  return `${hours}:${minutes}:${second} ${day}-${monthNumber}-${year}`;
}
