/*
 * @Description: 文件说明
 * @Date: 2019-10-10 16:50:38
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-12-02 17:52:43
 */
module.exports = {
    publicPath: '/',
    lintOnSave: true,
    css: {
        loaderOptions: {
            // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
                'console.log'
            ];
        }
    },
    devServer: {
        port: 8088,
        proxy: {
            '/api': {
                target: 'http://test-zzm-api.zhizh.com/gateway', // test
                ws: true,
                changeOrigin: true
                // pathRewrite: {
                //   '^/api': '/', // 这里理解成用‘/api’代替target里面的地址，后面组件中我们调接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                // },
            }
        }
    },
    filenameHashing: true
};