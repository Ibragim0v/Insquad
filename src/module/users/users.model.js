const { fetchData, fetchRow } = require("../../utils/postgres");

// SQL DYNAMIC QUERIES

const SELECT_JOINED_TABLES = `
SELECT
    u.id, u.first_name, u.last_name, u.age, u.is_free, u.created_at,
        json_agg(
            json_build_object(
                'id', b.id ,
                'title', b.title,
                'author', b.author,
                'created_at', b.created_at
            )
    ) AS books
FROM users AS u 
    INNER JOIN
books AS b
    ON u.id = b.user_id
GROUP BY
    u.id
`;

const SELECT_USERS = `
    SELECT * FROM users
`;

const INSERT_USER = `
    INSERT INTO users(first_name, last_name, age, is_free) VALUES($1, $2, $3, $4) RETURNING *
`;

const UPDATE_USER = `
UPDATE
    users
SET
    first_name = (
        CASE
            WHEN LENGTH($1) > 0 THEN $1 ELSE first_name
        END
    ),
    last_name = (
        CASE 
            WHEN LENGTH($2) > 0 THEN $2 ELSE last_name
        END
    ),
    age = (
        CASE
            WHEN $3 > 0 THEN $3 ELSE age 
        END
    ),
    is_free = (
        CASE
            WHEN $4 = true OR $4 = false THEN $4 ELSE is_free 
        END
    )
WHERE 
  id = $5
  RETURNING *
`;

const DELETE_USER = `
    DELETE FROM users WHERE id = $1 RETURNING *
`;

// Module-Based Queries

const joinedTables = () => fetchData(SELECT_JOINED_TABLES);

const allUsers = () => fetchData(SELECT_USERS);

const addUser = (first_name, last_name, age, is_free) =>
  fetchRow(INSERT_USER, first_name, last_name, age, is_free);

const editUser = (first_name, last_name, age, is_free, id) =>
  fetchRow(UPDATE_USER, first_name, last_name, age, is_free, id);

const removeUser = (id) => fetchRow(DELETE_USER, id);

module.exports = {
  joinedTables,
  allUsers,
  addUser,
  editUser,
  removeUser,
};
