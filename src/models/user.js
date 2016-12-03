import mongoose, {Schema} from "mongoose"
import {DEFAULT_PROFILE} from "../constants/visual"

/*
  NOTE: บัญชีผู้ใช้
  @username (String): ชื่อของบัญชีผู้ใช้งาน
  @email (Encrypted String): Email Address ของผู้ใช้งาน
  @password (Encrypted String): รหัสผ่านของผู้ใช้
  @displayName (String): ชื่อที่ใช้แทนตัว
*/

const UserSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  photo: {
    type: String,
    default: DEFAULT_PROFILE
  },
  birthDate: Date,
  roles: {
    type: String,
    enum: ["admin", "student", "teacher", "guest"],
    default: "guest"
  },
  metadata: Schema.Types.Mixed,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

UserSchema.set("redisCache", true)

const user = mongoose.model("user", UserSchema)

export default user
