import React, { useEffect } from 'react'
import { getAllArtist } from '../api';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import SongCard from './SongCard';


const DashboardArtists = () => {
  const [{ allArtist }, dispatch]: any = useStateValue();
  useEffect(() => {
    if (!allArtist) {
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTIST,
          allArtist: data.artist,
        });
      });
    }
  }, [allArtist]);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
       <div className="relative w-full my-8 p-4 py-16 border border-gray-600 rounded-md">
        <ArtistContainer data={allArtist} />
      </div>
    </div>
  )
}

export const ArtistContainer = ({ data }: any) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {
        data && (
          data?.map((song: any, index: any) => (
            <SongCard key={song._id} data={song} index={index} /> 
          ))
        )
      }
    </div>
  );
};


export default DashboardArtists