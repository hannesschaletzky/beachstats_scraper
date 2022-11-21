/* eslint-disable no-undef */

// docs: https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [
    {
      name: 'beachstats',
      script: './build/app.js',
      node_args: '-r ts-node/register -r tsconfig-paths/register',
      env: {
        TS_NODE_BASEURL: './build'
      }
    }
  ]
}
