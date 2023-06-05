/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    let createQuery = `CREATE TABLE users(
        id SERIAL PRIMARY KEY NOT NULL,
        firstname TEXT,
        lastname TEXT,
        username VARCHAR(100),
        email TEXT,
        phone INT,
        password VARCHAR(100),
        DOJ DATE,
        Age INT,
        Gender TEXT,
        ProfilePic BYTEA,
        City TEXT,
      )`;
    return knex.raw(createQuery);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    let dropQuery = `DROP TABLE users`;
    return knex.raw(dropQuery);
};
