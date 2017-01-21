module.exports = {
  port: process.env.PORT || 9080,
  GITHUB_CLIENT_ID:'2eb28056e37758b0ba34',
  GITHUB_CLIENT_SECRET:'ce0031a2155373dd4f9db9366812ab8d019bfced',
  GITHUB_ORGANISATION:'ziggurate-v2',
  MONGO_URL:'mongodb://localhost/ziggurate',
  JWT_SECRET: process.env.JWT_SECRET || 'clintjose08',
  USER_AGENT: process.env.USER_AGENT || 'ReactBoilerplate'
};
