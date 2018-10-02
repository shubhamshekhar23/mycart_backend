const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || "MYCART_secret_key",
    mongoUri: process.env.MONGODB_URI ||
      'mongodb://' + (process.env.IP || 'localhost') + ':' +
      (process.env.MONGO_PORT || '27017') +
      '/mycart'
  }
  
  module.exports= config;