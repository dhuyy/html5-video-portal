var configs = {};

configs.dbName = 'crossover_videos_assignment';

// Production
configs.applicationPort = process.env.PORT;

configs.dbUser = 'dhuy';
configs.dbPassword = 'Hj65we21';
configs.dbHost = 'ds239965.mlab.com';
configs.dbPort = '39965';

// Development
// configs.applicationPort = '3000';

// configs.dbHost = 'localhost';

module.exports = configs;