import mongoose from "mongoose"
import mongooseService from "feathers-mongoose"

export default function services() {
  const app = this

  app.use("v2/pies", mongooseService({
    Model: mongoose.model("pie", new mongoose.Schema({
      name: {type: String, unique: true},
      count: Number
    }))
  }))

  app.service("v2/pies").create({
    name: "Eieigum! MMM EIEIEIZZ",
    count: 69
  })
}
