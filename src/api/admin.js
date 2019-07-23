import request from "../utils/request";

export function getUsers() {
  return request({
    url: "/users",
    method: "get"
  });
}

/**
 *
 * @param data {{id: number, login: string,  name: string, perm_mask: number}}
 * @return {AxiosPromise}
 */
export function changeUser(data) {
  return request({
    url: "/user/set",
    method: "post",
    data
  });
}
