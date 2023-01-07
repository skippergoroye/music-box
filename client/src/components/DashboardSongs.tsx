import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justifiy-center items-center gap-20">
        <NavLink to={"/dashboard/newSong"}>
          <IoAdd />
        </NavLink>

        <input
          type="text"
          className="w-52 px-4 py-2"
          placeholder="Search Here..."
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DashboardSongs;
