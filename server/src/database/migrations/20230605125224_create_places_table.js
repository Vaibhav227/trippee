/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    let createQuery = `CREATE TABLE places(
        id SERIAL PRIMARY KEY NOT NULL,
        name TEXT,
        location VARCHAR(100),
        ratings VARCHAR(100),
        description TEXT,
        phonenumber INT,
        pricemin INT,
        pricemax INT,
        website TEXT,
        photos BYTEA,
        city TEXT,
        state TEXT
      )`;
    return knex.raw(createQuery);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    let dropQuery = `DROP TABLE places`;
    return knex.raw(dropQuery);
};
