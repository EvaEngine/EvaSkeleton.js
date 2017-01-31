import { exceptions, utils } from 'evaengine';
import entities from '../entities';

export default class BlogPost {

  async get(slug, deletedAt = 0) {
    return entities.get('BlogPosts').findOne({
      where: {
        slug,
        deletedAt
      },
      order: [['createdAt', 'DESC'], ['id', 'DESC']]
    });
  }

  async create(input, userId) {
    Object.assign(input, { createdBy: userId, updatedBy: userId });
    const errors = await entities.get('BlogPosts').build(input).validate();
    if (errors) {
      throw new exceptions.ModelInvalidateException(errors);
    }
    let post = {};
    const transaction = await entities.getTransaction();
    try {
      post = await entities.get('BlogPosts').create(input, { transaction });
      transaction.commit();
    } catch (e) {
      transaction.rollback();
      throw new exceptions.DatabaseIOException(e);
    }
    return post;
  }

  async update(id, input, userId) {
    const entity = entities.get('BlogPosts');
    const post = await entity.findById(id);

    if (!post) {
      throw new exceptions.ResourceNotFoundException('Post not found');
    }

    const errors = await entity.build(input).validate();
    if (errors) {
      throw new exceptions.ModelInvalidateException(errors);
    }
    Object.assign(input, { userId });
    const transaction = await entities.getTransaction();
    try {
      await post.update(Object.assign(input, {
        updatedBy: userId
      }), {
        transaction
      });
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
