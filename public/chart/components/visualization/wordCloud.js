var d3 = require('d3');
var textElement = require('');
var layout.cloud = require('');
var valuator = require('');

function wordCloud() {
  var accessor = function (d) { return d; };
  var colorScale = d3.scale.category20();
  var fontNormal = d3.functor('normal');
  var width = 250;
  var height = 250;
  var rotate = function() { return (~~(Math.random() * 6) - 3) * 30; };
  var font = d3.functor('serif');
  var fontSize = function (d) { return d.size; };
  var fontStyle = fontNormal;
  var fontWeight = fontNormal;
  var timeInterval = Infinity;
  var spiral = 'archimedean';
  var padding = 1;
  var textAccessor = function (d) { return d.text; };
  var fill = function (d, i) { return colorScale(i); };
  var fillOpacity = d3.functor(1);
  var textAnchor = d3.functor('middle');
  var textClass = d3.functor('tag');

  function generator(selection) {
    selection.each(function (data, index) {
      var words = accessor.call(this, data, index);

      var text = textElement()
        .cssClass(textClass)
        .fill(fill)
        .fillOpacity(fillOpacity)
        .textAnchor(textAnchor)

      var g = d3.select(this).append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

      function draw(words) {
        g.datum(words).call(text);
      }

      d3.layout.cloud()
        .size([width, height])
        .words(words)
        .text(textAccessor)
        .rotate(rotate)
        .font(font)
        .fontStyle(fontStyle)
        .fontWeight(fontWeight)
        .fontSize(fontSize)
        .timeInterval(timeInterval)
        .spiral(spiral)
        .padding(padding)
        .on('end', draw)
        .start();
    });
  }

  // Public API
  generator.accessor = function (v) {
    if (!arguments.length) { return accessor; }
    accessor = valuator(v);
    return generator;
  };

  generator.width = function (v) {
    if (!arguments.length) { return width; }
    width = v;
    return generator;
  };

  generator.height = function (v) {
    if (!arguments.length) { return height; }
    height = v;
    return generator;
  };

  generator.rotate = function (v) {
    if (!arguments.length) { return rotate; }
    rotate = v;
    return generator;
  };

  generator.font = function (v) {
    if (!arguments.length) { return font; }
    font = v;
    return generator;
  };

  generator.fontSize = function (v) {
    if (!arguments.length) { return fontSize; }
    fontSize = v;
    return generator;
  };

  generator.fontStyle = function (v) {
    if (!arguments.length) { return fontStyle; }
    fontStyle = v;
    return generator;
  };

  generator.fontWeight = function (v) {
    if (!arguments.length) { return fontWeight; }
    fontWeight = v;
    return generator;
  };

  generator.timeInterval = function (v) {
    if (!arguments.length) { return timeInterval; }
    timeInterval = v;
    return generator;
  };

  generator.spiral = function (v) {
    if (!arguments.length) { return spiral; }
    spiral = v;
    return generator;
  };

  generator.padding = function (v) {
    if (!arguments.length) { return padding; }
    padding = v;
    return generator;
  };

  generator.text = function (v) {
    if (!arguments.length) { return textAccessor; }
    textAccessor = v;
    return generator;
  };

  generator.fill = function (v) {
    if (!arguments.length) { return fill; }
    fill = v;
    return generator;
  };

  generator.fillOpacity = function (v) {
    if (!arguments.length) { return fillOpacity; }
    fillOpacity = v;
    return generator;
  };

  generator.textAnchor = function (v) {
    if (!arguments.length) { return textAnchor; }
    textAnchor = v;
    return generator;
  };

  generator.textClass = function (v) {
    if (!arguments.length) { return textClass; }
    textClass = v;
    return generator;
  };

  return generator;
}

module.exports = wordCloud;
