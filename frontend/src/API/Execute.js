import axios from "axios";

export const Execute = async(data)=>await axios.post("http://localhost:1430/Api/Execute",data);

export const RunTestCases = async(data) => await axios.post("http://localhost:1430/Api/Run",data);

export const SubmitTestCases = async(data) => await axios.post("http://localhost:1430/Api/Submit",data);