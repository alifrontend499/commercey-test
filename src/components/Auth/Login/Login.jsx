import React, { useState, useEffect } from 'react'

// bootstrap
import {
    Container,
    Image,
    Button,
    Spinner,
} from 'react-bootstrap'

// auth styles
import '../styles/auth-styles.scss'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// formik
import {
    useFormik, //hook for functonal components
} from 'formik'

// yup
import * as Yup from 'yup'

// react router
import { Link } from 'react-router-dom';

// logo
import appLogo from 'assets/images/logo.png'

// redux
import { connect } from 'react-redux'

// helpers functions
import { saveToLocalStorage } from 'utlis/helpers/Common/CommonHelperFunctions'

// actions
import { saveCommonTokenToStore, saveCurrentUserToStore, authenticateUser } from 'redux/actions/actionAuth'

// react toastify
import { toast } from 'react-toastify';

// auth api
import { userLogin } from 'utlis/Apis/AuthUsers_API';

function Login(props) {
    // const tempUserEmail = 'admin@gmail.com';
    // const tempUserPass = '12345678';
    const [loginButtonDisable, setLoginButtonDisable] = useState(false)
    const [loginButtonLoading, setLoginButtonLoading] = useState(false)

    // initial login form values
    const initialLoginFormValues = {
        loginEmail: "",
        loginPassword: "",
        loginRememberMe: false,
    }

    // handle login form validations
    const loginFormValidationSchema = Yup.object({
        loginEmail: Yup.string().email('Invalid email address').required('This field is required'),
        loginPassword: Yup.string()
            .required('This field is required'),
        // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, 'the password must contain atleast one lowercase letter, one uppercase letter and one number.'),
        loginRememberMe: Yup.bool()
    })

    // handle login form submmision
    const onLoginFormSubmit = values => {
        if (values) {
            // disbling the login button and enabling loading
            setLoginButtonLoading(true)
            setLoginButtonDisable(true)

            // validating user details
            userLogin(values.loginEmail, values.loginPassword).then(res => {
                const resData = res.data

                // disbling the loading
                setLoginButtonLoading(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // if user is matched with the databse
                if (resData && resData.success) {
                    // showing success message
                    toast.success("Success", {
                        className: 'app-toast',
                        autoClose: 1500,
                        onClose: () => {
                            var tempUser = {
                                userId: resData.data.login_id,
                                userToken: resData.data.login_id,
                                email: resData.data.email,
                                firstName: resData.data.first_name,
                                lastName: resData.data.last_name,
                                loggedOn: new Date()
                            }

                            // if user select remember me
                            if (values.loginRememberMe) {
                                tempUser = { ...tempUser, canExpire: false }
                            } else {
                                tempUser = { ...tempUser, canExpire: true }
                            }

                            // saving user details to the global store
                            props.saveCommonTokenToStore(tempUser.userToken)
                            props.saveCurrentUserToStore(tempUser)
                            props.authenticateUser(true)

                            // saving user details to the local storage
                            saveToLocalStorage("__uu_dd", JSON.stringify(tempUser))
                        }
                    })
                }

                // if user is not matched with the databse
                if (resData && resData.error) {
                    // showing error message
                    toast.error("Invalid Credentials", {
                        className: 'app-toast',
                        autoClose: 2000,
                        onClose: () => {
                            // enabling the login button
                            setLoginButtonDisable(false)
                        }
                    })
                }

            }).catch(err => {
                // loggin the error message
                console.log("error occured ", err, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error("Unexpected error occured!! Please try again.", {
                    className: 'app-toast',
                    autoClose: 3000,
                    onClose: () => {
                        // enabling the login button and disbling loading
                        setLoginButtonLoading(false)
                        setLoginButtonDisable(false)
                    }
                })
            })

        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialLoginFormValues,
        onSubmit: onLoginFormSubmit,
        validationSchema: loginFormValidationSchema
    })

    // cheking if the user is already logged in
    useEffect(() => {
        if (props.isUserAuthenticated) {
            // redireting the user to the dashboard
            props.history.push('/dashboard')
        }
    }, [props])

    return (
        <div className="app-wrapper page-login">
            <div className="st-auth overflow-auto">
                <Container fluid className="h-100">
                    <div className="st-auth h-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="inner border st-default-rounded-block bg-white">
                            {/* top sec */}
                            <div className="top-sec">
                                <Link to="/login" className="d-block mx-auto mb-3 mb-lg-4" style={{ width: 180 }}>
                                    <Image src={appLogo} fluid />
                                </Link>
                                <p className="head st-fs-24 st-fw-700 text-center">Sign in</p>
                                <p className="mt-1 subhead text-center">Login to your account</p>
                            </div>

                            {/* LOGIN FORM */}
                            <div className="form-sec">
                                <form
                                    onSubmit={formik.handleSubmit}
                                    noValidate
                                    autoComplete="off">
                                    {/* form field */}
                                    <div className={`
                                        st-form position-relative 
                                        ${(formik.touched.loginEmail && formik.errors.loginEmail) && "has-msg msg-error"}
                                    `}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            id="loginEmail"
                                            name="loginEmail"
                                            {...formik.getFieldProps('loginEmail')} />
                                        {
                                            /* form message */
                                            (formik.touched.loginEmail && formik.errors.loginEmail) && (
                                                <div className="st-form-msg position-absolute">
                                                    <p className="st-fs-12">{formik.errors.loginEmail}</p>
                                                </div>
                                            )
                                        }
                                    </div>

                                    {/* form field */}
                                    <div className={`
                                        st-form position-relative 
                                        ${(formik.touched.loginPassword && formik.errors.loginPassword) && "has-msg msg-error"}
                                    `}>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            id="loginPassword"
                                            name="loginPassword"
                                            {...formik.getFieldProps('loginPassword')} />
                                        {
                                            /* form message */
                                            (formik.touched.loginPassword && formik.errors.loginPassword) && (
                                                <div className="st-form-msg position-absolute">
                                                    <p className="st-fs-12">{formik.errors.loginPassword}</p>
                                                </div>
                                            )
                                        }
                                    </div>

                                    {/* buttons */}
                                    <div className="btns d-flex align-items-center pt-1">
                                        <Button
                                            type="submit"
                                            className="st-btn st-btn-primary st-fw-600 text-uppercase d-flex align-items-center justify-content-center"
                                            disabled={loginButtonDisable}>
                                            {
                                                loginButtonLoading ? (
                                                    <Spinner animation="border" size="sm" />
                                                ) : (
                                                    <span>sign in</span>
                                                )
                                            }
                                        </Button>

                                        <label className="st-checkbox d-inline-flex cursor-pointer ms-3">
                                            <input
                                                type="checkbox"
                                                className="d-none"
                                                id="loginRememberMe"
                                                name="loginRememberMe"
                                                {...formik.getFieldProps('loginRememberMe')} />
                                            <span className="box d-flex align-items-center justify-content-center border">
                                                <FeatherIcon
                                                    icon="check"
                                                    size="15"
                                                    className="icon position-relative" />
                                            </span>
                                            <span className="text ms-2">Remember Me</span>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* other details */}
                        <div className="other-details text-center my-3">
                            <p className="text-decoration-none mb-1">
                                I forgot my password. Please <Link to="/forgot-password" className="st-text-primary">send me a recovery email.</Link>
                            </p>
                            <p className="text-decoration-none">
                                Don't have an account? <Link to="/" className="st-text-primary">Sign up.</Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
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

export default connect(getDataFromStore, dispatchActionsToProps)(Login)