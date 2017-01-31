import merge from 'lodash/merge';
import { DI } from 'evaengine';
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
        BlogPosts.belongsToMany(entities.BlogTags, {
          as: 'tags',
          through: {
            model: entities.BlogTagsPosts,
            unique: false
          },
          constraints: false,
          foreignKey: 'postId',
          otherKey: 'tagId'
        });
      }
    }
  }));
  BlogPosts.beforeCreate((entity) => {
    entity.createdAt = DI.get('now').getTimestamp();
    entity.updatedAt = DI.get('now').getTimestamp();
  });
  BlogPosts.beforeUpdate((entity) => {
    entity.updatedAt = DI.get('now').getTimestamp();
  });
  return BlogPosts;
};
