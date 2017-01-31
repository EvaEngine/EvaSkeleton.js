import merge from 'lodash/merge';
import marked from 'marked';
import schema from './schemas/eva_blog_texts';

module.exports = function (sequelize, DataTypes) {
  const { columns, table } = schema(DataTypes);
  const entity = sequelize.define('BlogTexts', merge(columns, {}), merge(table, {
    getterMethods: {
      markedContent: function () {
        return marked(this.content);
      }
    }
  }));
  return entity;
};
