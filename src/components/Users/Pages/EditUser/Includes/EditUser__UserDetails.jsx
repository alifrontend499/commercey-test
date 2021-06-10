import React from 'react'

export default function EditUser__UserDetails(props) {

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.editUserFirstName && props.formik.errors.editUserFirstName) ? "has-msg msg-error" : ""}`}>
                <label>First Name</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        id="editUserFirstName"
                        {...props.formik.getFieldProps('editUserFirstName')} />
                    {
                        /* form message */
                        (props.formik.touched.editUserFirstName && props.formik.errors.editUserFirstName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.editUserFirstName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.editUserLastName && props.formik.errors.editUserLastName) ? "has-msg msg-error" : ""}`}>
                <label>Last Name</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        id="editUserLastName"
                        {...props.formik.getFieldProps('editUserLastName')} />
                    {
                        /* form message */
                        (props.formik.touched.editUserLastName && props.formik.errors.editUserLastName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.editUserLastName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.editUserEmail && props.formik.errors.editUserEmail) ? "has-msg msg-error" : ""}`}>
                <label>Email</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        id="editUserEmail"
                        {...props.formik.getFieldProps('editUserEmail')} />
                    {
                        /* form message */
                        (props.formik.touched.editUserEmail && props.formik.errors.editUserEmail) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.editUserEmail}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.editUserType && props.formik.errors.editUserType) ? "has-msg msg-error" : ""}`}>
                <label>Type</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="editUserType"
                        {...props.formik.getFieldProps('editUserType')}>
                        <option disabled value="">Select Type</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="reporter">Reporter</option>
                        <option value="tester">Tester</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.editUserType && props.formik.errors.editUserType) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.editUserType}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.editUserStatus && props.formik.errors.editUserStatus) ? "has-msg msg-error" : ""}`}>
                <label>Status</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="editUserStatus"
                        {...props.formik.getFieldProps('editUserStatus')}>
                        <option disabled value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="disabled">Disabled</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.editUserStatus && props.formik.errors.editUserStatus) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.editUserStatus}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}