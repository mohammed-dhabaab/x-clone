import React, { useEffect, useState } from 'react';
import styles from '../../styles';

import Tweet from './Tweet';
import Post from './Post';
import axios from 'axios';
import { USERS_API } from '../../data';
import { getUsers } from '../../utils/getUsers';

function Home() {
    const [tweets, setTweets] = useState([]);
    const [postTweet, setPostTweet] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getUsers();
            setUsers(usersData)
            if (usersData && usersData.length > 0) {
                const userTweets = usersData.flatMap(user =>
                    user.tweets ? user.tweets.map(tweet => ({
                        ...tweet,
                        // username: user.username,
                        // id: user.id,
                        // name: user.name,
                        // likeCount: 0,
                        // usersLikes: []
                    })) : []
                );


                const sortedTweets = userTweets.filter(tweet => tweet.date).sort((a, b) => new Date(a.date) - new Date(b.date));

                setTweets(sortedTweets);
                console.log(sortedTweets)
            }
        };

        fetchUsers();
    }, [postTweet]);

    return (
        <main className='w-full max-w-[598px] border-x-[.1px] border-solid border-dark-gray'>
            <h1 className='p-3 sm:hidden text-lg font-bold'>Home</h1>
            <div className={`${styles.borderBottom} py-2 flex justify-between`}>
                <button className='w-1/2 pb-[14px] font-bold'>
                    <span className='relative after:absolute after:-translate-x-1/2 after:-translate-y-1/2 after:left-[27px] after:-bottom-6 after:content-[""] after:h-1 after:w-full after:bg-twitter-blue after:rounded-full'>For You</span>
                </button>
                <button className='w-1/2 pb-[14px] font-bold'>Following</button>
            </div>

            <Tweet tweets={tweets} setTweets={setTweets} postTweet={postTweet} setPostTweet={setPostTweet} users={users} setUsers={setUsers} />

            {/* {users.map((user, index) => {
                return (
                    <Post key={index} user={user} tweetsIndex={index} />
                );
            })} */}

            {tweets.length > 0 ? (
                tweets.map((tweet, index) => (
                    <Post key={index} tweet={tweet} users={users} setUsers={setUsers} />
                ))
            ) : (
                null
            )}
        </main>
    );
}

export default Home;