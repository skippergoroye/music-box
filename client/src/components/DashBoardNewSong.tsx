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
  const [songName, setSongName] = useState("");
  const [{ allArtist, allAlbums }, dispatch]: any = useStateValue();

  // uplaod image
  const [isImageloading, setIsImageloading] = useState(false);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  useEffect(() => {
    if (!allArtist) {
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTIST,
          allArtist: data.artist,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
      <input
        type="text"
        placeholder="Type your song name..."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-30" //bg-transparent
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />

      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButtons filterData={["allArtist"]} flag={"Artist"} />
        <FilterButtons filterData={["allAlbums"]} flag={"Album"} />
        <FilterButtons filterData={["filterByLanguage"]} flag={"language"} />
        <FilterButtons filterData={["filters"]} flag={"Category"} />
      </div>

      {/* upload bar */}
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageloading && <FileLoader progress={imageUploadProgress} />}
        {!isImageloading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageloading}
                isImage={true}
              />
            ) : (
              <div></div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const FileLoader = ({ progress }: any) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl"></div>
      </div>
    </div>
  );
};

export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}: any) => {
  const uploadFile = (e: any) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];

    // fire base image location storage reference
    const storageRef = ref(
      storage,
      `${isImage ? "Images" : "Audio"}/ ${Date.now()}-${uploadedFile.name}`
    );
  };
  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to upload {isImage ? "an iamge" : "an audio "}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="uplaod-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className={"w-0 h-0"}
        onChange={uploadFile}
      />
    </label>
  );
};

export default DashBoardNewSong;
