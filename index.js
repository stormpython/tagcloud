module.exports = function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: ['plugins/sp-wordcloud/word_cloud']
    }
  });
};
