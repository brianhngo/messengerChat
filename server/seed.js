const { db, Messages, Users } = require('./db');

const seed = async () => {
  try {
    await Users.create({
      username: 'fsmith',
      password: 'password',
      firstname: 'franklin',
      lastname: 'smith',
      email: 'fsmith@yahoo.com',
    });
    await Users.create({
      username: 'jsmith',
      password: 'password',
      firstname: 'john',
      lastname: 'smith',
      email: 'jsmith@yahoo.com',
    });
    await Messages.create({
      message: 'Hello',
      status: 'received',
      UserId: 1,
    });
    await Messages.create({
      message: 'Hello',
      status: 'sent',
      UserId: 2,
    });
    console.log(`Data is seeded`);
  } catch (error) {
    console.log(`Seeded Failed`);
    console.error(error);
  }
};
db.sync({ force: true }).then(seed);
