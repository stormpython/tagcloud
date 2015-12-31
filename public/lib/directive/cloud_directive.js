var d3 = require('d3');
var baseLayout = require('plugins/sp-wordcloud/chart/components/layout/generator');
var chartGenerator = require('plugins/sp-wordcloud/chart/index');
var module = require('ui/modules').get('sp-wordcloud');

module.directive('wordCloud', function () {
  function link (scope, element, attrs) {
    var layout = baseLayout();
    var chart = chartGenerator();
    var svg = d3.select(element[0]);

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

    function render(data, opts) {
      layout.attr({
        type: opts.layout || 'grid',
        columns: opts.numOfColumns || 0,
        size: getSize()
      });
      chart.options(opts);

      if (data) {
        svg
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
    template: '<svg class="parent" width="100%" height="100%"></svg>',
    replace: 'true',
    link: link
  };
});
