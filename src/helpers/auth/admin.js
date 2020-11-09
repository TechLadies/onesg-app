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
  const users = ADMIN_USERS.find((user) => {
    return user.email === email && user.password === password;
  });

  return users.length;
};

const getAdminUser = (userEmail) => {
  const { email, role } = ADMIN_USERS.find((user) => {
    return user.email === userEmail;
  });

  return { email, role };
};

module.exports = {
  getAdminUser,
  validateAdminUser,
};
