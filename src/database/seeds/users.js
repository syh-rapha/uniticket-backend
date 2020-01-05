exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'José Ferreira',
          email: 'jferreira@uem.br',
          password:
            '$2y$08$CjPjzMs/UZtYQPJK9ZSTEO47OpD5kZH9t4OxYSzIIe2svQ6c.YSDG',
          role: 'admin',
          active: true,
        },
        {
          name: 'Marcos Palmeira',
          email: 'ra12345@uem.br',
          password:
            '$2y$08$FHMtPkKJKIPtgSUuTifKPeUiWUMuehCutVjRxDDP2UDLrTNdAglga',
          role: 'student',
          active: true,
        },
        {
          name: 'Gabriel Mendes',
          email: 'gmendes@uem.br',
          password:
            '$2y$08$sQGsc8qb0X6ZwwSikvwzL.WrQ3.Ul0Me9BKQLTI.U/CiZm0vJJ/nO',
          role: 'servant',
          active: true,
        },
        {
          name: 'Amaral Dias',
          email: 'damaral@gmail.com',
          password:
            '$2y$08$818eeqmd1mWNteW2C4QVleq5hOwJUgh8JX3rF1nH2PbrfDLAyF1Im',
          role: 'visitor',
          active: true,
        },
      ]);
    });
};
