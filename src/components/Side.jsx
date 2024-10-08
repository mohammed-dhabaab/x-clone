import React from 'react'
import { IoSearch } from "react-icons/io5";
import styles from '../styles';
import { IoIosMore } from "react-icons/io";

import userPlaceholder from "../assets/user-placeholder.png"

function Side() {
    return (
        <section className='hidden sm:flex flex-col gap-4 ml-10 max-w-[350px]'>
            <div className='mt-1 w-full flex items-center gap-4 bg-dark-black px-4 py-2 rounded-full'>
                <IoSearch size={26} className='text-light-gray' />
                <input className='focus:outline-none w-full' type="search" placeholder='Search' />
            </div>

            <div className={`${styles.borderFull} p-3 rounded-xl flex flex-col gap-3`}>
                <p className='text-lg font-bold'>Subscribe to Premium</p>
                <p className='text-slate-200'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
                <button className={`${styles.primaryButton} w-fit`}>Subscribe</button>
            </div>

            <div className={`${styles.borderFull} p-3 rounded-xl flex flex-col gap-3`}>
                <p className='text-lg font-bold'>What’s happening</p>

                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <p className='text-xs text-light-gray'>Trending in United States</p>
                        <p>tommie</p>
                        <p className='text-xs text-light-gray'>109K posts</p>
                    </div>
                    <IoIosMore className='cursor-pointer' />

                </div>
            </div>



            <div className={`${styles.borderFull} p-3 rounded-xl flex flex-col gap-3`}>
                <p className='text-lg font-bold'>
                    Who to follow</p>
                <div>
                    <div className='flex gap-4 items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <div className='w-[36px] h-[36px]'>
                                <img className='rounded-full' src={userPlaceholder} alt="User photo" />
                            </div>
                            <div className='hidden sm:flex flex-col'>
                                <p>Name</p>
                                <p className='text-light-gray text-[14px]'>Username</p>
                            </div>
                        </div>
                        <button className={`${styles.secondaryButton}`}>Follow</button>
                    </div>
                </div>
            </div>



            <div className='flex flex-wrap gap-x-2'>
                <p className='text-sm text-light-gray cursor-pointer'>Terms of Service</p>
                <p className='text-sm text-light-gray cursor-pointer'>
                    Privacy Policy</p>
                <p className='text-sm text-light-gray cursor-pointer'>
                    Cookie Policy</p>
                <p className='text-sm text-light-gray cursor-pointer'>Accessibility</p>
                <p className='text-sm text-light-gray cursor-pointer'>
                    Ads info</p>
                <p className='text-sm text-light-gray cursor-pointer'>More...</p>
                <p className='text-sm text-light-gray'>
                    © 2024 X Corp.</p>
            </div>
        </section>
    )
}

export default Side