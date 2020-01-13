exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('credits_price')
    .del()
    .then(function() {
      return knex('credits_price').insert([
        {
          role: 'admin',
          price: 7,
        },
        {
          role: 'student',
          price: 4,
        },
        {
          role: 'visitor',
          price: 15,
        },
        {
          role: 'servant',
          price: 7,
        },
      ]);
    });
};
