import {Router, Request, Response} from 'express';

import {CreateUsersController} from "../controllers/user/CreateUserController"

const router = Router();

router.post("/users", new CreateUsersController().handle)


export {router} 




