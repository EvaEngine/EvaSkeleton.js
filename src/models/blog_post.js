import { exceptions, utils } from 'evaengine';
import entities from '../entities';

export default class BlogPost {

  async get(idOrslug, deletedAt = 0) {
    const where = /^\d+$/.test(idOrslug) ? { id: idOrslug } : { slug: idOrslug };
    return entities.get('BlogPosts').findOne({
      where: Object.assign(where, {
        deletedAt
      }),
      include: [{
        model: entities.get('BlogTexts'),
        as: 'text'
      }, {
        model: entities.get('BlogTags'),
        as: 'tags'
      }],
      order: [['createdAt', 'DESC'], ['id', 'DESC']]
    });
  }

  async create(input, userId) {
    Object.assign(input, { createdBy: userId, updatedBy: userId });
    const errors = await entities.get('BlogPosts').build(input).validate();
    if (errors) {
      throw new exceptions.ModelInvalidateException(errors);
    }
    let { tags } = input;
    if (tags && Array.isArray(tags)) {
      tags = await Promise.all(tags.map(tag => entities.get('BlogTags').findOne({ where: { tagName: tag.tagName } }).then(t => t || tag)));
      Object.assign(input, {
        tagsPosts: tags.filter(t => t.id > 0).map(t => ({ tagId: t.id })),
        tags: tags.filter(t => !t.id)
      });
    }
    let post = {};
    const transaction = await entities.getTransaction();
    try {
      post = await entities.get('BlogPosts').create(input, {
        include: [{
          model: entities.get('BlogTexts'),
          as: 'text'
        }, {
          model: entities.get('BlogTags'),
          as: 'tags'
        }, {
          model: entities.get('BlogTagsPosts'),
          as: 'tagsPosts'
        }],
        transaction
      });
      transaction.commit();
    } catch (e) {
      transaction.rollback();
      throw new exceptions.DatabaseIOException(e);
    }
    return this.get(post.id);
  }

  async update(id, input, userId) {
    const entity = entities.get('BlogPosts');
    const post = await this.get(id);

    if (!post) {
      throw new exceptions.ResourceNotFoundException('Post not found');
    }

    let { tags = [] } = input;
    tags = await Promise.all(tags.map(tag => entities.get('BlogTags').findOne({ where: { tagName: tag.tagName } }).then(t => t || tag)));
    Object.assign(input, {
      tagsPosts: tags.filter(t => t.id > 0).map(t => ({ tagId: t.id, postId: post.id })),
      tags: tags.filter(t => !t.id)
    });


    const errors = await entity.build(input).validate();
    if (errors) {
      throw new exceptions.ModelInvalidateException(errors);
    }
    Object.assign(input, { userId });
    const transaction = await entities.getTransaction();
    try {
      for (const tag of post.tags) {
        await tag.BlogTagsPosts.destroy({ transaction });
      }
      for (const tag of input.tags) {
        const t = await entities.get('BlogTags').create(tag, { transaction });
        await post.addTags([t], { transaction });
      }
      // post.addTagsPosts(input.tagsPosts, { transaction });
      for (const tagPost of input.tagsPosts) {
        await entities.get('BlogTagsPosts').create(tagPost, { transaction });
      }
      //NOTE: update relations MUST before update main entity
      await post.text.update(input.text, { transaction });
      await post.update(Object.assign(input, {
        updatedBy: userId
      }), { transaction });
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw new exceptions.DatabaseIOException(e);
    }
    return entity.findById(id, { useMaster: true });
  }

  async remove(id) {
    const post = await entities.get('BlogPosts').findOne({
      where: {
        id
      }
    });

    if (!post) {
      throw new exceptions.ResourceNotFoundException('Post not found');
    }

    await post.update({
      deletedAt: utils.getTimestamp()
    });
    return post;
  }
}
