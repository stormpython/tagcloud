# Kibana Tag Cloud Plugin
A Tag Cloud Plugin for Kibana 4

![Kibana Tag Cloud](tagcloud.png)

This visualization was inspired by [Tim Roe's](https://www.timroes.de/) blog [post](https://www.timroes.de/2015/12/06/writing-kibana-4-plugins-visualizations-using-data/) on creating a tag cloud plugin for Kibana 4. It is built using [D3](d3js.org) and Jason Davie's [d3-cloud](https://github.com/jasondavies/d3-cloud) plugin.

### Requirements
Kibana 4.3+

### Installation steps
1. Download and unpack [Kibana](https://www.elastic.co/downloads/kibana).
2. From the Kibana root directory, install the plugin with the following command:

```$ bin/kibana plugin -i tagcloud -u https://github.com/stormpython/tagcloud/archive/master.zip```

### Disclosure
This repo is in its early stages. There is an outstanding [bug](https://github.com/stormpython/kibana-tag-cloud-plugin/issues/1) that needs to be fixed. In addition, please note d3-cloud's warning regarding how word clouds are rendered.

>Note: if a word cannot be placed in any of the positions attempted along the spiral, it is not included in the final word layout. This may be addressed in a future release.

### Issues
Please file issues [here](https://github.com/stormpython/kibana-tag-cloud-plugin/issues).
