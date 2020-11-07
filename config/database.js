module.exports = {
  hrPool: {
    user: process.env.TFA_USER,
    password: process.env.TFA_PASSWORD,
    connectString: process.env.TFA_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 20,
    poolIncrement: 0
  }
};