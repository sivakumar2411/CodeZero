import express from 'express';
import { getAllUser, getUserById, postNewUser, updateUser } from '../Controller/UserController.js';
import { GetAllProblems, GetProblemById, PostNewProblem, UpdateProblem } from '../Controller/ProblemController.js';
import { GetSolutionByIds, PostNewSolution } from '../Controller/SolutionController.js';
import { Execute } from '../Controller/CodeExecution.js';

const router = express.Router();

//User Routes
router.post("/User/Insert",postNewUser);
router.put("/User/Update",updateUser);
router.get("/User/GetAll",getAllUser);
router.get("/User/GetById/:id",getUserById);

//Problem Routes
router.post("/Problem/Insert",PostNewProblem);
router.put("/Problem/Update",UpdateProblem);
router.get("/Problem/GetAll",GetAllProblems);
router.get("/Problem/GetById/:id",GetProblemById);

//Solution Routes
router.post("/Solution/InsertNew/:userId/:problemId",PostNewSolution);
router.get("/Solution/GetById/:userId/:problemId",GetSolutionByIds);

//Execute
router.post("/Execute",Execute);


export default router;