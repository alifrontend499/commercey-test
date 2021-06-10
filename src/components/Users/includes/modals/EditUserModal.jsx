import React, { useState, useEffect } from 'react'

// bootstrap
import {
    OverlayTrigger,
    Spinner
} from 'react-bootstrap'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// tooltips
import { renderTooltipClose } from 'utlis/helpers/Tooltips/CommonTooltips'

// formik
import {
    useFormik, //hook for functonal components
} from 'formik'

// yup
import * as Yup from 'yup'

// react toastify
import { toast, Slide } from 'react-toastify';

export default function EditColumnsModal(props) {
    // states
    const [modalLoading, setModalLoading] = useState(false)

    const [editUserButtonDisable, setEditUserButtonDisable] = useState(false)
    const [editUserButtonLoading, setEditUserButtonLoading] = useState(false)

    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("0")
    const [userStatus, setUserStatus] = useState("0")

    // edit user's values
    useEffect(() => {
        if (props.user) {
            const user = props.user
            setUserFirstName(user.firstName)
            setUserLastName(user.lastName)
            setUserEmail(user.email)
            setUserType(user.type)
            setUserStatus(user.status)
        }
    }, [props.user])

    // initial edit user form values
    const initialEditUserFormValues = {
        editUserFirstName: userFirstName,
        editUserLastName: userLastName,
        editUserEmail: userEmail,
        editUserType: userType,
        editUserStatus: userStatus
    }

    // handle edit user form validations
    const editUserFormValidationSchema = Yup.object({
        editUserFirstName: Yup.string().required('This field is required'),
        editUserLastName: Yup.string().required('This field is required'),
        editUserEmail: Yup.string().email('Invalid email address').required('This field is required'),
        editUserType: Yup.string().required('This field is required'),
        editUserStatus: Yup.string().required('This field is required'),
    })

    // handle edit user form submmision
    const onEditUserFormSubmit = values => {
        if (values) {

            // enabling the button and enabling loading
            setModalLoading(true)
            setEditUserButtonDisable(true)
            setEditUserButtonLoading(true)

            setTimeout(() => {
                // disbling the button and enabling loading
                setModalLoading(false)
                setEditUserButtonDisable(false)
                setEditUserButtonLoading(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing success message
                toast.success("Changes saved successfully!", {
                    className: 'app-toast',
                    autoClose: 2500,
                    transition: Slide,
                    draggable: false,
                    hideProgressBar: true,
                    closeOnClick: false,
                })

                // closing the create user modal
                props.closeModal()
            }, 1500);
        } else {
        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialEditUserFormValues,
        validationSchema: editUserFormValidationSchema,
        onSubmit: onEditUserFormSubmit,
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
                    <p className="app-modal-title text-capitalize">edit user</p>
                </div>

                {/* form field */}
                <form
                    onSubmit={formik.handleSubmit}
                    noValidate
                    autoComplete="off">
                    <div className={`st-form ${(formik.touched.editUserFirstName && formik.errors.editUserFirstName) && "has-msg msg-error"}`}>
                        <label className="mb-1">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            id="editUserFirstName"
                            {...formik.getFieldProps('editUserFirstName')} />

                        {
                            /* form message */
                            (formik.touched.editUserFirstName && formik.errors.editUserFirstName) && (
                                <div className="st-form-msg position-absolute">
                                    <p className="st-fs-12">{formik.errors.editUserFirstName}</p>
                                </div>
                            )
                        }
                    </div>

                    {/* form field */}
                    <div className={`st-form ${(formik.touched.editUserLastName && formik.errors.editUserLastName) && "has-msg msg-error"}`}>
                        <label className="mb-1">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            id="editUserLastName"
                            {...formik.getFieldProps('editUserLastName')} />

                        {
                            /* form message */
                            (formik.touched.editUserLastName && formik.errors.editUserLastName) && (
                                <div className="st-form-msg position-absolute">
                                    <p className="st-fs-12">{formik.errors.editUserLastName}</p>
                                </div>
                            )
                        }
                    </div>

                    {/* form field */}
                    <div className={`st-form ${(formik.touched.editUserEmail && formik.errors.editUserEmail) && "has-msg msg-error"}`}>
                        <label className="mb-1">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            id="editUserEmail"
                            {...formik.getFieldProps('editUserEmail')} />

                        {
                            /* form message */
                            (formik.touched.editUserEmail && formik.errors.editUserEmail) && (
                                <div className="st-form-msg position-absolute">
                                    <p className="st-fs-12">{formik.errors.editUserEmail}</p>
                                </div>
                            )
                        }
                    </div>

                    {/* form field */}
                    <div className={`st-form ${(formik.touched.editUserType && formik.errors.editUserType) && "has-msg msg-error"}`}>
                        <label className="mb-1">Type</label>
                        <select
                            className="form-control"
                            id="editUserType"
                            {...formik.getFieldProps('editUserType')}>
                            <option disabled value="0">Select Type</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="reporter">Reporter</option>
                            <option value="tester">Tester</option>
                        </select>

                        {
                            /* form message */
                            (formik.touched.editUserType && formik.errors.editUserType) && (
                                <div className="st-form-msg position-absolute">
                                    <p className="st-fs-12">{formik.errors.editUserType}</p>
                                </div>
                            )
                        }
                    </div>

                    {/* form field */}
                    <div className={`st-form ${(formik.touched.editUserStatus && formik.errors.editUserStatus) && "has-msg msg-error"}`}>
                        <label className="mb-1">Status</label>
                        <select
                            className="form-control"
                            id="editUserStatus"
                            {...formik.getFieldProps('editUserStatus')}>
                            <option disabled value="0">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="disabled">Disabled</option>
                        </select>

                        {
                            /* form message */
                            (formik.touched.editUserStatus && formik.errors.editUserStatus) && (
                                <div className="st-form-msg position-absolute">
                                    <p className="st-fs-12">{formik.errors.editUserStatus}</p>
                                </div>
                            )
                        }
                    </div>

                    <div className="btns d-flex justify-content-end pt-3">
                        <button
                            type="submit"
                            className="st-btn st-btn-primary d-flex align-items-center justify-content-center"
                            disabled={editUserButtonDisable}>
                            {
                                editUserButtonLoading ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    <span>Apply</span>
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
