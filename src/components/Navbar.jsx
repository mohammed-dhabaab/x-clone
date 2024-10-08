import React, { useEffect, useState } from 'react'
import { BsTwitterX } from "react-icons/bs";
import { MdDelete, MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { BsLightningFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { FaFeatherAlt } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

import userPlaceholder from "../assets/user-placeholder.png"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { USERS_API } from '../data';
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const [logout, setLogout] = useState(false);

    const [user, setUser] = useState({
        name: '',
        tweets: [],
        username: '',
        joined: ""
    });
    async function getUser() {
        try {
            const res = await axios.get(`${USERS_API}/${localStorage.getItem("userId")}`);
            console.log(res.data)
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);


    function logoutUser() {
        localStorage.removeItem("userId")
        localStorage.removeItem("username")
        localStorage.removeItem("allowance")
        navigate("/")
    }
    return (
        <div className='flex flex-col gap-6 p-3'>
            <Link to={"/home"} className=''>
                <BsTwitterX size={30} className='text-white bg-dark-black fill-current ' />
            </Link>

            <nav className='flex flex-col gap-6'>

                <Link to={"/home"} className='flex items-center gap-3' >
                    <div><MdHomeFilled size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>Home</p>
                </Link>


                <Link className='flex items-center gap-3' to={"#"}>
                    <div><IoSearch size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>Explore</p>
                </Link>


                <Link className='flex items-center gap-3' to={"#"}>
                    <div><IoNotificationsOutline size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>Notifications</p>
                </Link>


                <Link className='flex items-center gap-3' to={"#"}>
                    <div><MdOutlineEmail size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>Messages</p>
                </Link>


                <Link className='flex items-center gap-3' to={"#"}>
                    <div><CgCommunity size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>Grok</p>
                </Link>


                <Link className='flex items-center gap-3' to={"#"}>
                    <div><PiBookmarkSimpleLight size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>Bookmarks</p>
                </Link>


                <Link className='flex items-center gap-3' to={"#"}>
                    <div><BsPeopleFill size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>Communities</p>
                </Link>


                <Link className='flex items-center gap-3' to={"#"}>
                    <div><BsTwitterX size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>Premium</p>
                </Link>


                <Link className='flex items-center gap-3' to={"#"}>
                    <div><BsLightningFill size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>Business</p>
                </Link>


                <Link className='flex items-center gap-3' to={"/account"}>
                    <div><FaUser size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>Profile</p>
                </Link>


                <Link className='flex items-center gap-3' to={"#"}>
                    <div><CgMoreO size={30} /></div>
                    <p className='hidden sm:inline-block text-[18px] font-bold'>More</p>
                </Link>
            </nav>

            <div className=' w-fit sm:w-full bg-twitter-blue text-center p-2 rounded-full cursor-pointer'>
                <div className='sm:hidden'>
                    <FaFeatherAlt size={20} />
                </div>
                <p className='hidden sm:inline-block'>Post</p>
            </div>


            <div className='flex gap-4 items-center'>
                <Link to={"/account"} className='w-[36px] h-[36px]'>
                    <img className='rounded-full' src={userPlaceholder} alt="User photo" />
                </Link>
                <Link to={"/account"} className='hidden sm:flex flex-grow flex-col'>
                    <p>{user.name}</p>
                    <p className='text-light-gray text-[14px]'>@{user.username}</p>
                </Link>

                <div onClick={() => setLogout(!logout)} className='hidden sm:inline-block relative cursor-pointer'>
                    <IoIosMore size={16} />
                    <div onClick={logoutUser} className={`${logout ? "inline-block" : "hidden"} absolute hover:text-red-500 top-0 left-7 bg-dark- cursor-pointer`}>
                        <LuLogOut />
                    </div>
                </div>
            </div>

            <div onClick={logoutUser} className={`sm:hidden flex justify-center items-center hover:text-red-500 top-0 left-7 cursor-pointer`}>
                <LuLogOut />
            </div>


        </div >
    )
}

export default Navbar