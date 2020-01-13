exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('acl')
    .del()
    .then(function() {
      return knex('acl').insert([
        {
          route: '/transactions/acquire-credits',
          method: '{"POST"}',
          authorized: '{"admin", "student", "servant", "visitor"}',
        },
        {
          route: '/ingredients',
          method: '{"GET", "POST", "PUT", "DELETE"}',
          authorized: '{"admin"}',
        },
        {
          route: '/menu',
          method: '{"POST", "PUT", "DELETE"}',
          authorized: '{"admin"}',
        },
        {
          route: '/menu',
          method: '{"GET"}',
          authorized: '{"admin", "student", "servant", "visitor"}',
        },
      ]);
    });
};
