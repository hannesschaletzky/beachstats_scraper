/* eslint-disable no-undef */

/*
  Config created according to docs:
  https://pm2.keymetrics.io/docs/usage/application-declaration/
*/
module.exports = {
  apps: [
    {
      name: 'beachstats_scraper',
      script: './build/app.js',
      node_args: '-r ts-node/register -r tsconfig-paths/register',
      env: {
        // https://github.com/dividab/tsconfig-paths#with-node
        TS_NODE_BASEURL: './build',
        NODE_ENV: 'production'
      }
    }
  ]
}
