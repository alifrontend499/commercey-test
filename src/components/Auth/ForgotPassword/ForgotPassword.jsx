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

function ForgotPassword(props) {
    const [forgotPasswordButtonDisable, setForgotPasswordButtonDisable] = useState(false)
    const [forgotPasswordButtonLoading, setforgotPasswordButtonLoading] = useState(false)

    // initial forgot password form values
    const initialForgotPasswordFormValues = {
        forgotPasswordEmail: '',
    }

    // handle forgot password form validations
    const forgotPasswordFormValidationSchema = Yup.object({
        forgotPasswordEmail: Yup.string().email('Invalid email address').required('This field is required'),
    })

    // handle forgot password form submmision
    const onForgotPasswordFormSubmit = values => {
        if (values) {
            // disbling the forgot password button and enabling loading
            setforgotPasswordButtonLoading(true)
            setForgotPasswordButtonDisable(true)

        } else {
            
        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialForgotPasswordFormValues,
        onSubmit: onForgotPasswordFormSubmit,
        validationSchema: forgotPasswordFormValidationSchema
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
                                <Link to="/forgot-password" className="d-block mx-auto mb-3 mb-lg-4" style={{ width: 180 }}>
                                    <Image src={appLogo} fluid />
                                </Link>
                                <p className="head st-fs-24 st-fw-700 text-center">Forgot password</p>
                                <p className="mt-1 subhead text-center">Enter your email address</p>
                            </div>

                            {/* LOGIN FORM */}
                            <div className="form-sec">
                                <form
                                    onSubmit={formik.handleSubmit}
                                    noValidate
                                    autoComplete="off">
                                    {/* form field */}
                                    <div className={`
                                        st-form position-relative mb-4 
                                        ${(formik.touched.forgotPasswordEmail && formik.errors.forgotPasswordEmail) && "has-msg msg-error"}
                                    `}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            id="forgotPasswordEmail"
                                            name="forgotPasswordEmail"
                                            {...formik.getFieldProps('forgotPasswordEmail')} />
                                        {
                                            /* form message */
                                            (formik.touched.forgotPasswordEmail && formik.errors.forgotPasswordEmail) && (
                                                <div className="st-form-msg position-absolute">
                                                    <p className="st-fs-12">{formik.errors.forgotPasswordEmail}</p>
                                                </div>
                                            )
                                        }
                                    </div>

                                    {/* buttons */}
                                    <div className="btns d-flex align-items-center pt-1">
                                        <Button
                                            type="submit"
                                            className="st-btn st-btn-primary st-fw-600 text-uppercase d-flex align-items-center justify-content-center"
                                            disabled={forgotPasswordButtonDisable}>
                                            {
                                                forgotPasswordButtonLoading ? (
                                                    <Spinner animation="border" size="sm" />
                                                ) : (
                                                    <span>Reset Password</span>
                                                )
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* other details */}
                        <div className="other-details text-center my-3">
                            <p className="text-decoration-none mb-1">
                                I already have an account. Please <Link to="/login" className="st-text-primary">take me to the login page.</Link>
                            </p>
                            <p className="text-decoration-none">
                                Don't have an account? <Link to="/forgot-password" className="st-text-primary">Sign up.</Link>
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

export default connect(getDataFromStore, null)(ForgotPassword)