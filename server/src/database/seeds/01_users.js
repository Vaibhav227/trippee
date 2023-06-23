/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, username: 'test1', email: 'test1@gmail.com' },
    { id: 2, username: 'test2', email: 'test2@gmail.com' },
    { id: 3, username: 'test3', email: 'test3@gmail.com' }
  ]);
};