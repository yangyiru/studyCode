const path = require('path');
module.exports = {
    devServer: {
        open: true,
    },
    configureWebpack: (config) => {
        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    'components': path.resolve(__dirname, './src/components'),
                } // 别名配置
            }
        })
    },
}