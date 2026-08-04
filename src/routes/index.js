import evaengine from 'evaengine';

const { EvaEngine, wrapper } = evaengine;
const router = EvaEngine.createRouter();

router.get('/', wrapper(async (req, res) => {
  res.render('index', { title: 'Express' });
}));
export default router;
