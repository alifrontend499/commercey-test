import React, { useState, useEffect } from 'react'

// routes
import AllRoutes from 'routes/AllRoutes'

// scroll to top
import ScrollToTop from './ScrollToTop';

// redux
import { connect } from 'react-redux'

// components
import AppLeftMenu from 'components/CommonComponents/AppLeftMenu/AppLeftMenu'

// header & footer
import Header from 'components/CommonComponents/Header'
// import Footer from 'components/CommonComponents/Footer/Footer'

// react toastify
import { ToastContainer } from 'react-toastify';

// helpers functions
import { getCurrentUserFromLocalStorage } from 'utlis/helpers/Common/CommonHelperFunctions'

// actions
import { saveCommonTokenToStore, saveCurrentUserToStore, authenticateUser } from 'redux/actions/actionAuth'

function AppRoot(props) {
    const [authLoading, setAuthLoading] = useState(true)

    // USE EFFECT: USER CHECK
    useEffect(() => {
        // CHECKING IF THE USER IS ALREADY LOGGED IN
        const currentUser = getCurrentUserFromLocalStorage()
        // if user exists
        if (currentUser) {
            // saving user details to the global store
            props.saveCommonTokenToStore(currentUser.userToken)
            props.saveCurrentUserToStore(currentUser)
            props.authenticateUser(true)

            // stop loading
            setTimeout(() => {
                setAuthLoading(false)
            }, 500);
        } else {
            // updating user details to the global store
            props.saveCommonTokenToStore("")
            props.saveCurrentUserToStore(null)
            props.authenticateUser(false)

            // stop loading
            setTimeout(() => {
                setAuthLoading(false)
            }, 500);
        }
    }, [props])

    return (
        <div className="app-root">

            {
                // IF USER IS AUTHENTICATED
                props.isUserAuthenticated ? (
                    <div className="app-main-wrapper">
                        <div className="amw_inner">
                            {/* left-bar */}
                            <AppLeftMenu />

                            <div className="app-main-content d-flex flex-column">
                                {/* HEADER */}
                                <Header />

                                {/* SCROLL TO TOP WHEN ROUTE CHANGES */}
                                <ScrollToTop />

                                {/* ALL ROUTES */}
                                <AllRoutes authLoading={authLoading} />

                                {/* FOOTER */}
                                {/* <Footer /> */}

                            </div>
                        </div>
                    </div>
                ) : (
                    // IF USER IS NOT AUTHENTICATED
                    <React.Fragment>
                        {/* SCROLL TO TOP WHEN ROUTE CHANGES */}
                        <ScrollToTop />

                        {/* ALL ROUTES */}
                        <AllRoutes authLoading={authLoading} />
                    </React.Fragment>
                )
            }


            {/* toast:- for onscreen notificatoins */}
            <ToastContainer />
        </div>
    )
}

const getDataFromStore = state => {
    return {
        isUserAuthenticated: state.auth.isUserAuthenticated
    };
}

const dispatchActionsToProps = dispatch => {
    return {
        saveCommonTokenToStore: comonToken => dispatch(saveCommonTokenToStore(comonToken)),
        saveCurrentUserToStore: currentUser => dispatch(saveCurrentUserToStore(currentUser)),
        authenticateUser: bool => dispatch(authenticateUser(bool)),
    }
}

export default connect(getDataFromStore, dispatchActionsToProps)(AppRoot)