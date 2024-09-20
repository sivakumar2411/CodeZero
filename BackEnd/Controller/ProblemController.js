import { Problem } from "../Model/Problem.js";
import { Testcase } from "../Model/TestCase.js";
import { Topic } from "../Model/Topic.js";
import { User } from "../Model/User.js";
import { UpdateTCandQues } from "./UserController.js";


export const PostNewProblem = async(req,res) =>{

    try{
    const {title,description,inputformat,outputformat,constraints,sampletestcases,ogs,topics,uid} = req.body;
    const maxNo = (await Problem.find()).reduce((max, { problemNo }) => Math.max(max, problemNo || 0), 0);
    const user = await User.findById(uid);
    const newProblem = new Problem({problemNo:maxNo +1,title,description,inputformat,outputformat,constraints,ogs,topics,creater:user});
    const np = await newProblem.save();
    
    const TCA = [];

    for(const a of sampletestcases)
    {
        const newTestcase = new Testcase({problemId:np._id, input:a.input, output:a.output});
        const res = await newTestcase.save();

        TCA.push(res);

        await UpdateTCandQues(uid,"ContributedTestCases",res);
    }

    np.sampletestcases = TCA;
    np.save();

    await UpdateTCandQues(uid,"ContributedProbs",np);

    res.status(201).json({np});
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log("Errot at Post New Problem"+error.message);
        
    }
}

export const UpdateProblem = async(req, res) => {
    try {
        const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedProblem) return res.status(404).json({msg: "Problem not found"});
        res.status(200).json({updatedProblem});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error at Update Problem"+error.message);
        
    }
}

export const GetAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json({ problems});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error at Get All Problems"+error.message);
        
    }
}

export const GetProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) return res.status(404).json({msg: "Problem not found"});
        res.status(200).json({ problem});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error at Get Problem By Id"+error.message);
        
    }
}

export const GetProblemWithPAS = async(req,res) =>{
    try{
        const page = parseInt(req.query.page) || 1;
        const sortBy = req.query.sort || 'problemNo';
        const order = req.query.order === 'desc' ? -1:1;

        const skip = (page - 1) * 30;

        const problems = await Problem.find({}).sort({[sortBy] : order}).skip(skip).limit(30);

        const allProblems = await Problem.countDocuments();
        const totPages = Math.ceil(allProblems/30);

        res.status(200).json({allProblems});
    }
    catch(error){
        res.status(500).json({error:error.message});
        console.log("Error at GetProblemWithPagination"+error.message);
    }
}

export const GetAllProbReqs = async(req, res) =>{
    try{
        const Probs = await Problem.find({status:"Reqs"});
        return res.status(200).json({Probs});
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log("Error at GetAllProbReqs"+error.message);
    }
}

export const InsertNewTopic = async(req,res) =>{
    try{
        const {name,description} = req.body;
        const newTopic = new Topic({name,description});
        await newTopic.save();
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log("Error at Insert New Topic"+error.message);
    }
}

export const InsertAllTopics = async(req,res) =>{
    try{
        const topic = req.body;
        for(const t in topic)
        {
            const {name, description} = t;
            const newTopic = new Topic({name, description});
            await newTopic.save();
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log("Error at Insert All New Topic"+error.message);
    }
}

export const getAllTopics =async(req,res) =>{
    try{
        const topics = await Topic.find();
        res.status(200).json({topics});
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log("Error at Get All Topics"+error.message);
    }
}