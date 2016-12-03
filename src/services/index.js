import mongoose from "mongoose"
import mongooseRedisCache from "mongoose-redis-cache"

import {DATABASE_URL} from "../config"
import {IS_PROD} from "../constants/util"

import authentication from "./authentication"
import debug from "./debug"
import messages from "./messages"
import users from "./users"
import socket from "./socket"

export default function services() {
  mongoose.connect(DATABASE_URL)
  mongoose.Promise = global.Promise

  if (IS_PROD) {
    mongooseRedisCache(mongoose)
  }

  this.configure(authentication)
  this.configure(messages)
  this.configure(users)
  this.configure(socket)
  this.configure(debug)
}