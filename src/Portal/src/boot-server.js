var prerendering = require('aspnet-prerendering');

export default prerendering.createServerRenderer(function (params) {
    return new Promise(function (resolve, reject) {
        var result = '';

        resolve({ html: result });
    });
});