// Admin  are hard-coded
const ADMIN_USERS = [
  {
    id: 1,
    email: 'john',
    password: 'password',
    role: 'admin',
  },
  {
    id: 2,
    email: 'anna',
    password: 'password123member',
    role: 'admin',
  },
];

const validateAdminUser = (email, password) => {
  return ADMIN_USERS.find((user) => {
    return user.email === email && user.password === password;
  });
};

const getAdminUser = (email) => {
  return ADMIN_USERS.find((user) => {
    return user.email === email;
  });
};

module.exports = {
  getAdminUser,
  validateAdminUser,
};
