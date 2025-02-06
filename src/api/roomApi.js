import request from "./request";
export const get_room_info = function(roomId) {
  return request.get(
    '/room/get_room_info',
    {
      params: {
        roomId: roomId
      }
    }
  )
}
export const create_room = function(params) {
  return request.post(
    '/room/create_room',
    params
  )
}
export const join_room = function(params) {
  return request.post(
    '/room/join_room',
    params
  )
}
// export const get_message = function(roomId) {
//   return request.get(
//     '/room/get_message',
//     {
//       params: {
//         roomId: roomId
//       }
//     }
//   )
// }
export const update_message = function(params) {
  return request.post(
    '/room/update_message',
    params
  )
}