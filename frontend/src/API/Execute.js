import axios from "axios";

export const Execute = async(data)=>await axios.post("http://localhost:1430/Api/Execute",data);