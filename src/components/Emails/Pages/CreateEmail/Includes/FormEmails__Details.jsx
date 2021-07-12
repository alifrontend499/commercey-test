import React, { memo } from 'react'

function FormEmails__Details(props) {
    const { formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.emailTemplateName && formik.errors.emailTemplateName) ? "has-msg msg-error" : ""}`}>
                <label>
                    Template Name
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Template Name"
                        id="emailTemplateName"
                        {...formik.getFieldProps('emailTemplateName')} />
                    {
                        /* form message */
                        (formik.touched.emailTemplateName && formik.errors.emailTemplateName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.emailTemplateName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.emailEventName && formik.errors.emailEventName) ? "has-msg msg-error" : ""}`}>
                <label>
                    Event Name
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="emailEventName"
                        {...formik.getFieldProps('emailEventName')}>
                        <option disabled value="">Select Event Name</option>
                        {
                            (props.emailEvents && props.emailEvents.length) && props.emailEvents.map(item => (
                                <option
                                    key={item.event_id.toString()}
                                    value={item.event_id.toString()}>{item.event_title}</option>
                            ))
                        }
                    </select>
                    {
                        /* form message */
                        (formik.touched.emailEventName && formik.errors.emailEventName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.emailEventName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.emailTo && formik.errors.emailTo) ? "has-msg msg-error" : ""}`}>
                <label>
                    To
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="emailTo"
                        {...formik.getFieldProps('emailTo')}>
                        <option disabled value="">Select To</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    {
                        /* form message */
                        (formik.touched.emailTo && formik.errors.emailTo) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.emailTo}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.emailFrom && formik.errors.emailFrom) ? "has-msg msg-error" : ""}`}>
                <label>From</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="From"
                        id="emailFrom"
                        {...formik.getFieldProps('emailFrom')} />
                    {
                        /* form message */
                        (formik.touched.emailFrom && formik.errors.emailFrom) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.emailFrom}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.emailSubject && formik.errors.emailSubject) ? "has-msg msg-error" : ""}`}>
                <label>
                    Subject
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Subject"
                        id="emailSubject"
                        {...formik.getFieldProps('emailSubject')} />
                    {
                        /* form message */
                        (formik.touched.emailSubject && formik.errors.emailSubject) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.emailSubject}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.emailCC && formik.errors.emailCC) ? "has-msg msg-error" : ""}`}>
                <label>CC</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CC"
                        id="emailCC"
                        {...formik.getFieldProps('emailCC')} />
                    {
                        /* form message */
                        (formik.touched.emailCC && formik.errors.emailCC) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.emailCC}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.emailBCC && formik.errors.emailBCC) ? "has-msg msg-error" : ""}`}>
                <label>BCC</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="BCC"
                        id="emailBCC"
                        {...formik.getFieldProps('emailBCC')} />
                    {
                        /* form message */
                        (formik.touched.emailBCC && formik.errors.emailBCC) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.emailBCC}</p>
                            </div>
                        )
                    }
                </div>
            </div>


        </React.Fragment>
    )
}


export default memo(FormEmails__Details)