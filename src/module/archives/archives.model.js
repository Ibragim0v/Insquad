const { fetchData, fetchRow } = require("../../utils/postgres");

// SQL QUERIES

const SELECT_USER_ARCHIVE = `
    SELECT * FROM archive_users
`;

const SELECT_BOOK_ARCHIVE = `
    SELECT * FROM archive_books
`;

// Module-Based Queries

const allArchiveUsers = () => fetchData(SELECT_USER_ARCHIVE);

const allArchiveBooks = () => fetchData(SELECT_BOOK_ARCHIVE);

module.exports = {
  allArchiveUsers,
  allArchiveBooks,
};
