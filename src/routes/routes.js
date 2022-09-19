const express = require("express");
const router = express.Router();

// controllers

const usersController = require("../module/users/users.controller");

const booksController = require("../module/books/books.controller");

const archiveController = require("../module/archives/archives.controller");

router
  .get("/", usersController.GET_JOINED_TABLES)
  .get("/users", usersController.GET)
  .get("/books", booksController.GET)
  .get("/archive-users", archiveController.GET_ARCHIVE_USERS)
  .get("/archive-books", archiveController.GET_ARCHIVE_BOOKS)
  .post("/createUser", usersController.POST)
  .post("/createBook", booksController.POST)
  .put("/updateUser/:id", usersController.PUT)
  .put("/updateBook/:id", booksController.PUT)
  .delete("/deleteUser/:id", usersController.DELETE)
  .delete("/deleteBook/:id", booksController.DELETE)
  .get("/*", (_, res) => res.sendStatus(404));

module.exports = router;
