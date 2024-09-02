export const PostNewSolution = async(req,res)=>{
    try{
        const {problemId,userId} = req.params;
        const {language,code,status} = req.body;
        const newSolution = new Solution({problemId,userId,language,code,status});
        await newSolution.save();
        res.status(200).json({data:newSolution});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Post New Solution "+error.message);
    }
}

export const GetSolutionByIds = async(req,res) =>{
    try{
        const solutions = await Solution.find({problemId:req.params.problemId,userId:req.params.userId});
        res.status(200).json({data:solutions});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Get Solution By ProblemId "+error.message);
    }
}

