import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { RiPlayListFill } from 'react-icons/ri';
import AudioPlayer from 'react-h5-audio-player';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { getAllSongs } from '../api';
import { IoMusicalNote } from 'react-icons/io5';



const MusicPlayer = () => {
  const [{  allSongs, songIndex, isSongPlaying }, dispatch]: any = useStateValue();
  const [isPlayList, setIsPlayList] = useState(true);

  console.log(allSongs)
  console.log(songIndex)

  

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs,
        });
      });
    }
  }, []);


  return (
    <div className='w-full flex item-center gap-3'>
      <div className="w-full items-center gap-3 p-4 flex relative">
         <img src={allSongs[songIndex]?.imageUrl} alt="" className='w-40 h-20 object-cover rounded-md'/>

         <div className='flex items-start flex-col'>
          <p className='text-xl text-headingColor font-semibold'>

          {`${
            allSongs[songIndex]?.name.length > 20
            ? allSongs[songIndex]?.name.slice(0, 20)
            : allSongs[songIndex]?.name
          }`}{" "}
            <span className='text-base'>({allSongs[songIndex]?.album})</span>
          </p>
           <p className='text-textColor'>
            {allSongs[songIndex]?.artist}{" "}
            <span className='text-sm text-textColor font-semibold'>
              ({allSongs[songIndex]?.category})
            </span>
          </p>

          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className="text-textColor hove:text-headingColor" />
          </motion.i>
         </div>

         <div className='flex-1'>
            <AudioPlayer
              src={allSongs[songIndex]?.songURL}
              onPlay={() => console.log("is playing")}
              autoPlay={false}
              showSkipControls={true}
              // onClickNext={nextTrack}
              // onClickPrevious={previousTrack}
          />
         </div> 

         {/* {
             isPlayList && (
              <PlayListCard />
             )
         }  */}
      </div> 
    </div>
  )
}


// export const PlayListCard = () => {
//   const [{  allSongs, songIndex, isSongPlaying }, dispatch]: any = useStateValue();

//   useEffect(() => {
//     if (!allSongs) {
//       getAllSongs().then((data) => {
//         dispatch({
//           type: actionType.SET_ALL_SONGS,
//           allSongs: data.songs,
//         });
//       });
//     }
//   }, []);

//   const setCurrentPlaySong = (si: any) => {
//     if (!isSongPlaying) {
//       dispatch({
//         type: actionType.SET_ISSONG_PLAYING,
//         isSongPlaying: true,
//       });
//     }
//     if (songIndex !== si) {
//       dispatch({
//         type: actionType.SET_SONG_INDEX,
//         songIndex: si,
//       });
//     }
//   };




//   return (
//     <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
//       {
//         allSongs.length > 0 ? (
//           allSongs.map((music: any, index: any) => (
//             <motion.div
//             initial={{ opacity: 0, translateX: -50 }}
//             animate={{ opacity: 1, translateX: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
//             onClick={() => setCurrentPlaySong(index)}
//             key={index}
//             >
//               <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />


//             <div className="flex items-start flex-col">
//               <p className="text-lg text-headingColor font-semibold">
//                 {`${
//                   music?.name.length > 20
//                     ? music?.name.slice(0, 20)
//                     : music?.name
//                 }`}{" "}
//                 <span className="text-base">({music?.album})</span>
//               </p>
//               <p className="text-textColor">
//                 {music?.artist}{" "}
//                 <span className="text-sm text-textColor font-semibold">
//                   ({music?.category})
//                 </span>
//               </p>
//             </div>

//             </motion.div>
//           ))
//         ): <></>}
//       {/* Playlistcard */}
//     </div>

//   )

// }

export default MusicPlayer



































