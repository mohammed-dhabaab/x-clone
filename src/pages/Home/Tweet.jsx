import { RiImage2Line } from "react-icons/ri";
import { MdOutlineGifBox } from "react-icons/md";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import userPlaceholder from "../../assets/user-placeholder.png";
import styles from '../../styles';
import axios from "axios";
import { USERS_API } from "../../data";
import moment from "moment";
import { useState } from "react";

function Tweet({ postTweet, setPostTweet, users, setUsers }) {
    const [message, setMessage] = useState("");
    async function post() {
        if (!message) {
            return
        }
        try {
            console.log(postTweet);


            const userId = localStorage.getItem("userId");


            if (!userId) {
                throw new Error('User ID not found in local storage.');
            }


            const userResponse = await axios.get(`${USERS_API}/${userId}`);
            const existingTweets = userResponse.data.tweets || [];


            const newTweet = {
                tweetId: existingTweets.length + 1,
                message,
                name: users.find(user => user.username === localStorage.getItem("username")).name,
                id: localStorage.getItem("userId"),
                username: localStorage.getItem("username"),
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                likeCount: 0,
                usersLikes: []
            };

            const updatedTweets = [...existingTweets, newTweet];

            const res = await axios.put(`${USERS_API}/${userId}`, {
                tweets: updatedTweets
            });

            setPostTweet(newTweet)
            setMessage("");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`${styles.borderBottom} p-3 flex gap-2 w-full`}>
            <div className='w-[36px] h-[36px]'>
                <img className='rounded-full' src={userPlaceholder} alt="User photo" />
            </div>
            <div className='w-full'>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${styles.borderBottom} w-full pb-4 resize-none placeholder:text-dark-gray focus:outline-none`}
                    placeholder='What is happening?!'
                />
                <div className='flex justify-between'>
                    <div className='flex items-center gap-3'>
                        <RiImage2Line size={20} className='text-twitter-blue cursor-pointer fill-current' />
                        <MdOutlineGifBox size={20} className='text-twitter-blue cursor-pointer fill-current' />
                        <FaRegFaceSmileBeam size={20} className='text-twitter-blue cursor-pointer fill-current' />
                        <GrLocation size={20} className='text-twitter-blue cursor-pointer opacity-50 fill-current' />
                    </div>
                    <button onClick={post} className={`${styles.primaryButton}`}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default Tweet;