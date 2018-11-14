import mongoose from 'mongoose';

const itemShcema = new mongoose.Schema({
  name: String,
  desc: String,
  quantity: { type: Number, default: 0 },
  price: Number,
});

export default mongoose.model('Item', itemShcema);
