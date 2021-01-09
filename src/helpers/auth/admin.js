const { Staff } = require('../../models');

const getAdminUser = async (email) => {
  const users = await Staff.query()
    .select('*')
    .where('email', email)
    .where('isAdmin', 'true');
  if (users.length) {
    const userdetails = {
      email: users[0].email,
      id: users[0].id,
    };
    return userdetails;
  }
  return null;
};

module.exports = {
  getAdminUser,
};
