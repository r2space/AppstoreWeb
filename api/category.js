var category = require('../modules/mod_category')
  , util = lib.core.util
  , json = lib.core.json;

exports.getCategory = function (req_, res_) {

  return res_.send(json.dataSchema(category.getCategories()));

};