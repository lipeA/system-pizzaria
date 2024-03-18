import {Router, Request, Response } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticates } from './middlewares/isAuthenticates';


const router = Router();

router.post('/users', new CreateUserController().handle )
router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticates, new DetailUserController().handle)


export {router}