import React, { useState, useEffect } from 'react'

// header & footer
// import Header from 'components/CommonComponents/Header/Header'
// import Footer from 'components/CommonComponents/Footer/Footer'

// routes
import AllRoutes from 'routes/AllRoutes'

// scroll to top
import ScrollToTop from './ScrollToTop';

// redux
import { connect } from 'react-redux'

// components
import AppLeftMenu from 'components/CommonComponents/AppLeftMenu/AppLeftMenu'

// header
import Header from 'components/CommonComponents/Header/Header'
// import Footer from 'components/CommonComponents/Footer/Footer'

// react toastify
import { ToastContainer } from 'react-toastify';

function AppRoot(props) {
    const [authLoading, setAuthLoading] = useState(true)

    // USE EFFECT
    useEffect(() => {
        // TEMPRORY LOADING FOR AUTHENTICATION CHECK
        setTimeout(() => {
            setAuthLoading(false)
        }, 500);

    }, [])

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

export default connect(getDataFromStore, null)(AppRoot)