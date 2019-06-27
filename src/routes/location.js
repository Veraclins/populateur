import { Router } from 'express';
import controller from '../controllers/location';

const route = Router();

route.post('/', controller.create);
route.get('/', controller.getAll);
route.get('/:id', controller.getOne);
route.put('/:id', controller.update);
route.delete('/:id', controller.delete);

export default route;
