var d3 = require('d3');
var _ = require('lodash');
var chartGenerator = require('plugins/tagcloud/chart/index');
var module = require('ui/modules').get('tagcloud');

module.directive('tagCloud', function () {
  function link (scope, element, attrs) {
    var chart = chartGenerator();
    var svg = d3.select(element[0]);

    function onSizeChange() {
      return {
        width: element.parent().parent().width(),
        height: element.parent().parent().height()
      };
    }

    function getSize() {
      var size = onSizeChange();
      return [size.width, size.height];
    };

    function render(data, opts, eventListeners) {
      opts = opts || {};
      eventListeners = eventListeners || {};

      chart
        .options(opts);
        .listeners(eventListeners);

      if (data) {
        svg
          .attr('width', getSize()[0])
          .attr('height', getSize()[1])
          .datum(data)
          .call(chart);
      }
    };

    scope.$watch('data', function (newVal, oldVal) {
      render(newVal, scope.options, scope.eventListeners);
    });

    scope.$watch('options', function (newVal, oldVal) {
      render(scope.data, newVal, scope.eventListeners);
    });

    scope.$watch('eventListeners', function (newVal, oldVal) {
      render(scope.data, scope.options, newVal);
    });

    scope.$watch(onSizeChange, _.debounce(function () {
      render(scope.data, scope.options, scope.eventListeners);
    }, 250), true);

    element.bind('resize', function () {
      scope.$apply();
    });
  }

  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '=',
      eventListeners: '='
    },
    template: '<svg class="parent"></svg>',
    replace: 'true',
    link: link
  };
});
