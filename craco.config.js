module.exports = {
    plugins: [
        {
            plugin: require('craco-less'),
            options: {
                modifyLessRule: (lessRule) => {
                    lessRule.use = lessRule.use.filter(i => !i.loader.includes('resolve-url-loader'));
                    return lessRule;
                },
                lessLoaderOptions: {
                    lessOptions: { javascriptEnabled: true }
                }
            }
        },
    ],
};