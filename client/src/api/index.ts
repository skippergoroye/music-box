import axios from 'axios'


const baseURL = "http://localhost:4000/";


export const validateUser = async(token: any) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers : {
                Authorization : "Bearer " + token,
            }
        })
        return res.data;
        console.log(data)
    } catch (error) {
        
    }
}