import axios from 'axios';
import {exec} from 'child_process';
import fs from 'fs';
import { stdin } from 'process';

export const Execute =async(req,res) =>{
    try{
        const {code,language,input} = req.body;

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
                res.status(400).json({message: 'Unsupported Language'});
                return;
        }
        const response = await axios.post("https://emkc.org/api/v2/piston/execute",Data);
        return res.json({
            stdout: response.data.run.stdout,
            stderr: response.data.run.stderr,
            output: response.data.run.output
        });

    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at executing code "+error.message);
    }

} 