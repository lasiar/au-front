import request from "../utils/request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data
  });
}

export function getInfo() {
  return request({
    url: "/user",
    method: "get"
  });
}

export function getPermissions() {
  return request({
    url: "/user/permissions",
    method: "get"
  });
}

export function registration(data) {
  return request({
    url: "/user/registration",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  });
}
