import mongoose from "mongoose"

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  { timestamps: true }
)

const ClientModel = mongoose.model("Client", ClientSchema)

export default ClientModel
