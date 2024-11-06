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


export const getUserById = async(id) => axios.get(`${Api}/User/GetById/${id}`);

export const getUserByUName = async(uname) => axios.get(`${Api}/User/GetByUName/${uname}`);

export const getSubmisions = async(uid,pid) => axios.get(`${Api}/Solution/GetById/${uid}/${pid}`);

export const UpdateNoti = async(id) => axios.get(`${Api}/User/SeenNotifi/${id}`);