const { createServerlessExpressApp } = require('@vercel/node/serverless');

const app = require('./index').default;

module.exports = createServerlessExpressApp(app);