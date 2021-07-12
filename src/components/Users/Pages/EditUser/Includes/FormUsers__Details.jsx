import React, { memo } from 'react'

function FormUsers__Details(props) {
    const { formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.editUserFirstName && formik.errors.editUserFirstName) ? "has-msg msg-error" : ""}`}>
                <label>
                    First Name
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
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
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.editUserLastName && formik.errors.editUserLastName) ? "has-msg msg-error" : ""}`}>
                <label>
                    Last Name
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
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
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.editUserEmail && formik.errors.editUserEmail) ? "has-msg msg-error" : ""}`}>
                <label>
                    Email
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
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
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.editUserTwoFactor && formik.errors.editUserTwoFactor) ? "has-msg msg-error" : ""}`}>
                <label>
                    Two Factor
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="editUserTwoFactor"
                        {...formik.getFieldProps('editUserTwoFactor')}>
                        <option disabled value="">Select Two Factor</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    {
                        /* form message */
                        (formik.touched.editUserTwoFactor && formik.errors.editUserTwoFactor) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.editUserTwoFactor}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.editUserType && formik.errors.editUserType) ? "has-msg msg-error" : ""}`}>
                <label>
                    Type
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="editUserType"
                        {...formik.getFieldProps('editUserType')}>
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
                        (formik.touched.editUserType && formik.errors.editUserType) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.editUserType}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.editUserStatus && formik.errors.editUserStatus) ? "has-msg msg-error" : ""}`}>
                <label>
                    Status
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="editUserStatus"
                        {...formik.getFieldProps('editUserStatus')}>
                        <option disabled value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
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
            </div>
        </React.Fragment>
    )
}

export default memo(FormUsers__Details)