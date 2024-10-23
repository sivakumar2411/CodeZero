import { Problem } from "../Model/Problem.js";
import { Testcase } from "../Model/TestCase.js";
import { Topic } from "../Model/Topic.js";
import { User } from "../Model/User.js";
import { UpdateTCandQues } from "./UserController.js";


export const PostNewProblem = async(req,res) =>{

    try{
    const {title,description,inputformat,outputformat,constraints,sampletestcases,ogs,topics,uid,codesnips} = req.body;
    // const maxNo = (await Problem.find()).reduce((max, { problemNo }) => Math.max(max, problemNo || 0), 0);
    const user = await User.findById(uid);
    const newProblem = new Problem({title,codesnips,description,inputformat,outputformat,constraints,ogs,topics,creator:user});
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
        const TCA = [];
        for(const a of req.body.sampletestcases)
        {
            if(!a._id)
            {
                const newTestcase = new Testcase(a);
                const res = await newTestcase.save();
                TCA.push(res._id);
            }
            else
            TCA.push(a._id);
        }
        var aa = 0,maxNo = 0;
        if(!req.body.problemNo)
        {
            aa = 1;
            maxNo = (await Problem.find()).reduce((max, { problemNo }) => Math.max(max, problemNo || 0), 0);
            const updatedProblem = await Problem.findByIdAndUpdate(req.body._id, {...req.body,sampletestcases:TCA,problemNo:maxNo+1}, {new: true});
            if (!updatedProblem) return res.status(404).json({message: "Problem not found"});
            res.status(200).json({updatedProblem});
        }
        else
        {
            const updatedProblem = await Problem.findByIdAndUpdate(req.body._id, {...req.body,sampletestcases:TCA}, {new: true});
            if (!updatedProblem) return res.status(404).json({message: "Problem not found"});
            res.status(200).json({updatedProblem});
        }
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error at Update Problem"+error.message);
        
    }
}

export const GetAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find().populate("creator").populate("topics").populate("sampletestcases");
        res.status(200).json({ problems});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error at Get All Problems"+error.message);
        
    }
}

export const GetAllProblemsForDash = async(req,res) =>{
    try {
        const problems = await Problem.find({status:"Accepted"}).populate("topics");
        if(problems.length === 0)
            return res.status(404).json({message:"No problems found."});
        return res.status(200).json({problems});
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log("Error at GetAllProblemsForDash"+error.message);
    }
}

export const GetProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id).populate("creator").populate("topics").populate("sampletestcases");
        if (!problem) return res.status(404).json({message: "Problem not found"});
        res.status(200).json({ problem});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error at Get Problem By Id"+error.message);
        
    }
}

export const GetProblemByName = async (req, res) => {
    try {
        const problem = await Problem.findOne({title: { $regex: new RegExp(`^${req.query.name}$`, 'i') }}).populate("topics").populate("sampletestcases");
        if (!problem) return res.status(404).json({message: "Problem not found"});
        res.status(200).json({ problem});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error at Get Problem By Name"+error.message);
    }
}

export const GetProblemWithPAS = async(req,res) =>{
    try{
        const page = parseInt(req.query.page) || 1;
        const ppp = parseInt(req.query.ppp) || 30;
        const sortBy = req.query.sort || 'problemNo';
        const order = req.query.order === 'desc' ? -1:1;
        const difficulty = req.query.difficulty;
        const search = req.query.search;

        const skip = (page - 1) * ppp;
        let query = {status:"Accepted"}

        if(difficulty)
            query.difficulty = difficulty;
        if(search)
            query.title = { $regex: new RegExp(`${search}`, 'i') };
            

        const problems = await Problem.find(query).sort({[sortBy] : order}).skip(skip).limit(ppp).populate("topics").populate("sampletestcases");

        // console.log(query);
        
        const allProblems = await Problem.countDocuments(query);
        const totPages = Math.ceil(allProblems/ppp);

        res.status(200).json({problems,top:totPages});
    }
    catch(error){
        res.status(500).json({error:error.message});
        console.log("Error at GetProblemWithPagination"+error.message);
    }
}

export const GetAllProbReqs = async(req, res) =>{
    try{
        const Probs = await Problem.find({status:"Reqs"}).populate("creator").populate("topics").populate("sampletestcases");

        if(Probs.length === 0)
            return res.status(404).json({message:"No problems found."});
        return res.status(200).json({Probs});
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log("Error at GetAllProbReqs"+error.message);
    }
}

export const GetAllAccProb = async(req, res) =>{
    try{
        const Probs = await Problem.find({status:"Accepted"}).populate("creator").populate("topics").populate("sampletestcases");

        if(Probs.length === 0)
            return res.status(404).json({message:"No problems found."});
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
        return res.status(200).json({topics});
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log("Error at Get All Topics"+error.message);
    }
}

export const getTestCasesById = async(req,res) =>{
    try{
        const tc = await Testcase.find({problemId:req.params.id});
        return res.status(200).json({tc});
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log("Error at Get TestCases"+error.message);
    }
}

export const newCases = async(req,res) =>{
    try{
        const newCases = req.body;

        for(const c of newCases)
        {
            if(!c._id)
            {
                const newTestcase = new Testcase(c);
                await newTestcase.save();
            }
        }
        return res.status(201).json({message:"New Test Cases Created"});
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log("Error at newCases"+error.message);
    }
}