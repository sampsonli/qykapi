/**
 * Created by lichun on 2018/1/18.
 */
module.exports = {
    apps: [
        {
            name: 'qykapi',
            script: './bin/www.js',
            kill_timeout: 3000,
            env: {
                NODE_ENV: 'production',
                PORT: 8081,
                HOST: '0.0.0.0'
            }
        }
    ]
}