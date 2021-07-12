import React, { memo } from 'react'

function FormUsers__Details(props) {
    const { formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.createUserFirstName && formik.errors.createUserFirstName) ? "has-msg msg-error" : ""}`}>
                <label>
                    First Name
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
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
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.createUserLastName && formik.errors.createUserLastName) ? "has-msg msg-error" : ""}`}>
                <label>
                    Last Name
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
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
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.createUserEmail && formik.errors.createUserEmail) ? "has-msg msg-error" : ""}`}>
                <label>
                    Email
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
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
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.createUserTwoFactor && formik.errors.createUserTwoFactor) ? "has-msg msg-error" : ""}`}>
                <label>
                    Two Factor
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="createUserTwoFactor"
                        {...formik.getFieldProps('createUserTwoFactor')}>
                        <option disabled value="">Select Two Factor</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    {
                        // form message
                        (formik.touched.createUserTwoFactor && formik.errors.createUserTwoFactor) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.createUserTwoFactor}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.createUserType && formik.errors.createUserType) ? "has-msg msg-error" : ""}`}>
                <label>
                    Type
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="createUserType"
                        {...formik.getFieldProps('createUserType')}>
                        <option disabled value="">Select Type</option>
                        {
                            (props.adminGroups && props.adminGroups.length) && props.adminGroups.map(item => (
                                <option
                                    key={item.group_id.toString()}
                                    value={item.group_id.toString()}>{item.group_name}</option>
                            ))
                        }
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
            </div>

            {/* form field */}
            {/* <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.createUserStatus && formik.errors.createUserStatus) ? "has-msg msg-error" : ""}`}>
                <label>Status</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="createUserStatus"
                        {...formik.getFieldProps('createUserStatus')}>
                        <option disabled value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    {
                        form message
                        (formik.touched.createUserStatus && formik.errors.createUserStatus) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.createUserStatus}</p>
                            </div>
                        )
                    }
                </div>
            </div> */}
        </React.Fragment>
    )
}

export default memo(FormUsers__Details)