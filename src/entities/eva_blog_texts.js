import { utils } from 'evaengine';
import schema from './schemas/eva_blog_texts';

module.exports = function (sequelize, DataTypes) {
  const { columns, table } = schema(DataTypes);
  const entity = sequelize.define('BlogTexts', utils.merge(columns, {}), utils.merge(table, {
    getterMethods: {
      markedContent: function () {
        return marked(this.content);
      }
    }
  }));
  return entity;
};
