// AXIOS
import axios from "axios";

// cancel token
const CancelToken = axios.CancelToken;

// api url
import { apiUrl_forEmail } from "./constants";

// get admin users
export let cancelGetEmailsApi;
export async function getEmails(token, page) {
    // if ((token, page)) {
    if (token) {
        const users = await axios.get(apiUrl_forEmail + "list" + page, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetEmailsApi = c;
            }),
        });
        return users;
    } else {
        console.log("Please add required parameters");
    }
}