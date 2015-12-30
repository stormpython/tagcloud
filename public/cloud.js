function WordCloudProvider(Private) {
  var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));

  return new TemplateVisType({
    name: 'spWordcloud',
    title: 'Word Cloud',
    description: 'word cloud visualization',
    icon: 'fa-cloud',
    template: require('plugins/sp-wordcloud/cloud.html'),
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Tag Size',
        min: 1,
        max: 1,
        aggFilter: ['avg', 'sum', 'count', 'min', 'max', 'median', 'cardinality'],
        defaults: [
          { schema: 'metric', type: 'count' }
        ]
      },
      {
        group: 'buckets',
        name: 'segment',
        icon: 'fa fa-scissors',
        title: 'Group Tags',
        min: 1,
        // max: 1,
        aggFilter: '!geohash_grid'
      },
      {
        group: 'buckets',
        name: 'split',
        icon: 'fa fa-th',
        title: 'Split Chart',
        min: 0,
        max: 1,
        aggFilter: '!geohash_grid'
      }
    ])
  });
}

require('plugins/sp-wordcloud/lib/controller/cloudController.js');
require('plugins/sp-wordcloud/lib/directive/wordCloud.js');
require('ui/registry/vis_types').register(WordCloudProvider);
