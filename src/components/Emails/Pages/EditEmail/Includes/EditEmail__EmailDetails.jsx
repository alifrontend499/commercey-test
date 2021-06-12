import React from 'react'

export default function EditEmail__EmailDetails(props) {

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.emailTemplateName && props.formik.errors.emailTemplateName) ? "has-msg msg-error" : ""}`}>
                <label>Template Name</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="emailTemplateName"
                        {...props.formik.getFieldProps('emailTemplateName')}>
                        <option disabled value="">Select Template Name</option>
                        <option value="Forgot Password Email">Forgot Password Email</option>
                        <option value="New Signup Email">New Signup Email</option>
                        <option value="New Order Email">New Order Email</option>
                        <option value="Account Deleted Email">Account Deleted Email</option>
                        <option value="New Signup Email">New Signup Email</option>
                        <option value="New Order Recieved Email">New Order Recieved Email</option>
                        <option value="Account Deleted Email">Account Deleted Email</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.emailTemplateName && props.formik.errors.emailTemplateName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.emailTemplateName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.emailTo && props.formik.errors.emailTo) ? "has-msg msg-error" : ""}`}>
                <label>Email To</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="emailTo"
                        {...props.formik.getFieldProps('emailTo')}>
                        <option disabled value="">Select Template Name</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.emailTo && props.formik.errors.emailTo) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.emailTo}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
