import axios from 'axios';
import { Testcase } from '../Model/TestCase.js';
import { Problem } from '../Model/Problem.js';
import mongoose from 'mongoose';
import { User } from '../Model/User.js';
import { Solution } from '../Model/Solution.js';
// import {exec} from 'child_process';
// import fs from 'fs';
// import { stdin } from 'process';

export const IDEExecution = async(req,res) =>{
    try{
        const {code,language,input} = req.body;

        res.status(200).json(await Execute({code,language,input}));
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log("Error at IDE Execution "+error.message);
    }
}

export const Execute =async({code,language,input}) =>{
    try{
        
        let Data;

        // let command,filename;

        // switch(language)
        // {
        //     case 'python':
        //         command = `python3 -c "${code.replace(/"/g,'\\"')}"`;
        //         break;
        //     case 'cpp':
        //         filename = 'temp.cpp';
        //         fs.writeFileSync(filename, code);
        //         command = `g++ ${filename} -o temp.out && ./temp.out`;
        //         break;
        //     case 'javascript':
        //         command = `node -e "${code.replace(/"/g,'\\"')}"`;
        //         break;
        //     case 'java':
        //         filename = 'Main.java';
        //         fs.writeFileSync(filename, code);
        //         command = `javac ${filename} && java Main`;
        //         break;
        //     default:
        //         res.status(400).json({message: 'Unsupported Language'});
        //         return;
        // }
        // exec(command,(error,stdout,stderr)=>{
        //     if (language === 'cpp') {
        //         if (fs.existsSync('temp.cpp')) fs.unlinkSync('temp.cpp');
        //         if (fs.existsSync('temp.out')) fs.unlinkSync('temp.out');
        //     } else if (language === 'java') {
        //         if (fs.existsSync('Main.java')) fs.unlinkSync('Main.java');
        //         if (fs.existsSync('Main.class')) fs.unlinkSync('Main.class');
        //     }
        //     if(error)
        //         res.status(500).json({message: error.message});
        //     else
        //         res.json({data:{stdout,stderr}});
        // })

        switch(language){
            case 'python':
                Data={
                    language:'python',
                    version: "3.10.0",
                    aliases: ["py","py3","python3","python3.10"],
                    files: [
                        {
                            name:"main.py",
                            content:code 
                        }
                    ],
                    stdin:input
                }
            break;
            case 'c':
                Data={
                    language:'c',
                    version: "10.2.0",
                    aliases: ["gcc"],
                    files: [
                        {
                            name:"main.c",
                            content:code 
                        }
                    ],
                    stdin:input
                }
                break;
            case 'cpp':
                Data={
                    language:'cpp',
                    version: "10.2.0",
                    aliases: ["g++","cpp"],
                    files: [
                        {
                            name:"main.cpp",
                            content:code 
                        }
                    ],
                    stdin:input
                }
                break;
            case 'javascript':
                Data={
                    language: "javascript",
                    version: "18.15.0",
                    aliases: [
                        "node-javascript",
                        "node-js",
                        "javascript",
                        "js"
                    ],
                    files: [
                        {
                            name:"main.js",
                            content:code 
                        }
                    ],
                    stdin:input
                }
                break;
            case 'java':
                Data={
                    language:'java',
                    version: "15.0.2",
                    aliases: ["javac"],
                    files: [
                        {
                            name:"Main.java",
                            content:code 
                        }
                    ],
                    stdin:input
                }
                break;
            default:
                return ({message: 'Unsupported Language'});
        }
        const st = Date.now();
        const response = await axios.post("https://emkc.org/api/v2/piston/execute",Data);
        return ({
            stdout: response.data.run.stdout,
            stderr: response.data.run.stderr,
            output: response.data.run.output,
            extime:Date.now() - st
        });

    }
    catch(error){
        console.log("Error at executing code "+error.message);
    }

} 


export const RunTestCases = async(req,res) =>{
    try{
        const {code,language,ocode,olanguage,testcases} = req.body;
        const results = [];
        for(let i=0; i<testcases.length; i++)
        {
            const {input} = testcases[i];
            const result = await Execute({code,language,input});
            const ores = await Execute({code:ocode,language:olanguage,input});

            // console.log(result);
            
            if(result.stderr.length > 0)
                return res.status(404).json({message: result.stderr});

            let Op = result.stdout.split("STDOUT");
            // console.log(Op);
            

            results.push({
                ...testcases[i],
                expected: ores.output,
                output: Op.length > 1? Op[1]:Op[0],
                stdo:Op.length > 1 ? Op[0]:"",
                isPass:Op.length >1 ? Op[1] === ores.output : Op[0] === ores.output
            });
            
        }
        
        return res.status(200).json({results});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at RunTestCases "+error);
    }
}

// export const GetTestCases = async(pId) =>{
//     try{
//         console.log(pId);
        
//         return await Testcase.find({problemId:pId});
//     }
//     catch(error){
//         console.log("Error at GetTestCases "+error.message);
//     }
// }

export const SubmitTestCases = async(req,res) =>{
    try{
        const {code,language,pId,uId,scode} = req.body;
        const testcases = await Testcase.find({problemId:pId});
        const user = await User.findById(uId);
        let exTime = 0;
        

        for(let i=0;i<testcases.length;i++)
        {
            const {input} = testcases[i];
            const result = await Execute({code,language,input});

            console.log(result);
            
            if(result.stderr.length > 0)
            {
                const sol = new Solution({
                    problemId:pId,
                    code: scode,
                    language: language,
                    userId:uId,
                    Error: result.stderr,
                    passed:i,
                    status:"Error"
                });
                if (!user.NotSolved && !user.SolvedProbs?.some(({ problemID }) => problemID === pId)) {
                    user.NotSolved = [{ problemID: pId }];
                    await user.save();
                }
                else if ( Array.isArray(user.NotSolved) && !user.NotSolved.some(({ problemID }) => problemID === pId) && !user.SolvedProbs?.some(({ problemID }) => problemID === pId) ) {
                    user.NotSolved.push({ problemID: pId });
                    await user.save();
                }
                await sol.save();
                return res.status(404).json({message:"Error saving solution"});
            }
            let Op = result.stdout.split("STDOUT");

            const sresult = {
                input: testcases[i].input,
                expected: testcases[i].output,
                output: Op.length > 1? Op[1]:Op[0],
                stdo:Op.length > 1 ? Op[0]:""
            };
            exTime += result.extime;
            if(exTime !== result.extime)
                exTime /= 2;
            if(testcases[i].output !== sresult.output)
            {
                if (!user.NotSolved && !user.SolvedProbs?.some(({ problemID }) => problemID === pId)) {
                    user.NotSolved = [{ problemID: pId }];
                    await user.save();
                }
                else if ( Array.isArray(user.NotSolved) && !user.NotSolved.some(({ problemID }) => problemID === pId) && !user.SolvedProbs?.some(({ problemID }) => problemID === pId) ) {
                    user.NotSolved.push({ problemID: pId });
                    await user.save();
                }
                const sol = new Solution({
                    problemId:pId,
                    code: scode,
                    language: language,
                    userId:uId,
                    input: sresult.input,
                    output: sresult.output,
                    expected: sresult.expected,
                    stdo: sresult.stdo,
                    total:testcases.length,
                    passed:i
                });
                await sol.save();
                return res.status(400).json({sresult,ttc:testcases.length,passed:i});
            }
        }
        if (user.NotSolved?.some(({ problemID }) => problemID === pId))
        user.NotSolved = user.NotSolved.filter(({ problemID }) => problemID !== pId);
        if (!user.SolvedProbs)
        {
            user.SolvedProbs = [{ problemID: pId }];
            await user.save();
        }
        else if (!user.SolvedProbs.some(({ problemID }) => problemID === pId))
        {
            user.SolvedProbs.push({ problemID: pId });
            await user.save();
        }
        const sol = new Solution({
            problemId:pId,
            code: scode,
            language: language,
            userId:uId,
            status:"Solved",
            executionTime:exTime - 4000
        });
        await sol.save();
        return res.status(200).json({ttc:testcases.length});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at SumbmitTestCases "+error);
    }
}