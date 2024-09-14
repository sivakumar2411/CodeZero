import axios from "axios";

const Api = "http://localhost:1430/Api";

export const PostNewUser =async(data) =>{
    const nU = {
        ...data,
        name:data.uname
    }
    

    return await axios.post(`${Api}/User/Insert`,nU);

}

export const LoginUser = async(data) =>{
    return await axios.post(`${Api}/User/LogIn`,data);
}