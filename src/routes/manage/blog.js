import { EvaEngine, DI, wrapper, utils, exceptions } from 'evaengine';
import models from '../../models';
import entities from '../../entities';

const router = EvaEngine.createRouter();
const validator = DI.get('validator');
const auth = DI.get('auth')();

//@formatter:off
/**
 @swagger
 /manage/blog/posts:
   get:
     summary: Posts list
     tags:
       - Manage_Blog
     parameters:
       - name: offset
         in: query
         type: integer
         description: Query offset
       - name: limit
         in: query
         type: integer
         description: Query limit
       - name: status
         in: query
         description: Post status
         type: array
         enum:
           - draft
           - published
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
                 $ref: '#/definitions/Posts'
 */
//@formatter:on
router.get('/posts', wrapper(async(req, res) => {
  const orderScaffold = new utils.apiScaffold.OrderScaffold();
  orderScaffold.setFields(['id', 'createdAt'], 'id', 'DESC');

  const where = { deletedAt: 0 };
  let { order, status } = req.query;
  status = status ? status.split(',') : null;
  if (status) {
    where.status = { $in: status };
  }
  order = orderScaffold.getOrderByQuery(order);

  const { offset, limit } = utils.paginationFilter(req.query, 15, 500);
  const posts = await entities.get('BlogPosts').findAndCountAll({
    offset,
    limit,
    order,
    where
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
 /manage/blog/posts:
   post:
     summary: Create new post
     tags:
       - Manage_Blog
     parameters:
       - name: body
         in: body
         description: Post info
         required: true
         schema:
           $ref: '#/definitions/Post'
     responses:
       200:
         schema:
           type: object
           $ref: '#/definitions/Post'
 */
//@formatter:on
router.post('/', auth, validator(v => ({
  body: {
    title: v.required(),
    status: v.string().allow(['draft', 'published']).optional()
  }
})), wrapper(async(req, res) => {
  const { uid } = req.auth;
  const postModel = new models.BlogPost();
  const post = await postModel.create(req.body, uid);
  res.json(post);
}));


//@formatter:off
/**
 @swagger
 /manage/blog/posts/{id}:
   put:
     summary: Update post
     tags:
       - Manage_Blog
     parameters:
       - name: id
         in: path
         description: Post ID
         required: true
       - name: body
         in: body
         description: Post Info
         required: true
         schema:
           $ref: '#/definitions/BlogPosts'
     responses:
       200:
         schema:
           type: object
           $ref: '#/definitions/BlogPosts'
 */
//@formatter:on
router.put('/posts/:id', auth, validator(v => ({
  body: {
    title: v.required(),
    status: v.string().allow(['draft', 'published']).optional()
  }
})), wrapper(async(req, res) => {
  const { uid } = req.auth;
  const { id } = req.params;
  const postModel = new models.BlogPost();
  const post = await postModel.update(id, req.body, uid);
  res.json(post);
}));

//@formatter:off
/**
 @swagger
 /manage/blog/posts/{id}:
   get:
     summary: Get post info
     tags:
       - Manage_Blog
     parameters:
       - name: id
         in: path
         description: Post ID
         required: true
     responses:
       200:
         schema:
           type: object
           $ref: '#/definitions/BlogPosts'
 */
//@formatter:on
router.get('/posts/:id', auth, wrapper(async(req, res) => {
  const result = await entities.get('BlogPosts').findOne({
    where: { id: req.params.id }
  });

  if (!result) {
    throw new exceptions.ResourceNotFoundException('Post not found');
  }

  res.json(result);
}));

//@formatter:off
/**
 @swagger
 /manage/blog/posts/{id}:
   delete:
     summary: Remove post
     tags:
       - Manage_Blog
     parameters:
       - name: id
         in: path
         description: Post ID
         required: true
     responses:
       200:
         schema:
           type: object
           $ref: '#/definitions/BlogPosts'
 */
//@formatter:on
router.delete('/blog/:id', auth, wrapper(async(req, res) => {
  const id = req.params.id;
  const postModel = new models.BlogPost();
  const post = await postModel.remove(id);
  res.json(post);
}));

module.exports = router;
