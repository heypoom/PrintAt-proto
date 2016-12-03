import {combineReducers} from "redux"

import runtime from "./runtime"
import user from "./user"
// import track from "./track"

import {services} from "../constants/api"

export default combineReducers({
  runtime,
  user,
  users: services.user.reducer,
  socket: services.socket.reducer,
})
