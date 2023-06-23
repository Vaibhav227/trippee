/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('places').del()
  await knex('places').insert([
    { id: 1, name: 'vrindavan', location: 'https://goo.gl/maps/9GFMzZKrkfxmiQt57', ratings: '5Star', description: 'Vrindavan is a holy town in Uttar Pradesh, northern India. The Hindu deity Krishna is said to have spent his childhood here. It’s home to temples, many dedicated to Krishna and his lover, the deity Radha. At Banke Bihari Temple, the curtain in front of Krishna’s statue is opened and closed every few minutes. At Radha Raman Temple, a gold plate beside Krishna signifies Radha. Prem Mandir is a huge white marble temple.', state: 'Uttar Pradesh' }
  ]);
};