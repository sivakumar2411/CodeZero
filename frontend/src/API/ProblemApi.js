import axios from "axios";

const Api = "http://localhost:1430/Api";

export const GetProbsWithPageAndSort =async()=> await axios.get(`${Api}//Problem`);