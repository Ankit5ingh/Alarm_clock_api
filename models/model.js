const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
  alarmName: {
    type: String,
    required: true,
  },
  alarmTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Alarm", alarmSchema);
