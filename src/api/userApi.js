import request from "./request";
export const register = function(params) {
  return request.post(
    '/user/register',
    params
  )
}
export const login = function(params) {
  return request.post(
    '/user/login',
    params
  )
}
export const get_user_info = function(userId) {
  return request.get(
    '/user/get_user_info',
    {
      params: {
        userId: userId
      }
    }
  )
}
export const get_cognitive = function(userId) {
  return request.get(
    '/user/get_cognitive',
    {
      params: {
        userId: userId
      }
    }
  )
}
export const update_cognitive = function(userId) {
  return request.get(
    '/user/update_cognitive',
    {
      params: {
        userId: userId
      }
    }
  )
}