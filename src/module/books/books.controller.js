const model = require("./books.model");
const moment = require("moment");

module.exports = {
  GET: async (_, res) => {
    try {
      res.json(
        await (
          await model.allBooks()
        ).filter((e) => (e.created_at = moment(e.created_at).format("L")))
      );
    } catch (err) {
      res.sendStatus(500);
    }
  },
  POST: async (req, res) => {
    try {
      const { title, author, user_id } = req.body;

      res.status(201).json({
        message: "Successfully",
        data: await model.addBook(title, author, user_id),
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
  PUT: async (req, res) => {
    try {
      const { id } = req.params;

      const { title, author } = req.body;

      res.json({
        message: "Successfully",
        data: await model.editBook(title, author, id),
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
  DELETE: async (req, res) => {
    try {
      const { id } = req.params;

      res.json({ message: "Successfully", data: await model.removeBook(id) });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
