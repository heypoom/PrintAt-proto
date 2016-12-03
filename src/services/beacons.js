import {Service} from "feathers-mongoose"

import beacon from "../models/beacons"

import {BEACON_API} from "../constants/api"

export default function beacons() {
  this.use(BEACON_API, new Service({
    Model: beacon,
    paginate: {
      default: 5,
      max: 25
    }
  }))
  this.service(BEACON_API).before({
    all: [],
    remove: []
  })
}
