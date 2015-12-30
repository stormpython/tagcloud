var d3 = require('d3');
var baseLayout = require('plugins/sp-wordcloud/chart/components/layout/generator');
var chartGenerator = require('plugins/sp-wordcloud/chart/index');
var module = require('ui/modules').get('sp-wordcloud');

module.directive('wordCloud', function () {
  function link (scope, element, attrs) {
    var layout = baseLayout();
    var chart = chartGenerator();
    var selection;

    function onSizeChange() {
      return {
        width: element.width(),
        height: element.height()
      }
    }

    function getSize() {
      var width = scope.width = element.width();
      var height = scope.height = element.height();

      return [width, height];
    };

    selection = d3.select(element[0])
      .append('svg')
      .attr('class', 'parent')
      .attr('width', getSize()[0])
      .attr('height', getSize()[1]);

    function render(data, opts) {
      layout.attr({
        type: opts.layout || 'grid',
        columns: opts.numOfColumns || 0,
        size: getSize()
      });
      chart.options(opts);

      if (data) {
        selection
          .datum(data)
          .call(layout)
          .selectAll('g.chart')
          .call(chart);
      }
    };

    scope.$watch('data', function (newVal, oldVal) {
      render(newVal, scope.options);
    });

    scope.$watch('options', function (newVal, oldVal) {
      render(scope.data, newVal);
    });

    scope.$watch(onSizeChange, function () {
      render(scope.data, scope.options);
    }, true);

    // Initial render call
    render();
  }

  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '='
    },
    template: '<div style="height:100%;"></div>',
    replace: 'true',
    link: link
  };
});
