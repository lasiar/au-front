import request from "../utils/request";

/**
 * Получений сессий
 * @param data {{completed: Boolean}} флаг для указанаие получение завершенных или нет сессий
 * @return {AxiosPromise}
 */
export function getSessions(data) {
  return request({
    url: "/game/sessions",
    method: "get",
    ...{ params: data }
  });
}

/**
 * Получение истории сессии
 * @param data {{id_session: number}}
 * @return {AxiosPromise}
 */
export function getHistory(data) {
  return request({
    url: "/game/history",
    method: "post",
    data
  });
}

/**
 *
 * @param data {{id_session: number, text: string}}
 * @return {AxiosPromise}
 */
export function guess(data) {
  return request({
    url: "/game/guess",
    method: "post",
    data
  });
}
