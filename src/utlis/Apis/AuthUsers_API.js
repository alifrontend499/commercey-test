// AXIOS
import axios from "axios";

import { apiUrl } from "./constants";

// get admin users
export async function userLogin(email, password) {
    if (email, password) {
        const users = await axios.post(
            apiUrl + "login",
            {
                email,
                password
            }
        );
        return users;
    } else {
        console.log("Please add required parameters");
    }
}