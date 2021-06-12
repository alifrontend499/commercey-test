import React from 'react'

export default function CreateUser__UserDetails(props) {

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.createUserFirstName && props.formik.errors.createUserFirstName) ? "has-msg msg-error" : ""}`}>
                <label>First Name</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        id="createUserFirstName"
                        {...props.formik.getFieldProps('createUserFirstName')} />
                    {
                        /* form message */
                        (props.formik.touched.createUserFirstName && props.formik.errors.createUserFirstName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.createUserFirstName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.createUserLastName && props.formik.errors.createUserLastName) ? "has-msg msg-error" : ""}`}>
                <label>Last Name</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        id="createUserLastName"
                        {...props.formik.getFieldProps('createUserLastName')} />
                    {
                        /* form message */
                        (props.formik.touched.createUserLastName && props.formik.errors.createUserLastName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.createUserLastName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.createUserEmail && props.formik.errors.createUserEmail) ? "has-msg msg-error" : ""}`}>
                <label>Email</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        id="createUserEmail"
                        {...props.formik.getFieldProps('createUserEmail')} />
                    {
                        /* form message */
                        (props.formik.touched.createUserEmail && props.formik.errors.createUserEmail) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.createUserEmail}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.createUserType && props.formik.errors.createUserType) ? "has-msg msg-error" : ""}`}>
                <label>Type</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="createUserType"
                        {...props.formik.getFieldProps('createUserType')}>
                        <option disabled value="">Select Type</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="reporter">Reporter</option>
                        <option value="tester">Tester</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.createUserType && props.formik.errors.createUserType) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.createUserType}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.createUserStatus && props.formik.errors.createUserStatus) ? "has-msg msg-error" : ""}`}>
                <label>Status</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="createUserStatus"
                        {...props.formik.getFieldProps('createUserStatus')}>
                        <option disabled value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="disabled">Disabled</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.createUserStatus && props.formik.errors.createUserStatus) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.createUserStatus}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
