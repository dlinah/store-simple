import userModel from '../models/userModel';

const UsersController = {
  list(req, res, next) {
    userModel.find().lean().then((items) => res.json(items)).catch(next);
  },
  create(req, res, next) {
    const {
      email, username, password,
    } = req.body;
    userModel.create({
      email, username, password,
    }).then((user) => {
      res.json(user.toJSON());
    })
      .catch(next);
  },
  delete(req, res, next) {
    userModel.findByIdAndRemove(req.params.id).then((u) => {
      if (!u)res.status(404).send();
      res.send();
    })
      .catch(next);
  },
};
export default UsersController;
