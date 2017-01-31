import { EvaEngine, exceptions, wrapper, utils } from 'evaengine';
import models from '../../models';
import entities from '../../entities';

const router = EvaEngine.createRouter();


//@formatter:off
/**
 @swagger
 /blog/posts:
   get:
     summary: Posts list
     tags:
       - Blog
     parameters:
       - name: offset
         in: query
         type: integer
         description: Query offset
       - name: limit
         in: query
         type: integer
         description: Query limit
       - name: order
         in: query
         type: string
         default: -created_at
         enum:
           - created_at
           - -created_at
     responses:
       200:
         schema:
           type: object
           required:
             - pagination
             - results
           properties:
             pagination:
               $ref: '#/definitions/Pagination'
             results:
               type: array
               items:
                 $ref: '#/definitions/BlogPosts'
 */
//@formatter:on
router.get('/posts', wrapper(async(req, res) => {
  const orderScaffold = new utils.apiScaffold.OrderScaffold();
  orderScaffold.setFields([
    'createdAt'
  ], 'createdAt', 'DESC');

  // const { uid } = req.auth;
  // where.deletedAt = 0;
  let { order } = req.query;
  order = orderScaffold.getOrderByQuery(order);

  const { offset, limit } = utils.paginationFilter(req.query, 15, 500);
  const posts = await entities.get('BlogPosts').findAndCountAll({
    offset,
    limit,
    order,
    // where,
    // include: [{
    //   model: entities.get('BlogTexts'),
    //   as: 'text'
    // }]
  });
  return res.json({
    pagination: utils.pagination({
      offset,
      limit,
      req,
      total: posts.count
    }),
    results: posts.rows
  });
}));


//@formatter:off
/**
 @swagger
 /blog/posts/{slug}:
   get:
     summary: Detail of a post
     tags:
       - Blog
     parameters:
       - name: slug
         in: path
         type: string
         description: Post slug
     responses:
       200:
         schema:
           type: object
           $ref: '#/definitions/BlogPosts'
 */
//@formatter:on
router.get('/posts/:slug', wrapper(async(req, res) => {
  const blogModel = new models.BlogPost();
  const { slug } = req.params;
  const post = await blogModel.get(slug);
  if (!post) {
    throw new exceptions.ResourceNotFoundException('Repayment not exists');
  }
  return res.json(post);
}));

module.exports = router;
