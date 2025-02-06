import request from "./request";
export const get_user_info = function(userName) {
  return request.get(
    '/user/get_user_info',
    {
      params: {
        userName: userName
      }
    }
  )
}
export const get_cognitive = function(userName) {
  return request.get(
    '/user/get_cognitive',
    {
      params: {
        userName: userName
      }
    }
  )
}
export const update_cognitive = function(userName) {
  return request.get(
    '/user/update_cognitive',
    {
      params: {
        userName: userName
      }
    }
  )
}