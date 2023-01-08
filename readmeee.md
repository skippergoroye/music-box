import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";

import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import { actionType } from "../context/reducer";
import { IoMusicalNote } from "react-icons/io5";
import FilterButtons from "./FilterButtons";


import { filterByLanguage, filters } from "../utils/supportfunctions";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashBoardNewSong = () => {

  const [songName, setSongName] = useState("")
  const [{ allArtist, allAlbums }, dispatch]: any = useStateValue();


useEffect(() => {
  if(!allArtist){
    getAllArtist().then(data => {
      dispatch({
        type: actionType.SET_ALL_ARTIST,
        allArtist: data.data,
      });
      console.log(data)
    })
  }

  if(!allAlbums){
    getAllAlbums().then(data => {
      dispatch({
        type: actionType.SET_ALL_ALBUMS,
        allAlbums: data.data,
      });
      console.log(data)
    })
  }
}, [])



  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
      DashBoardNewSong helleo
      <input
        type="text"
        placeholder="Type your song name..."  
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-30" //bg-transparent
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />


      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButtons filterData={"allArtist"} flag={"Artist"} />
        <FilterButtons filterData={"allAlbums"} flag={"Albums"} />
        <FilterButtons filterData={"filterByLanguage"} flag={"language"} />
        <FilterButtons filterData={"filters"} flag={"Category"} />
      </div>
    </div>
  );
};

export default DashBoardNewSong;
