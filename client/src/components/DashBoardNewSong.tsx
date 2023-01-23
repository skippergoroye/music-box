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
  const [
    {
      allArtist,
      allAlbums,
      albumFilter,
      artistFilter,
      allSongs,
      languageFilter,
      filterTerm,
      alertType
    },
    dispatch,
  ]: any = useStateValue();

  // uplaod image
  const [isImageloading, setIsImageloading] = useState(false);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  // Audio start
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioUploadingProgress, setAudioUploadingProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isAudioImageCover, setAudioImageCover] = useState(null)

  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [isArtistUploading, setIsArtistUploading] = useState(false);
  const [artistName, setArtistName] = useState("");

  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

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



    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs,
        });
      });
    }
  }, []);

  const deleteFileObject = (url: any, isImage: any) => {
    if (isImage) {
      setIsImageloading(true);
      setIsAudioLoading(true);
      setIsAlbumUploading(true);
      setIsArtistUploading(true);
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "success"
      })

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType : null
        })
      }, 4000);
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "danger"
      })

      setAudioUrl(null);
      setSongImageCover(null);
      setAudioImageCover(null);
      setArtistImageCover(null)
      setAlbumImageCover(null)
      setIsImageloading(false);
      setIsAudioLoading(false);
      setIsAlbumUploading(false);
      setIsArtistUploading(false);
    });
    dispatch({
      type : actionType.SET_ALERT_TYPE,
      alertType : "success"
    })

    setInterval(() => {
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : null
      })
    }, 5000)
  };

  const saveSong = () => {
    if (!songImageCover || !audioUrl) {
      //throw alert
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "danger"
      })

      setInterval(() => {
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      }, 5000)
    } else {
      setIsAudioLoading(true);
      setIsImageloading(true);

      const data = {
        name: songName,
        imageUrl: songImageCover,
        songURL: audioUrl,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };

      // saveNewSong(data).then((res)=> {
      //   getAllSongs().then((songs) => {
      //     dispatch({
      //       type: actionType.SET_ALL_SONGS,
      //       allSongs: songs.songs,
      //     });
      //   });
      // })

      saveNewSong(data).then((res) => {
        getAllSongs().then((songs) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: songs.songs,
          });
        });
      });

      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "success"
      })

      setInterval(() => {
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      }, 5000)

      // setSongName(null);
      setIsAudioLoading(false)
      setIsImageloading(false)
      setSongImageCover(null)
      setAudioImageCover(null)
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null })
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null})
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null})
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null})
    }
  };


  const saveArtist = () => {
    // console.log( artistImageCover, artistName, twitter,  instagram)
    if(!artistImageCover || !artistName || !twitter || !instagram){
      // Alert msg
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "danger"
      })

      setInterval(() => {
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      }, 5000)
    } else {
      // console.log("something inside")
      setIsArtistUploading(true)
      const data = {
        name: artistName,
        imageUrl: artistImageCover,
        twitter: `www.twitter.com/${twitter}`,
        instagram: `www.instagram.com/${instagram}`,
      }

      saveNewArtist(data).then((res) => {
        getAllArtist().then((data) => {
          dispatch({ 
            type: actionType.SET_ALL_ARTIST, 
            allArtist: data.artist,
          });
        });
      });

      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "success"
      })

      setInterval(() => {
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      }, 5000)


      setIsArtistUploading(false);
      setArtistImageCover(null);
      setArtistName("")
      setTwitter("")
      setInstagram("")


    }
  }


  const saveAlbum = () => {
    if(!albumImageCover || !albumName ){
      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "danger"
      })

      setInterval(() => {
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      }, 5000)

    } else {
      setIsAlbumUploading(true);
      const data = {
        name: albumName ,
        imageUrl: albumImageCover,
      }

      saveNewAlbum(data).then((res) => {
        getAllAlbums().then((data) => {
          dispatch({ 
            type: actionType.SET_ALL_ALBUMS, 
            allAlbums: data.album,
          });
        });
      });

      dispatch({
        type : actionType.SET_ALERT_TYPE,
        alertType : "success"
      })

      setInterval(() => {
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : null
        })
      }, 5000)

      setIsAlbumUploading(false);
      setAlbumImageCover(null)
      setAlbumName("")
    }
  }



  return (
    <div className="flex  flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
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

      {/* Tool new here image upload to fir base */}
      {/* upload bar for images*/}
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
              <div className="realtive w-full h-full overflow-hidden rounded-md">
                <img
                  src={songImageCover}
                  className="w-full h-full object-cover"
                  alt="image"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease"
                  onClick={() => deleteFileObject(songImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* upload bar for images end */}

      {/* audio file uploading */}
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAudioLoading && <FileLoader progress={audioUploadingProgress} />}
        {!isAudioLoading && (
          <>
            {!audioUrl ? (
              <FileUploader
                updateState={setAudioUrl}
                setProgress={setAudioUploadingProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="realtive w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <audio src={audioUrl} controls></audio>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease"
                  onClick={() => deleteFileObject(audioUrl, false)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* audio file uploading  end */}

      <div className="flex item-center justify-center w-60 cursor-pointer p-4 ">
        {isImageloading || isAudioLoading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 w-full rounded-md text-white bg-red-600
            hover:shadow-lg"
            onClick={saveSong}
          >
            Save song
          </motion.button>
        )}
      </div>

      {/* image uploader for artist */}
      <p className="text-xl font-semibold text-headingColor">Artist Details</p>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isArtistUploading && <FileLoader progress={artistUploadingProgress} />}
        {!isArtistUploading && (
          <>
            {!artistImageCover ? (
              <FileUploader
                updateState={setArtistImageCover}
                setProgress={setArtistUploadingProgress}
                isLoading={setIsArtistUploading}
                isImage={true}
              />
            ) : (
              <div className="realtive w-full h-full overflow-hidden rounded-md">
                <img
                  src={artistImageCover}
                  className="w-full h-full object-cover"
                  alt="image"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease"
                  onClick={() => deleteFileObject(artistImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* artist name */}
      <input
        type="text"
        placeholder="Artist name..."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-30" //bg-transparent
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />

      {/* Twitter */}
      <div className="flex items-center rounded-md p-3 border border-gray-300 w-full">
        <p className="text-base font-semibold text-gray-400">www.twitter.com/</p>
        <input type="text" placeholder="your twitter id" className="w-full text-base font-semibold text-textColor outline-none bg-transparent" value={twitter} onChange={(e) => setTwitter(e.target.value)}/>
      </div>


      {/* instagram */}
       <div className="flex items-center rounded-md p-3 border border-gray-300 w-full">
        <p className="text-base font-semibold text-gray-400">www.instagram.com/</p>
        <input type="text" placeholder="your instagram id" className="w-full text-base font-semibold text-textColor outline-none bg-transparent" value={instagram} onChange={(e) => setInstagram(e.target.value)}/>
      </div>


      <div className="flex item-center justify-center w-60 cursor-pointer p-4 ">
        {isArtistUploading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 w-full rounded-md text-white bg-red-600
            hover:shadow-lg"
            onClick={saveArtist}
          >
            Save Artist
          </motion.button>
        )}
      </div>


      {/* album information */}
      <p className="text-xl font-semibold text-headingColor">Album Details</p>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAlbumUploading && <FileLoader progress={albumUploadingProgress} />}
        {!isAlbumUploading && (
          <>
            {!albumImageCover ? (
              <FileUploader
                updateState={setAlbumImageCover}
                setProgress={setAlbumUploadingProgress}
                isLoading={setIsAlbumUploading}
                isImage={true}
              />
            ) : (
              <div className="realtive w-full h-full overflow-hidden rounded-md">
                <img
                  src={albumImageCover}
                  className="w-full h-full object-cover"
                  alt="image"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease"
                  onClick={() => deleteFileObject(albumImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>



      {/* Album Name */}
      <input
        type="text"
        placeholder="Album name..."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-30" //bg-transparent
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />


       {/* save Album */}
      <div className="flex item-center justify-center w-60 cursor-pointer p-4 ">
        {isAlbumUploading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 w-full rounded-md text-white bg-red-600
            hover:shadow-lg"
            onClick={saveAlbum}
          >
            Save Album
          </motion.button>
        )}
      </div>


      


    </div>
  );
};

export const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
    >
      <svg
        role="status"
        className="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
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

  const [{alertType}, dispatch]: any = useStateValue();
  const uploadFile = (e: any) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    console.log(uploadFile);

    // fire base image location storage reference
    const storageRef = ref(
      storage,
      `${isImage ? "Images" : "Audio"}/ ${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : "danger"
        })

        setInterval(() => {
          dispatch({
            type : actionType.SET_ALERT_TYPE,
            alertType : null
          })
        }, 5000)
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
          // console.log('File available at', downloadURL);
        });

        dispatch({
          type : actionType.SET_ALERT_TYPE,
          alertType : "success"
        })

        setInterval(() => {
          dispatch({
            type : actionType.SET_ALERT_TYPE,
            alertType : null
          })
        }, 5000)
      }
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
            Click to upload {isImage ? "an image" : "an audio "}
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
