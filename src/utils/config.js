const connection = {
  connectionStringDev: process.env.CONNECTION_STRING_DEV, // Development
  connectionStringPro: process.env.CONNECTION_STRING_PRO, // Production
};

module.exports = connection;
