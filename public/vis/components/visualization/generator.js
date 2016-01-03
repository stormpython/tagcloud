var d3 = require('d3');
var _ = require('lodash');
var builder = require('plugins/tagcloud/vis/components/utils/builder');
var tagCloud = require('plugins/tagcloud/vis/components/visualization/tag_cloud');

function chartGenerator() {
  var opts = {};

  function generator(selection) {
    selection.each(function (data) {
      var dataOpts = (data && data.options) || {};
      var accessor = opts.accessor || dataOpts.accessor || 'tags';
      var chart = tagCloud()
        .width(data.width)
        .height(data.height)
        .accessor(accessor);

      _.forEach([opts, dataOpts], function (o) {
        builder(o, chart);
      });

      d3.select(this).call(chart); // Draw Chart
    });
  }

  // Public API
  generator.options = function (v) {
    if (!arguments.length) { return opts; }
    opts = _.isPlainObject(v) && !_.isArray(v) ? v : opts;
    return generator;
  };

  return generator;
}

module.exports = chartGenerator;
