import evaengine from 'evaengine';

const { Entities } = evaengine;
const entities = new Entities(new URL('.', import.meta.url).pathname);
export default entities;
