import orderModel from '../models/orderModel';
import connection, { OrderProcess } from '../jobQueue';
import mailer from '../mailer';
import userModel from '../models/userModel';

const OrdersController = {
  create(req, res, next) {
    const { items, user } = req.body;
    orderModel.create({ items, user }).then((order) => {
      connection.enqueue(OrderProcess.name, order.toObject(), (err) => err && console.error(err));
      userModel.findById(user).select('email').lean()
        .then(({ email }) => mailer.send(email, 'new order', `<h1> you have made an order # ${order._is}</h1>`));
      res.json(order.toJSON());
    })
      .catch(next);
  },
  listUsersOrders(req, res, next) {
    if (!req.query.user)res.status(401).send();

    userModel.findById(req.query.user).lean()
      .then((user) => {
        if ((user || {}).role !== 'admin') return res.status(401).send();
        return orderModel.aggregate({
          $group: {
            _id: '$user',
            orders: { $push: '$$ROOT' },
          },
        }).then((groups) => userModel.populate(groups, { path: '_id' }).then((data) => res.json(data)));
      })
      .catch(next);
  },
  list(req, res, next) {
    if (!req.query.user)res.status(401).send();
    userModel.findById(req.query.user).lean()
      .then((user) => {
        if (!user) return res.status(404).send();
        return orderModel.find({ user: user._id }).lean().then((orders) => res.json(orders));
      })
      .catch(next);
  },

  delete(req, res, next) {
    orderModel.findByIdAndRemove(req.params.id).then((u) => {
      if (!u)res.status(404).send();
      res.send();
    })
      .catch(next);
  },
};
export default OrdersController;
