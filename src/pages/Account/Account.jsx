import userPlaceholder from "../../assets/user-placeholder.png";
import styles from "../../styles";
import { LuCalendarDays } from "react-icons/lu";
import { GoArrowLeft } from "react-icons/go";
import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { USERS_API } from "../../data";
import { Link } from "react-router-dom";
import moment from "moment";

function Account() {
    const selectedSectionStyles = `relative after:absolute after:-translate-x-1/2 after:-translate-y-1/2 after:left-[20px] after:-bottom-3 after:content-[""] after:h-1 after:w-full after:bg-twitter-blue after:rounded-full`
    const [section, setSection] = useState("posts")
    const [onDelete, useOnDelete] = useState("")
    const [user, setUser] = useState({
        name: '',
        tweets: [],
        username: '',
        joined: "",
        favoriteTweets: []
    });

    async function getUser() {
        try {
            const res = await axios.get(`${USERS_API}/${localStorage.getItem("userId")}`);
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, [onDelete]);

    return (
        <main className='sm:max-w-[598px] w-full border-x-[.1px] border-solid border-dark-gray'>
            <div className="flex items-center gap-7 p-3">
                <Link to={"/home"}>
                    <GoArrowLeft size={20} className="cursor-pointer" title="Back" />
                </Link>
                <div className=''>
                    <p className='font-bold text-xl'>{user.name}</p>
                    <p className='text-xs text-light-gray'>{user.tweets.length} Posts</p>
                </div>
            </div>

            <div className={`${styles.borderBottom}`}>
                <div className='bg-slate-800 w-full h-[150px] sm:h-[200px]'></div>
                <div className="p-3">
                    <div className="relative mb-8 flex justify-end">
                        <div className='absolute left-0 w-[100px] h-[100px] -translate-y-[60px]'>
                            <img className='rounded-full' src={userPlaceholder} alt="User photo" />
                        </div>
                        <button className={`${styles.ghostButton} h-fit`}>Edit profile</button>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{user.name}</p>
                        <p className="text-light-gray">@{user.username}</p>
                        <div className="mt-4 text-light-gray flex items-center gap-1">
                            <LuCalendarDays />
                            <p>Joined {moment(user.joined).fromNow()}</p>
                        </div>
                        <div className="mt-2 mb-6 flex gap-4 items-center">
                            <div className="flex gap-2">
                                <p>0</p>
                                <p className="text-light-gray">Following</p>
                            </div>
                            <div className="flex gap-2">
                                <p>0</p>
                                <p className="text-light-gray">Followers</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <span onClick={() => setSection("posts")} className={`${section === "posts" ? selectedSectionStyles : ""} font-medium cursor-pointer`}>Posts</span>
                        <p className="font-medium text-light-gray cursor-pointer">Replies</p>
                        <p className="font-medium text-light-gray cursor-pointer">Highlights</p>
                        <p className="font-medium text-light-gray cursor-pointer">Articles</p>
                        <span onClick={() => setSection("likes")} className={`${section === "likes" ? selectedSectionStyles : ""} font-medium cursor-pointer`}>Likes</span>
                    </div>
                </div>
            </div>

            {section === "posts" && user.tweets.length > 0 ? (
                user.tweets.map(tweet => <Post key={tweet.tweetId} tweet={tweet} user={user} setUser={setUser} useOnDelete={useOnDelete} />)
            ) : (
                null
            )}

            {section === "likes" && user.favoriteTweets.length > 0 ? (
                user.favoriteTweets.map(tweet => <Post key={tweet.tweetId} tweet={tweet} user={user} setUser={setUser} useOnDelete={useOnDelete} />)
            ) : (
                null
            )}
        </main>
    );
}

export default Account;