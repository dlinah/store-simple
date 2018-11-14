import queue from 'mongo-queue';
import Order, { STATES } from './models/orderModel';


export class OrderProcess extends queue.Template {
  perform(order) {
    Order.findOneAndUpdate({ _id: order._id }, { $set: { state: STATES.INPROGRESS } });
    console.log(`processing order # : ${order._id}`);
    this.order = order;
    this.complete(null);
  }

  complete(err) {
    if (err) {
      console.log(`order error # : ${this.order._id}`);
    } else {
      Order.findOneAndUpdate({ _id: this.order._id }, { $set: { state: STATES.DONE } })
        .then(() => console.log(`order processed # : ${this.order._id}`));
    }
  }
}

const connection = new queue.Connection({
  host: '127.0.0.1', port: 27017, db: 'store', expires: 86400000,
});
connection.on('error', console.error);
const worker = new queue.Worker(connection, [OrderProcess]);
worker.on('error', console.error);
worker.poll();
export default connection;
