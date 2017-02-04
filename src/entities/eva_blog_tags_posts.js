import { utils } from 'evaengine';
import schema from './schemas/eva_blog_tags_posts';

module.exports = function (sequelize, DataTypes) {
  const { columns, table } = schema(DataTypes);
  const entity = sequelize.define('BlogTagsPosts', utils.merge(columns, {}), utils.merge(table, {}));
  return entity;
};
