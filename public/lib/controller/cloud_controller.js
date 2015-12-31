var module = require('ui/modules').get('sp-wordcloud');

module.controller('CloudController', function ($scope) {
  $scope.$watch('esResponse', function (resp) {
    if (!resp) {
      $scope.words = null;
      return;
    }

    debugger;
    var wordsAggId = $scope.vis.aggs.bySchemaName['metric'][0].id;
    var buckets = resp.aggregations[wordsAggId].buckets;
    var metricsAgg = $scope.vis.aggs.bySchemaName['segment'];

    $scope.data = buckets.map(function (bucket) {
      return {
        label: bucket.key,
        text: bucket.key,
        size: metricsAgg.getValue(bucket)
      };
    });

    $scope.options = {};
  });
});
