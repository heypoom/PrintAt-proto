import mqtt from "mqtt"

import {PRINT_API} from "../constants/api"

const uploadPath = "http://localhost:3001/uploads/"

class PrintService {
  setup(app) {
    this.app = app
    this.mqtt = mqtt.connect("mqtt://localhost")
    this.mqtt.on("connect", () => {
      this.mqtt.subscribe("presence")
      this.mqtt.publish("presence", JSON.stringify({type: "ACTIVE"}))
    })
  }

  find() {
    return Promise.resolve({data: "Printing Queue Endpoint"})
  }

  create(data) {
    const queueId = "a90fwjcwapogjaowfjioawjgioji"
    const queueNum = Math.round(Math.random() * 10000)
    console.log("ADD_TO_QUEUE", data)
    data.files.forEach((item, order) => {
      if (item) {
        this.mqtt.publish(`printat/${data.station}/queue`, JSON.stringify({
          queueId: queueId,
          file: uploadPath + item,
          order
        }))
        console.log(`PRINTING ${uploadPath}${item} AT ${data.station} IN ${order}`)
      }
    })
    return Promise.resolve({
      error: false,
      queue: queueNum,
      queueId: queueId,
      info: data
    })
  }
}

export default function print() {
  this.use(PRINT_API, new PrintService())
}
