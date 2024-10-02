import axios from "axios";

const Api = "http://localhost:1430/Api";

export const GetProbsWithPageAndSort =async(data)=> await axios.get(`${Api}/Problem`,{params:data});

export const GetAllProbReqs = async() =>await axios.get(`${Api}/Problem/GetReqs`)

export const GetAllAccProb = async() =>await axios.get(`${Api}/Problem/GetAccProbs`)

export const PostProblem = async(data) => await axios.post(`${Api}/Problem/Insert`,data);

export const UpdateProblem = async(data) => await axios.put(`${Api}/Problem/Update`,data);

export const getProblemById = async(id) => await axios.get(`${Api}/Problem/GetById/:${id}`);

export const getProblemByName = async(a) => await axios.get(`${Api}/Problem/GetByName`,{params:{name:a}});

export const getAllTopics = async() => await axios.get(`${Api}/Topic/GetAll`);

export const getTestCasesById = async(id) => await axios.get(`${Api}/Testcase/GetById/${id}`);

export const PostTestCases = async(data) => await axios.post(`${Api}/Testcase/Insert`,data);