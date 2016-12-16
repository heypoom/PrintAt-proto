import {combineReducers} from "redux"

import runtime from "./runtime"
import user from "./user"
import app from "./app"
// import track from "./track"

import {services} from "../constants/api"

export default combineReducers({
  runtime,
  user,
  app,
  users: services.user.reducer,
  socket: services.socket.reducer,
  beacon: services.beacon.reducer,
  print: services.print.reducer
})
