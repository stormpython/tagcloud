require('plugins/tagcloud/cloud.less');
require('plugins/tagcloud/lib/cloud_controller.js');
require('plugins/tagcloud/lib/cloud_directive.js');

function TagCloudProvider(Private) {
  var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
  var Schemas = Private(require('ui/Vis/Schemas'));

  return new TemplateVisType({
    name: 'tagcloud',
    title: 'Tag cloud',
    description: 'A tag cloud visualization is a visual representation of text data, ' +
     'typically used to visualize free form text. Tags are usually single words, ' +
     'and the importance of each tag is shown with font size or color.',
    icon: 'fa-cloud',
    template: require('plugins/tagcloud/cloud.html'),
    params: {
      defaults: {
        textScale: 'linear',
        orientations: 1,
        fromDegree: 0,
        toDegree: 0,
        font: 'serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        timeInterval: 500,
        spiral: 'archimedean',
        minFontSize: 18,
        maxFontSize: 72
      },
      editor: require('plugins/tagcloud/cloud_vis_params.html')
    },
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
        max: 1,
        aggFilter: ['terms', 'significant_terms']
      }
    ])
  });
}

require('ui/registry/vis_types').register(TagCloudProvider);
