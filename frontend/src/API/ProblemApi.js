import axios from "axios";

const Api = "http://localhost:1430/Api";

export const GetProbsWithPageAndSort =async()=> await axios.get(`${Api}/Problem`);

export const GetAllProbReqs = async() =>await axios.get(`${Api}/Problem/GetReqs`)

export const PostProblem = async(data) => await axios.post(`${Api}/Problem/Insert`,data);

export const getAllTopics = async() => await axios.get(`${Api}/Topic/GetAll`);