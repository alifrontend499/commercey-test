// REDUX STORE
import appStore from 'redux/store/store'

// STORE ACTIONS
import { emptyAuth } from 'redux/actions/actionAuth'

// to limit the string
export const limitText = (txt, limit = false) => {
    if (txt) {
        if (limit) {
            return txt.substring(0, limit) + "..."
        } else {
            return txt
        }
    }
}

// html stripper
export const stripHTML = (txt) => {
    if (txt) {
        return txt.replace(/(<([^>]+)>)/ig, '')
    }
}

// save to local storage
export const saveToLocalStorage = (itemName, itemValue) => {
    if (typeof (Storage) !== "undefined") {
        if (itemName && itemValue) {
            window.localStorage.setItem(itemName, itemValue)
        }
    } else {
        console.log("sorry local storage is not supported by your browser")
    }
}

// get from local storage
export const getFromLocalStorage = (itemName) => {
    if (typeof (Storage) !== "undefined") {
        if (itemName) {
            return window.localStorage.getItem(itemName)
        }
    } else {
        console.log("sorry local storage is not supported by your browser")
    }
}

// get from local storage
export const getCurrentUserFromLocalStorage = () => {
    if (typeof (Storage) !== "undefined") {
        const currentUser = JSON.parse(getFromLocalStorage('__uu_dd'))
        if (currentUser) {
            return currentUser
        } else {
            return null
        }
    } else {
        console.log("sorry local storage is not supported by your browser")
    }
}

// user logout
// USER SIGN OUT REMOVING STATE AND OTHER USER RELATED DATA
export function globalLogout() {
    // clearing local storage
    if (typeof (Storage) !== "undefined") {
        localStorage.clear()
    }
    // reseting auth store
    appStore.dispatch(emptyAuth())

    // finally page reload
    window.location.reload()
}