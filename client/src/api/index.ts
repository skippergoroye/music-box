import axios from 'axios'


const baseURL = "http://localhost:4000";


export const validateUser = async(token: any) => {
    try {
        const res = await axios.get(`${baseURL}/api/users/login`, {
            headers : {
                Authorization : "Bearer " + token,
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)  
    }
}



export const getAllUsers =  async() => {
    try {
        const res = await axios.get(`${baseURL}/api/users/getUsers`);
        return res.data;
        
    } catch (error) {
        console.log(error)   
    }
}



export const getAllSongs = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/songs/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
};


export const getAllArtist = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/artists/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
};





export const getAllAlbums = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/albums/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
};


export const removeUser = async(userId: any)=> {
  try {
    const res = axios.delete(`${baseURL}/api/users/deleteUser/${userId}`)
    return res;
  } catch (error) {
    console.log(error)
  }
}


export const changingUserRole = async (userId: any, role: any ) => {
  try {
    const res = await axios.put(`${baseURL}/api/users/updateRole/${userId}`, { data : { role : role }});
    return res;
  } catch (error) {
    return null;
  }
};






// Just Added


export const saveNewAlbum = async (data: any) => {
  try {
    const res = axios.post(`${baseURL}/api/albums/save`, { ...data });
    return (await res).data.album;
  } catch (error) {
    return null;
  }
};




export const saveNewArtist = async (data: any) => {
  try {
    const res = axios.post(`${baseURL}/api/artists/save`, { ...data });
    return (await res).data.artist;
  } catch (error) {
    return null;
  }
};




export const saveNewSong = async (data: any) => {
  try {
    const res = axios.post(`${baseURL}/api/songs/save`, { ...data });
    return (await res).data.song;
  } catch (error) {
    return null;
  }
};

 