import { Router } from 'express';
import location from './location';
import auth from './auth';
import authenticate from '../middlewares/authenticate';

const route = Router();

route.use('/locations', authenticate, location);
route.use('/auth', auth);

export default route;
