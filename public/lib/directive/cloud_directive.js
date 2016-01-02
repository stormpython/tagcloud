var d3 = require('d3');
var baseLayout = require('plugins/wordcloud/chart/components/layout/generator');
var control = require('plugins/wordcloud/chart/components/control/events');
var chartGenerator = require('plugins/wordcloud/chart/index');
var module = require('ui/modules').get('wordcloud');

module.directive('wordCloud', function () {
  function link (scope, element, attrs) {
    var layout = baseLayout();
    var chart = chartGenerator();
    var events = control();
    var svg = d3.select(element[0]);

    function onSizeChange() {
      return {
        width: element.parent().parent().width(),
        height: element.parent().parent().height()
      }
    }

    function getSize() {
      var size = onSizeChange();
      return [size.width, size.height];
    };

    function render(data, opts, eventListeners) {
      opts = opts || {};

      events.listeners(eventListeners);

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
          .call(events)
          .call(layout)
          .selectAll('g.chart')
          .call(chart);
      }
    };

    scope.$watch('data', function (newVal, oldVal) {
      render(newVal, scope.options, scope.eventListeners);
    });

    scope.$watch('options', function (newVal, oldVal) {
      if (scope.data) {
        render(scope.data, newVal, scope.eventListeners);
      }
    });

    scope.$watch('eventListeners', function (newVal, oldVal) {
      if (scope.data) {
        render(scope.data, scope.options, newVal);
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
      options: '=',
      events: '='
    },
    template: '<svg class="parent"></svg>',
    replace: 'true',
    link: link
  };
});
