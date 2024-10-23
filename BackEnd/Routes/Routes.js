import express from 'express';
import { getAllUser, getUserById, getUserByUname, LogIn, LogOut, postNewUser, updateUser } from '../Controller/UserController.js';
import { GetAllAccProb, GetAllProblems, GetAllProblemsForDash, GetAllProbReqs, getAllTopics, GetProblemById, GetProblemByName, GetProblemWithPAS, getTestCasesById, InsertAllTopics, InsertNewTopic, newCases, PostNewProblem, UpdateProblem } from '../Controller/ProblemController.js';
import { GetSolutionByIds, GetSolutionsByProblemId, PostNewSolution } from '../Controller/SolutionController.js';
import { Execute, IDEExecution, RunTestCases, SubmitTestCases} from '../Controller/CodeExecution.js';

const router = express.Router();

//User Routes
router.post("/User/Insert",postNewUser);
router.post("/User/LogIn",LogIn);
router.get("/User/LogOut",LogOut);
router.put("/User/Update",updateUser);
router.get("/User/GetAll",getAllUser);
router.get("/User/GetById/:id",getUserById);
router.get("/User/GetByUName/:uname",getUserByUname);

//Problem Routes
router.post("/Problem/Insert",PostNewProblem);
router.put("/Problem/Update",UpdateProblem);
router.get("/Problem/GetAll",GetAllProblems);
router.get("/Problem/GetReqs",GetAllProbReqs);
router.get("/Problem/GetAccProbs",GetAllAccProb);
router.get("/Problem/GetById/:id",GetProblemById);
router.get("/Problem/GetByName",GetProblemByName);
router.get("/Problem",GetProblemWithPAS);
router.get("/Problem/GetForDash",GetAllProblemsForDash);

router.post("/Topic/Insert",InsertNewTopic);
router.post("/Topic/InsertAll",InsertAllTopics);
router.get("/Topic/GetAll",getAllTopics);

router.get("/Testcase/GetById/:id",getTestCasesById);
router.post("/Testcase/Insert",newCases);

//Solution Routes
router.post("/Solution/InsertNew/:userId/:problemId",PostNewSolution);
router.get("/Solution/GetById/:userId/:problemId",GetSolutionByIds);
router.get("/Solution/GetById/:problemId",GetSolutionsByProblemId);

//Execute
router.post("/Execute",IDEExecution);
router.post("/Run",RunTestCases);
router.post("/Submit",SubmitTestCases)


export default router;