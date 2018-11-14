
import itemModel from '../models/itemModel';

const ItemsController = {
  list(req, res, next) {
    itemModel.find().lean().then((items) => res.json(items)).catch(next);
  },

  create(req, res, next) {
    const {
      name, desc, quantity, price,
    } = req.body;
    itemModel.create({
      name, desc, quantity, price,
    }).then((item) => {
      res.json(item.toJSON());
    })
      .catch(next);
  },
  delete(req, res, next) {
    itemModel.findByIdAndRemove(req.params.id).then((u) => {
      if (!u)res.status(404).send();
      res.send();
    })
      .catch(next);
  },
};
export default ItemsController;
