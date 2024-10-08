import React, { useEffect, useState } from 'react';
import styles from '../../styles';
import userPlaceholder from "../../assets/user-placeholder.png";
import { IoIosMore } from "react-icons/io";
import { BiMessageRounded } from "react-icons/bi";
import { RxLoop } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import moment from 'moment';
import axios from 'axios';
import { USERS_API } from '../../data';
import { valueConverter } from '../../utils/valuesConverter';

function Post({ tweet, users, setUsers }) {
    const [userLiked, setUserLiked] = useState(false);
    const [usersLikes, setUsersLikes] = useState([]);
    const [likes, setLikes] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${USERS_API}/${localStorage.getItem("userId")}`);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const liked = tweet.usersLikes.includes(localStorage.getItem("username"));
        setUserLiked(liked);
        setUsersLikes(tweet.usersLikes);
        setLikes(tweet.likeCount);
    }, [tweet]);

    const hitLike = async () => {
        const username = localStorage.getItem("username");

        if (userLiked) {
            setUsersLikes(prevUsersLikes => {
                const updatedLikes = prevUsersLikes.filter(user => user !== username);
                return updatedLikes;
            });
            setLikes(prevLikes => prevLikes - 1);
        } else {
            setUsersLikes(prevUsersLikes => {
                return [...prevUsersLikes, username];
            });
            setLikes(prevLikes => prevLikes + 1);
        }

        setUserLiked(!userLiked);

        const updatedLikeCount = userLiked ? likes - 1 : likes + 1;
        const updatedUsersLikes = userLiked ? usersLikes.filter(user => user !== username) : [...usersLikes, username];
        const updatedTweet = {
            ...tweet,
            likeCount: updatedLikeCount,
            usersLikes: updatedUsersLikes
        };

        if (!user || !user.tweets) {
            console.error("User data is not loaded yet.");
            return;
        }

        const userTweets = user.tweets.filter(t => t.tweetId !== updatedTweet.tweetId);
        const updatedTweets = [
            updatedTweet,
            ...userTweets
        ];

        try {
            await axios.put(`${USERS_API}/${localStorage.getItem("userId")}`, {
                tweets: updatedTweets
            });
        } catch (error) {
            console.error("Error updating like status:", error);
            setUsersLikes(tweet.usersLikes);
            setLikes(tweet.likeCount);
            setUserLiked(liked);
        }
    };

    return (
        <div className={`${styles.borderBottom} p-3 w-full flex gap-2`}>
            <div className='w-[36px] h-[36px] flex-none'>
                <img className='w-[36px] h-[36px] rounded-full' src={userPlaceholder} alt="User photo" />
            </div>
            <div className='w-full'>
                <div className='flex items-center justify-between gap-1'>
                    <div className='flex gap-2'>
                        <div className='flex gap-1'>
                            <p className='text-sm'>{tweet.name}</p>
                            <p className='text-sm text-light-gray'>{tweet.username}</p>
                            <p className='text-sm text-light-gray'>&bull;</p>
                            <p className='text-sm text-light-gray'>{moment(tweet.date).fromNow()}</p>
                        </div>
                    </div>
                    <div className='hover:bg-slate-900 hover:text-twitter-blue fill-current p-1 rounded-full cursor-pointer'>
                        <IoIosMore className='text-light-gray hover:text-twitter-blue' />
                    </div>
                </div>
                <div>
                    <p className='text-sm break-words'>{tweet.message}</p>
                </div>
                <div className='mt-3 flex items-center justify-between'>
                    <div className='flex items-center gap-1 text-light-gray fill-current cursor-pointer'>
                        <BiMessageRounded size={18} />
                        <p className='text-xs'>0</p>
                    </div>
                    <div className='flex items-center gap-1 text-light-gray fill-current cursor-pointer'>
                        <RxLoop size={18} />
                        <p className='text-xs'>0</p>
                    </div>
                    <div onClick={hitLike} className='flex items-center gap-1 fill-current cursor-pointer'>
                        <FaRegHeart size={18} className={`${userLiked ? "text-red-500" : "text-light-gray"} text-xs fill-current`} />
                        <p className={`text-xs text-light-gray`}>{valueConverter(likes)}</p>
                    </div>
                    <div className='flex items-center gap-1 text-light-gray fill-current cursor-pointer'>
                        <IoStatsChart size={18} />
                        <p className='text-xs'>0</p>
                    </div>
                    <div className='flex items-center gap-1 text-light-gray fill-current cursor-pointer'>
                        <IoBookmarkOutline size={18} />
                        <FiUpload size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;