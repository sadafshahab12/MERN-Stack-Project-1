const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /.+\@.+\..+/,
  },
  order_data: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("order", OrderSchema);
