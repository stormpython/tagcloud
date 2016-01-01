require('plugins/wordcloud/lib/controller/cloud_controller.js');
require('plugins/wordcloud/lib/directive/cloud_directive.js');

function WordCloudProvider(Private) {
  var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
  var Schemas = Private(require('ui/Vis/Schemas'));

  return new TemplateVisType({
    name: 'wordcloud',
    title: 'Word cloud',
    description: 'A word (tag) cloud visualization is a visual representation of text data, ' +
     'typically used to visualize free form text. Tags are usually single words, ' +
     'and the importance of each tag is shown with font size or color.',
    icon: 'fa-cloud',
    template: require('plugins/wordcloud/cloud.html'),
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
        icon: 'fa fa-cloud',
        title: 'Tags',
        min: 1,
        // max: 1,
        aggFilter: ['terms', 'filters', 'significant_terms']
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

require('ui/registry/vis_types').register(WordCloudProvider);
