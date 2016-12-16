import mongoose from "mongoose"
import mongooseRedisCache from "mongoose-redis-cache"

import {DATABASE_URL} from "../config"
import {IS_PROD} from "../constants/util"

import authentication from "./authentication"
import debug from "./debug"
import beacons from "./beacons"
import users from "./users"
import socket from "./socket"
import upload from "./upload"
import print from "./print"

export default function services() {
  mongoose.connect(DATABASE_URL)
  mongoose.Promise = global.Promise

  if (IS_PROD) {
    mongooseRedisCache(mongoose)
  }

  this.configure(authentication)
  this.configure(beacons)
  this.configure(users)
  this.configure(upload)
  this.configure(print)
  this.configure(socket)
  this.configure(debug)
}
