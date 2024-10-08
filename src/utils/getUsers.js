import axios from "axios"
import { USERS_API } from "../data"

export async function getUsers() {
    try {
        const res = await axios.get(USERS_API)
        return res.data
    } catch (error) {
        console.log(error)
    }
}