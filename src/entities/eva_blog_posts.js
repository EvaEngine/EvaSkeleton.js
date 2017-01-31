import merge from 'lodash/merge';
import schema from './schemas/eva_blog_posts';

module.exports = function (sequelize, DataTypes) {
  const { columns, table } = schema(DataTypes);
  const BlogPosts = sequelize.define('BlogPosts', merge(columns, {}), merge(table, {
    classMethods: {
      associate: (entities) => {
        BlogPosts.hasOne(entities.BlogTexts, {
          as: 'text',
          foreignKey: 'postId'
        });
      }
    }
  }));
  return BlogPosts;
};
