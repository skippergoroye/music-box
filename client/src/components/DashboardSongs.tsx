import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { getAllArtist, getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import SongCard from "./SongCard";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [{ allSongs }, dispatch]: any = useStateValue();


  useEffect(() => {
    if(!allSongs){
      getAllSongs().then((data) => {
        console.log(data.songs);
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs,
        })
      })
    }
  })

  //  Tools needed to call data from the backend
  // export const getAllSongs = async () => {
  //   try {
  //     const res = await axios.get(`${baseURL}/api/songs/getAll`);
  //     return res.data;
  //   } catch (error) {
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   if (!allArtist) {
  //     getAllArtist().then((data) => {
  //       dispatch({
  //         type: actionType.SET_ALL_ARTIST,
  //         allArtist: data.songs,
  //       });
  //     });
  //   }
  // }, []);




  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justifiy-center items-center gap-20">
        <NavLink
          to={"/dashboard/newSong"}
          className="flex items-center px-4 py-3 border rounded-md border-red-300 hover:border-blue-500 cursor-pointer"
        >
          <IoAdd />
        </NavLink>

        <input
          type="text"
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-blue-300" : "border-red-400"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          placeholder="Search Here..."
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => {
            setIsFocus(false);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
        />

        <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
        </i>
      </div>

      {/* Main container */}
      <div className="relative w-full my-8 p-4 py-16 border border-gray-600 rounded-md">
        {/* The count */}
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count:{" "}
            </span>
            {allSongs?.length}
          </p>
        </div>

        <SongContainer data={allSongs} />
      </div>
    </div>
  );
};



export const SongContainer = ({ data }: any) => {
  return (
      <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {
        data && (
          data?.map((song: any, index: any)=>(
            <SongCard key={song._id} data={song} index={index} type={song} /> 
          ))
        )
      }
    </div>
  );
};

export default DashboardSongs;
