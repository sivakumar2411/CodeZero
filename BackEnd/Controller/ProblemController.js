

export const PostNewProblem = async(req,res) =>{

    try{
    const {title,description,difficulty,inputformat,outputformat,constraints,sampleinput,sampleoutput,ogs,topics} = req.body;

    const newProblem = new Problem({title,description,difficulty,inputformat,outputformat,constraints,sampleinput,sampleoutput,ogs});
    await newProblem.save();

    

    res.status(201).json({msg: "New problem created successfully", data: newProblem});
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
        res.json({msg: "Problem updated successfully", data: updatedProblem});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error at Update Problem"+error.message);
        
    }
}

export const GetAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json({data: problems});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error at Get All Problems"+error.message);
        
    }
}

export const GetProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) return res.status(404).json({msg: "Problem not found"});
        res.json({data: problem});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error at Get Problem By Id"+error.message);
        
    }
}