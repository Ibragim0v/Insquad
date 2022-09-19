const { fetchData, fetchRow } = require("../../utils/postgres");

// SQL DYNAMIC QUERIES

const SELECT_BOOKS = `
    SELECT * FROM books
`;

const INSERT_BOOK = `
    INSERT INTO books(title, author, user_id) VALUES($1, $2, $3) RETURNING *
`;

const UPDATE_BOOK = `
UPDATE
    books
SET
    title = (
        CASE
            WHEN LENGTH($1) > 0 THEN $1 ELSE title
        END
    ),
    author = (
        CASE 
            WHEN LENGTH($2) > 0 THEN $2 ELSE author
        END
    )
WHERE 
  id = $3
  RETURNING *
`;

const DELETE_BOOK = `
    DELETE FROM books WHERE id = $1 RETURNING *
`;

// Module-Based Queries

const allBooks = () => fetchData(SELECT_BOOKS);

const addBook = (title, author, user_id) =>
  fetchRow(INSERT_BOOK, title, author, user_id);

const editBook = (title, author, id) =>
  fetchRow(UPDATE_BOOK, title, author, id);

const removeBook = (id) => fetchRow(DELETE_BOOK, id);

module.exports = {
  allBooks,
  addBook,
  editBook,
  removeBook,
};
