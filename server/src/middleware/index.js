import rest from "feathers-rest"
import socketio from "feathers-socketio"
import hooks from "feathers-hooks"
import authentication from "feathers-authentication"
import bodyParser from "body-parser"
import errorHandler from "feathers-errors/handler"

import mongoose from "mongoose"

export default function index() {
  const app = this
  mongoose.Promise = global.Promise
  mongoose.connect("mongodb://localhost:27017/printatapp")

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.configure(hooks())
  app.configure(rest())
  app.configure(socketio())
  app.configure(authentication({idField: "id"}))
  app.use(errorHandler())
}
