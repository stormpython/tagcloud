var d3 = require('d3');
var baseLayout = require('plugins/wordcloud/chart/components/layout/generator');
var chartGenerator = require('plugins/wordcloud/chart/index');
var module = require('ui/modules').get('wordcloud');

module.directive('wordCloud', function () {
  function link (scope, element, attrs) {
    var layout = baseLayout();
    var chart = chartGenerator();
    var svg = d3.select(element[0]);

    function onSizeChange() {
      return {
        width: element.parent().parent().width(),
        height: element.parent().parent().height()
      }
    }

    function getSize() {
      var width = element.parent().parent().width();
      var height = element.parent().parent().height();

      return [width, height];
    };

    function render(data, opts) {
      opts = opts || {};

      layout.attr({
        type: opts.layout || 'grid',
        columns: opts.numOfColumns || 0,
        size: getSize()
      });
      chart.options(opts);

      if (data) {
        svg
          .attr('width', getSize()[0])
          .attr('height', getSize()[1])
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
      if (scope.data) {
        render(scope.data, newVal);
      }
    });

    scope.$watch(onSizeChange, function () {
      if (scope.data) {
        render(scope.data, scope.options);
      }
    }, true);

    element.bind('resize', function () {
      scope.$apply();
    });

    // Initial render call
    render();
  }

  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '='
    },
    template: '<svg class="parent"></svg>',
    replace: 'true',
    link: link
  };
});
