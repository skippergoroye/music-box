import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoChevronDown } from 'react-icons/io5'




const FilterButtons = ({ filterData, flag}: any) => {
  const [filterName, setFilterName] = useState(null)
  const [filterMenu, setFilterMenu] = useState(false)
  



  return (
    <div className='border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400 '>
      <p className='text-base tracking-wid text-textColor flex items-center gap-2' onClick={() => setFilterMenu(!filterMenu)}>
        {!filterName && flag}

        <IoChevronDown className={`text-base text-textColor duration-150 transition-all ease-in-out ${filterMenu ? "rotate-180" : "rotate-0"}`} />
      </p>

      {filterData && filterMenu && (
        <motion.div className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0">
           {filterData?.map((data: any, index: any)=> (
             <div
              key={data.name}
              className='flex items-center gap-2 px-4 py-1 hover:bg-gray-200' >

                {/* <img src={data.imageURL} referrerPolicy="no-referrer" /> */}

                 {(flag === "Artist" || flag === "Album") && (
                  
                  <img src={data.imageUrl} referrerPolicy="no-referrer" className='w-8 min-w-[32px] h-8 rounded-full object-cover'/>
                 )}
                 {/* <p className="w-full">
                {data.name.length > 15
                  ? `${data.name.slice(0, 14)}...`
                  : data.name}
                 </p> */}
             </div>
           ))}
        </motion.div>
      )}
      
    </div>
  )
}

export default FilterButtons
