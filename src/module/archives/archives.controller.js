const moment = require("moment");
const model = require("./archives.model");

module.exports = {
  GET_ARCHIVE_USERS: async (_, res) => {
    try {
      res.json(
        await (
          await model.allArchiveUsers()
        ).filter((e) => (e.deleted_at = moment(e.deleted_at).format("L")))
      );
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GET_ARCHIVE_BOOKS: async (_, res) => {
    try {
      res.json(
        await (
          await model.allArchiveBooks()
        ).filter((e) => (e.deleted_at = moment(e.deleted_at).format("L")))
      );
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
