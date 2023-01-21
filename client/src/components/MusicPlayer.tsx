// import { motion } from 'framer-motion';
// import React from 'react'
// import { RiPlayListFill } from 'react-icons/ri';
// import AudioPlayer from 'react-h5-audio-player';
// import { useStateValue } from '../context/StateProvider';



// const MusicPlayer = () => {
//   const [{  allSongs, songIndex, isSongPlaying  }, dispatch]: any = useStateValue();


//   return (
//     <div className='w-full flex item-center gap-3 overflow-hidden'>
//       <div className={`w-full items-center gap-3 p-4 flex relative`}>
//         <img src={allSongs[songIndex]?.imageUrl} alt="" 
        
//          className='w-40 h-20 object-cover rounded-md'/>

//          <div className='flex items-start flex-col'>
//           <p className='text-xl text-headingColor font-semibold'>
//             {`$ {
//               allSongs[songIndex]?.name.length > 20
//                   ? allSongs[songIndex]?.name.slice(0, 20)
//                   : allSongs[songIndex]?.name
//                }`}{" "}
//                <span className='text-base'>({allSongs[songIndex]?.album})</span>
//           </p>
//           <p className='text-textColor'>
//             {allSongs[songIndex]?.artist}{" "}
//             <span className='text-sm text-textColor font-semibold'>
//               ({allSongs[songIndex]?.category})
//             </span>
//           </p>

//           <motion.i
//             whileTap={{ scale: 0.8 }}
//             // onClick={() => setIsPlayList(!isPlayList)}
//           >
//             <RiPlayListFill className="text-textColor hove:text-headingColor"/>
//           </motion.i>

//          </div>

//          <div className='flex-1'>
//             <AudioPlayer
//               src={allSongs[songIndex]?.songURL}
//               onPlay={() => console.log("is playing")}
//               autoPlay={true}
//               showSkipControls={true}
//           //     onClickNext={nextTrack}
//           //     onClickPrevious={previousTrack}
//           />
//          </div>
//       </div> 
//     </div>
//   )
// }

// export default MusicPlayer




import React from 'react'

const MusicPlayer = () => {
  return (
    <div>MusicPlayer</div>
  )
}

export default MusicPlayer












