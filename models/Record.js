const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const RecordSchema = new Schema(
  {
    cover: {
      type: String,
      required: true,
      default: "http://localhost:5001/statics/avatar-01.png",
    },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    year: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Record = model("Record", RecordSchema);

module.exports = Record;
