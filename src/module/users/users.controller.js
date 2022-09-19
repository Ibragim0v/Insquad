const moment = require("moment");
const model = require("./users.model");

module.exports = {
  GET_JOINED_TABLES: async (_, res) => {
    try {
      const joinedTables = await (
        await model.joinedTables()
      ).filter((e) => (e.created_at = moment(e.created_at).format("L")));

      res.json(joinedTables);
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GET: async (_, res) => {
    try {
      res.json(
        await (
          await model.allUsers()
        ).filter((e) => (e.created_at = moment(e.created_at).format("L")))
      );
    } catch (err) {
      res.sendStatus(500);
    }
  },
  POST: async (req, res) => {
    try {
      const { firstName, lastName, age, isFree } = req.body;

      const is_free = isFree == "Yes" ? true : false;

      res.status(201).json({
        message: "Successfully",
        data: await model.addUser(
          firstName?.toString().trim(),
          lastName?.toString().trim(),
          age,
          is_free
        ),
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
  PUT: async (req, res) => {
    try {
      const { id } = req.params;

      const { firstName, lastName, age, isFree } = req.body;

      const is_free = isFree == "Yes" ? true : false;

      res.json({
        message: "Successfully",
        data: await model.editUser(
          firstName?.toString().trim(),
          lastName?.toString().trim(),
          age,
          is_free,
          id
        ),
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
  DELETE: async (req, res) => {
    try {
      const { id } = req.params;

      res.json({
        message: "Successfully",
        data: await model.removeUser(id),
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
