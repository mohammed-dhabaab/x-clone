import React, { useState } from 'react';
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
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { USERS_API } from '../../data';

function Post({ user, setUser, tweet }) {
    const [deleteButton, setDeleteButton] = useState(false);

    const deleteTweet = async () => {
        try {
            const targetedTweetId = tweet.tweetId;
            const updatedTweets = user.tweets.filter(t => t.tweetId !== targetedTweetId);

            const updatedUser = { ...user, tweets: updatedTweets };
            const res = await axios.put(`${USERS_API}/${user.id}`, updatedUser);

            setUser(res.data);

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={`${styles.borderBottom} p-3 flex gap-2`}>
            <div className='w-[36px] h-[36px] flex-none'>
                <img className='w-[36px] h-[36px] rounded-full' src={userPlaceholder} alt="User photo" />
            </div>

            <div className='w-full'>
                <div className='flex items-center justify-between gap-1'>
                    <div className='flex gap-2'>
                        <div className='flex gap-1'>
                            <p className='text-sm'>{user.name}</p>
                            <p className='text-sm text-light-gray'>@{user.username}</p>
                            <p className='text-sm text-light-gray'>&bull;</p>
                            <p className='text-sm text-light-gray'>{moment(tweet.date).fromNow()}</p>
                        </div>
                    </div>
                    <div onClick={() => setDeleteButton(!deleteButton)} className='relative hover:bg-slate-900 fill-current p-1 rounded-full cursor-pointer'>
                        <IoIosMore className='text-light-gray hover:text-twitter-blue' />
                        <div onClick={deleteTweet} className={`${deleteButton ? "inline-block" : "hidden"} absolute hover:text-red-500 top-7 bg-dark-black`}>
                            <MdDelete />
                        </div>
                    </div>
                </div>

                <div>
                    <p className='text-sm break-words'>{tweet.message}</p>
                </div>

                <div className='mt-3 flex items-center justify-between'>
                    <div className='flex items-center gap-1 text-light-gray fill-current'>
                        <BiMessageRounded size={18} />
                        <p className='text-xs'>0</p>
                    </div>

                    <div className='flex items-center gap-1 text-light-gray fill-current'>
                        <RxLoop size={18} />
                        <p className='text-xs'>0</p>
                    </div>

                    <div className='flex items-center gap-1 text-light-gray fill-current'>
                        <FaRegHeart size={18} />
                        <p className='text-xs'>{tweet.likeCount}</p>
                    </div>

                    <div className='flex items-center gap-1 text-light-gray fill-current'>
                        <IoStatsChart size={18} />
                        <p className='text-xs'>0</p>
                    </div>

                    <div className='flex items-center gap-1 text-light-gray fill-current'>
                        <IoBookmarkOutline size={18} />
                        <FiUpload size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;