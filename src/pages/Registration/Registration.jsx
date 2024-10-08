import { BsTwitterX } from "react-icons/bs";
import styles from "../../styles";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { USERS_API } from "../../data";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Registration() {
    // localStorage.removeItem("userId")
    // localStorage.removeItem("username")
    // localStorage.removeItem("allowance")

    const navigate = useNavigate();
    const [createAccountActive, setCreateAccountActive] = useState(false)
    const [sigInActive, setSigInActive] = useState(false)
    const [users, setUsers] = useState([])
    const [userExits, setUserExits] = useState(false)

    const [name, setName] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (sigInActive) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [sigInActive]);

    async function createAccount() {
        if (!validation()) {
            return;
        }

        try {
            setUsers(await getUsers());
            if (!isUserExits()) {
                const res = await axios.post(USERS_API, {
                    name,
                    username,
                    password,
                    joined: moment().format('YYYY-MM-DD HH:mm:ss'),
                    tweets: [],
                    favoriteTweets: []
                });
                localStorage.setItem("userId", res.data.id)
                localStorage.setItem("username", username)
                localStorage.setItem("allowance", "true")
                navigate("/home")
                setCreateAccountActive(false)

            } else {
                setUserExits(true)
                setTimeout(() => {
                    setUserExits(false);
                }, 4000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getUsers() {
        try {
            const res = await axios.get(USERS_API)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    function validation() {
        if ((name.length < 3 || name.length > 10) ||
            (username.length < 3 || username.length > 10) ||
            (password.length < 8)) {
            return false; // validation failed  
        }
        return true; // validation passed  
    }


    function isUserExits() {
        return users.some(user => user.username === username);
    }

    async function signIn() {
        if ((username.length < 3 || username.length > 10) ||
            (password.length < 8)) {
            return;
        }
        try {
            setUsers(await getUsers());
            if (isUserExits()) {
                localStorage.setItem("userId", users.find(user => user.username === username).id)
                localStorage.setItem("username", username)
                localStorage.setItem("allowance", "true")
                navigate("/home")
                setSigInActive(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main className={`${createAccountActive || sigInActive ? "" : ""} relative h-full sm:h-screen w-screen flex flex-col overflow-x-hidden`}>
            <div className="flex-grow flex flex-col justify-center items-center gap-10 sm:flex-row w-full">
                <div className="flex justify-center items-center sm:w-1/2">
                    <BsTwitterX className="text-white fill-current w-[100px] h-[100px] sm:w-[400px] sm:h-[400px]" />
                </div>

                <div className="flex flex-col gap-8 sm:w-1/2">
                    <h1 className={`${styles.heading2}`}>Happening now</h1>
                    <div className="flex flex-col gap-5 max-w-[300px]">
                        <p className="">Join today.</p>
                        <button onClick={() => setCreateAccountActive(!createAccountActive)} className={`${styles.primaryButton}`}>Create account</button>
                        <div className="bg-light-gray h-[0.1px] w-full rounded-full relative after:content-['or'] after:absolute after:-translate-x-1/2 after:-translate-y-1/2 after:left-1/2 after:bg-black after:rounded-full after:p-1 after:w-fit after:h-fit "></div>
                        <button onClick={() => setSigInActive(!sigInActive)} className={`${styles.ghostButton} text-twitter-blue`}>Sign in</button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1 mt-10">
                <div className="flex flex-wrap justify-center gap-x-2">
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>About</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Download the X app</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Help Center</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Terms of Service</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Privacy Policy</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Cookie Policy</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Accessibility</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Ads info</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Blog</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Careers</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Brand Resources</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Advertising</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Marketing</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>X for Business</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Developers</p>
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Directory</p>
                </div>
                <div className="flex flex-wrap justify-center gap-x-2">
                    <p className='text-sm text-light-gray cursor-pointer hover:underline'>Settings</p>
                    <p className='text-sm text-light-gray cursor-pointer'>© 2024 X Corp.</p>
                </div>

            </div>


            <div className={`${createAccountActive ? "" : "hidden"} absolute bg-slate-900 h-full rounded-md w-full flex flex-col gap-6 justify-center items-center`}>
                <div onClick={() => setCreateAccountActive(!createAccountActive)} className="absolute top-5 right-5 cursor-pointer">
                    <IoClose size={30} />
                </div>
                <h2 className={`${styles.heading3}`}>Create an Account</h2>
                <div className="flex flex-col gap-1">
                    <input onChange={(e) => setName(e.target.value)} className={`${styles.borderFull} px-2 py-1 rounded-md`} type="text" placeholder="Name" />
                    <span className="text-xs text-light-gray mb-2 pl-2">Should be 3-10 letters</span>
                    <input onChange={(e) => setUserName(e.target.value.toLocaleLowerCase())} className={`${styles.borderFull} px-2 py-1 rounded-md`} type="text" placeholder="Username" />
                    <span className="text-xs text-light-gray mb-2 pl-2">Should be more than 3-10 letters</span>
                    <input onChange={(e) => setPassword(e.target.value)} className={`${styles.borderFull} px-2 py-1 rounded-md`} type="password" placeholder="Password" />
                    <span className="text-xs text-light-gray mb-2 pl-2">Should be more than 8-10 letters</span>
                    <button onClick={createAccount} className={`${styles.primaryButton}`}>Create</button>
                    <span className={`${userExits ? "inline-block" : "hidden"} text-xs text-red-500 mb-2 pl-2`}>User exits</span>
                </div>
            </div>

            <div className={`${sigInActive ? "" : "hidden"} absolute bg-slate-900 h-full rounded-md w-full flex flex-col gap-6 justify-center items-center text-center`}>
                <div onClick={() => setSigInActive(!sigInActive)} className="absolute top-5 right-5 cursor-pointer">
                    <IoClose size={30} />
                </div>
                <h2 className={`${styles.heading3}`}>Sign In</h2>
                <div className="flex flex-col gap-4">
                    <input onChange={(e) => setUserName(e.target.value)} className={`${styles.borderFull} px-2 py-1 rounded-md`} type="text" placeholder="Username" />
                    <input onChange={(e) => setPassword(e.target.value)} className={`${styles.borderFull} px-2 py-1 rounded-md`} type="password" placeholder="Password" />
                    <button onClick={signIn} className={`${styles.primaryButton}`}>Sign In</button>
                </div>
            </div>
            {/* <div className="absolute z-10 bg-slate-500 opacity-30 w-screen h-screen flex justify-center items-center gap-6"></div> */}
        </main>
    )
}

export default Registration