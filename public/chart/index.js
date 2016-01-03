var d3 = require('d3');
var _ = require('lodash');
var baseLayout = require('plugins/tagcloud/chart/components/layout/generator');
var builder = require('plugins/tagcloud/chart/components/utils/builder');
var control = require('plugins/tagcloud/chart/components/control/events');
var tagCloud = require('plugins/tagcloud/chart/components/visualization/tag_cloud');

function chartGenerator() {
  var events = control();
  var layout = baseLayout();
  var opts = {};
  var listeners = {};

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

      layout.attr({
        type: opts.layout || 'grid',
        columns: opts.numOfColumns || 0,
        size: getSize()
      });

      events.listeners(eventListeners);

      d3.select(this)
        .call(events)
        .call(layout)
        .selectAll('g.chart')
        .call(chart); // Draw Chart
    });
  }

  // Public API
  generator.options = function (v) {
    if (!arguments.length) { return opts; }
    opts = _.isPlainObject(v) && !_.isArray(v) ? v : opts;
    return generator;
  };

  generator.listeners = function (v) {
    if (!arguments.length) { return listeners; }
    listeners = _.isPlainObject(v) && !_.isArray(v) ? v : listeners;
    return generator;
  };

  return generator;
}

module.exports = chartGenerator;
