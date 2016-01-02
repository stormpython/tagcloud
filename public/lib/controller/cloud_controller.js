var module = require('ui/modules').get('wordcloud');

module.controller('CloudController', function ($scope) {
  $scope.$watch('esResponse', function (resp) {
    if (!resp) {
      $scope.words = null;
      return;
    }

    var wordsAggId = $scope.vis.aggs.bySchemaName['segment'][0].id;
    var buckets = resp.aggregations[wordsAggId].buckets;
    var metricsAgg = $scope.vis.aggs.bySchemaName['metric'][0];

    var words = buckets.map(function (bucket) {
      return {
        label: bucket.key,
        text: bucket.key,
        size: metricsAgg.getValue(bucket)
      };
    });

    $scope.eventListeners = {};
    $scope.data = [{ words: words }];
  });
});
