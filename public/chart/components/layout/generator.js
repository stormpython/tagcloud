var d3 = require('d3');
var baseLayout = require('');
var attrs = require('');

function layoutGenerator() {
  var layout = baseLayout();

  function generator(selection) {
    selection.each(function (data) {
      var g = d3.select(this).selectAll('g.chart')
        .data(layout(data));

      g.exit().remove();
      g.enter().append('g').attr('class', 'chart');
      g.attr('transform', function (d) {
        return 'translate(' + d.dx + ',' + d.dy + ')';
      });
    });
  }

  // Public API
  generator.attr = attrs(generator)(layout);

  return generator;
}

module.exports = layoutGenerator;
