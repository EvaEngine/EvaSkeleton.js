module.exports = {
  sequelize: {
    logging: false
  },
  logger: {
    file: false
  },
  db: {
    database: 'YourDatabase',
    replication: {
      write: {
        host: process.env.DB_REPLICATION_WRITE_HOST || 'MySQL_Master_host',
        username: process.env.DB_REPLICATION_WRITE_USERNAME || 'MySQL_Master_user',
        password: process.env.DB_REPLICATION_WRITE_PASSWORD || 'MySQL_Master_password'
      },
      read: [
        {
          host: process.env.DB_REPLICATION_READ0_HOST || 'MySQL_Slave_host',
          username: process.env.DB_REPLICATION_READ0_USERNAME || 'MySQL_Slave_user',
          password: process.env.DB_REPLICATION_READ0_PASSWORD || 'MySQL_Slave_password'
        }
      ]
    }
  },
  token: {
    faker: {
      key: 'abc',
      enable: true
    }
  }
};
