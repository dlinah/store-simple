import mongoose from 'mongoose';
import userModel from './userModel';

export const STATES = {
  ORDERED: 1,
  INPROGRESS: 2,
  DONE: 3,
};
const orderShcema = new mongoose.Schema({
  state: {
    type: Number,
    enum: Object.keys(STATES).map((key) => STATES[key]),
    default: STATES.ORDERED,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created: { type: Date, default: Date.now },
});

orderShcema.pre('save', function (next) {
  userModel.findById(this.user).then((user) => {
    if (!user) return next(Error('user not found'));
    return next();
  });
});

export default mongoose.model('Order', orderShcema);
