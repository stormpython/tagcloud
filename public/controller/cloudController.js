var module = require('ui/modules').get('sp-wordcloud');

module.controller('cloudController', function ($scope) {
  $scope.$watch('esResponse', function (resp) {
    if (!resp) {
      $scope.words = null;
      return;
    }

    var wordsAggId = $scope.vis.aggs.bySchemaName['words'][0].id;
    var buckets = resp.aggregations[wordsAggId].buckets;
    $scope.words = buckets.map(function (bucket) {
      return {
        label: bucket.key
      };
    });
  });
});
