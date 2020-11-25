// Admin  are hard-coded
const ADMIN_USERS = [
  // {
  //   id: 1,
  //   email: 'john',
  //   password: 'password',
  //   role: 'admin',
  // },
  {
    id: 2,
    email: 'anna',
    password: 'password123member',
    role: 'admin',
  },
];

const isValidateAdminUser = (email, password) => {
  const users = ADMIN_USERS.find((user) => {
    return user.email === email && user.password === password;
  });
  // this returns true or false depending on login credentials
  return users !== undefined;
};

const getAdminUser = (userEmail) => {
  const user = ADMIN_USERS.find((users) => {
    return users.email === userEmail;
  });
  if (user) {
    const userdetails = {
      email: user.email,
      role: user.role,
    };
    return userdetails;
  }
  return null;
};

module.exports = {
  getAdminUser,
  isValidateAdminUser,
};
