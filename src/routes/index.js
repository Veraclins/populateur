import { Router } from 'express';
import location from './location';

const route = Router();

route.use('/locations', location);

export default route;
