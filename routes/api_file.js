var log = lib.core.log
    , common = lib.api.common
    , download = require('../api/download');

/**
 * GuidingFileApi:
 *  Routing requests to the API functions.
 * @param {app} app
 */
exports.guiding = function (app) {


    app.post('/gridfs/save.json', function (req, res) {
        common.save(req, res);
    });
    // 获取图片  
    app.get('/picture/:id', function (req, res) {
        common.image(req, res, function (err, doc) {
            res.send(doc);
        });
    });
    app.get('/file/download.json', function (req, res) {
        download.create(req,res);
        common.download(req, res);
    });

};