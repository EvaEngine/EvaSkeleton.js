import merge from 'lodash/merge';
import schema from './schemas/eva_blog_tags_posts';

module.exports = function (sequelize, DataTypes) {
  const { columns, table } = schema(DataTypes);
  const BlogTagsPosts = sequelize.define('BlogTagsPosts', merge(columns, {}), merge(table, {}));
  return BlogTagsPosts;
};