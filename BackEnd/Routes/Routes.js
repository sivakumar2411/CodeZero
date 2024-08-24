import express from 'express';
import { getAllUser, getUserById, postNewUser, updateUser } from '../Controller/UserController.js';

const router = express.Router();

//User Routes
router.post("/User/Insert",postNewUser);
router.put("/User/Update",updateUser);
router.get("/User/GetAll",getAllUser);
router.get("/User/GetById/:id",getUserById);


export default router;