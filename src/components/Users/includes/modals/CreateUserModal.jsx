import React, { useState } from 'react'

// bootstrap
import {
    OverlayTrigger,
    Spinner
} from 'react-bootstrap'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// tooltips
import { renderTooltipClose } from 'helpers/Tooltips/CommonTooltips'

// formik
import {
    useFormik, //hook for functonal components
} from 'formik'

// yup
import * as Yup from 'yup'

// react toastify
import { toast, Slide } from 'react-toastify';

export default function CreateUserModal(props) {
    // states
    const [modalLoading, setModalLoading] = useState(false)

    const [createUserButtonDisable, setCreateUserButtonDisable] = useState(false)
    const [createUserButtonLoading, setCreateUserButtonLoading] = useState(false)

    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("admin")
    const [userStatus, setUserStatus] = useState("active")

    // initial create user form values
    const initialCreateUserFormValues = {
        createUserFirstName: userFirstName,
        createUserLastName: userLastName,
        createUserEmail: userEmail,
        createUserType: userType,
        createUserStatus: userStatus
    }

    // handle create user form validations
    const createUserFormValidationSchema = Yup.object({
        createUserFirstName: Yup.string().required('This field is required'),
        createUserLastName: Yup.string().required('This field is required'),
        createUserEmail: Yup.string().email('Invalid email address').required('This field is required'),
        createUserType: Yup.string().required('This field is required'),
        createUserStatus: Yup.string().required('This field is required'),
    })

    // handle create user form submmision
    const onCreateUserFormSubmit = values => {
        if (values) {

            // enabling the button and enabling loading
            setModalLoading(true)
            setCreateUserButtonDisable(true)
            setCreateUserButtonLoading(true)

            setTimeout(() => {
                // disbling the button and enabling loading
                setModalLoading(false)
                setCreateUserButtonDisable(false)
                setCreateUserButtonLoading(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing success message
                toast.success("User created succesfully!", {
                    className: 'app-toast',
                    autoClose: 2500,
                    transition: Slide,
                    draggable: false,
                    hideProgressBar: true,
                    closeOnClick: false,
                })

                // closing the create user modal
                props.closeModal()

                // ressetting all the fields to default
                setUserFirstName("")
                setUserLastName("")
                setUserEmail("")
                setUserType("admin")
                setUserStatus("active")

            }, 1000);
        } else {
        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialCreateUserFormValues,
        validationSchema: createUserFormValidationSchema,
        onSubmit: onCreateUserFormSubmit,
        enableReinitialize: true
    })

    return (
        <div className="app-modal-content modal_add-user">
            {/* close icon */}
            <div className="close-icon">
                <OverlayTrigger
                    placement={"bottom"}
                    overlay={renderTooltipClose}
                >
                    <button
                        className="st-round-btn st-btn-transparent st-btn-sm d-flex align-items-center justify-content-center"
                        onClick={props.closeModal && props.closeModal}
                    >
                        <FeatherIcon
                            icon="x"
                            size="17"
                            className="icon st-text-primary" />
                    </button>
                </OverlayTrigger>
            </div>

            {/* ADD USER FORM */}
            <div className="add-user-form">
                {/* heading */}
                <div className="app-modal-title-wrapper mb-3 mb-lg-4">
                    <p className="app-modal-title text-capitalize">add user</p>
                </div>

                {/* form field */}
                <form
                    onSubmit={formik.handleSubmit}
                    noValidate
                    autoComplete="off">
                    <div className={`st-form ${(formik.touched.createUserFirstName && formik.errors.createUserFirstName) && "has-msg msg-error"}`}>
                        <label className="mb-1">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            id="createUserFirstName"
                            {...formik.getFieldProps('createUserFirstName')} />

                        {
                            /* form message */
                            (formik.touched.createUserFirstName && formik.errors.createUserFirstName) && (
                                <div className="st-form-msg position-absolute">
                                    <p className="st-fs-12">{formik.errors.createUserFirstName}</p>
                                </div>
                            )
                        }
                    </div>

                    {/* form field */}
                    <div className={`st-form ${(formik.touched.createUserLastName && formik.errors.createUserLastName) && "has-msg msg-error"}`}>
                        <label className="mb-1">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            id="createUserLastName"
                            {...formik.getFieldProps('createUserLastName')} />

                        {
                            /* form message */
                            (formik.touched.createUserLastName && formik.errors.createUserLastName) && (
                                <div className="st-form-msg position-absolute">
                                    <p className="st-fs-12">{formik.errors.createUserLastName}</p>
                                </div>
                            )
                        }
                    </div>

                    {/* form field */}
                    <div className={`st-form ${(formik.touched.createUserEmail && formik.errors.createUserEmail) && "has-msg msg-error"}`}>
                        <label className="mb-1">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            id="createUserEmail"
                            {...formik.getFieldProps('createUserEmail')} />

                        {
                            /* form message */
                            (formik.touched.createUserEmail && formik.errors.createUserEmail) && (
                                <div className="st-form-msg position-absolute">
                                    <p className="st-fs-12">{formik.errors.createUserEmail}</p>
                                </div>
                            )
                        }
                    </div>

                    {/* form field */}
                    <div className={`st-form ${(formik.touched.createUserType && formik.errors.createUserType) && "has-msg msg-error"}`}>
                        <label className="mb-1">Type</label>
                        <select
                            className="form-control"
                            id="createUserType"
                            {...formik.getFieldProps('createUserType')}>
                            <option disabled value="0">Select Type</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="reporter">Reporter</option>
                            <option value="tester">Tester</option>
                        </select>

                        {
                            /* form message */
                            (formik.touched.createUserType && formik.errors.createUserType) && (
                                <div className="st-form-msg position-absolute">
                                    <p className="st-fs-12">{formik.errors.createUserType}</p>
                                </div>
                            )
                        }
                    </div>

                    {/* form field */}
                    <div className={`st-form ${(formik.touched.createUserStatus && formik.errors.createUserStatus) && "has-msg msg-error"}`}>
                        <label className="mb-1">Status</label>
                        <select
                            className="form-control"
                            id="createUserStatus"
                            {...formik.getFieldProps('createUserStatus')}>
                            <option disabled value="0">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="disabled">Disabled</option>
                        </select>

                        {
                            /* form message */
                            (formik.touched.createUserStatus && formik.errors.createUserStatus) && (
                                <div className="st-form-msg position-absolute">
                                    <p className="st-fs-12">{formik.errors.createUserStatus}</p>
                                </div>
                            )
                        }
                    </div>

                    <div className="btns d-flex justify-content-end pt-3">
                        <button
                            type="submit"
                            className="st-btn st-btn-primary d-flex align-items-center justify-content-center"
                            disabled={createUserButtonDisable}>
                            {
                                createUserButtonLoading ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    <span>Create User</span>
                                )
                            }
                        </button>
                    </div>
                </form>
            </div>


            {
                /* loading overlay */
                modalLoading && (
                    <div className="app-modal-loading-overlay position-absolute h-100 w-100 d-flex align-items-center justify-content-center">
                        <Spinner animation="border" />
                    </div>
                )
            }
        </div>
    )
}
