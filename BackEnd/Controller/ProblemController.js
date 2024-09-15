import { Problem } from "../Model/Problem.js";


export const PostNewProblem = async(req,res) =>{

    try{
    const {title,description,difficulty,inputformat,outputformat,constraints,sampleinput,sampleoutput,ogs,topics} = req.body;

    const newProblem = new Problem({title,description,difficulty,inputformat,outputformat,constraints,sampleinput,sampleoutput,ogs});
    await newProblem.save();

    

    res.status(201).json({newProblem});
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