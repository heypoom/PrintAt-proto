import mongoose, {Schema} from "mongoose"

const BeaconSchema = new Schema({
  name: {type: String, required: true},
  location: String,
  lat: Number,
  lng: Number,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

BeaconSchema.set("redisCache", true)

const beacon = mongoose.model("beacon", BeaconSchema)

export default beacon
