import React from 'react'
import  { useStateValue } from '../context/StateProvider';
import { motion } from "framer-motion"

const DashboardUsers = () => {
    const [{ allUsers }, dispatch] = useStateValue

  return (
    <!-- <div className='w-full p-4 items-center justify-center flex-col'> -->
        {/* filter */}


        {/* tabular data from */}
        <div className='relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border b-g-300 rounded-md gap-3'>
            total count of the user
            <div className='absolute top-4 left-4'>
                <p className='absolute top-4 left-4'>
                    Count : <span className='text-xl font-bold text-textColor'>{allUsers?.length}</span>
                </p>
            </div>

            {/* table heading */}
            <div className='w-full min-w[750px] flex items-center justify-between'>
                <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Image</p>

                <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Name</p>

                <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Email</p>

                <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Verified</p>

                <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Created</p>

                <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Role</p>
            </div>

            {/* table body content */}


        </div>

    </div>
  )
}

export default DashboardUsers

<motion.div className='absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md'>
                    <p className='text-textColor text-sm font-semibold'>Are you sure, do want to mark the user as <span>{ data.role === "admin" ? "Member" : "Admin"}</span> ? </p>

                </motion.div>


