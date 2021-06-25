import React from 'react'

export default function CreateEmail__EmailDetails(props) {
    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.emailTemplateName && props.formik.errors.emailTemplateName) ? "has-msg msg-error" : ""}`}>
                <label>Template Name <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Template Name"
                        id="emailTemplateName"
                        {...props.formik.getFieldProps('emailTemplateName')} />
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
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.emailEventName && props.formik.errors.emailEventName) ? "has-msg msg-error" : ""}`}>
                <label>Event Name <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="emailEventName"
                        {...props.formik.getFieldProps('emailEventName')}>
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
                        (props.formik.touched.emailEventName && props.formik.errors.emailEventName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.emailEventName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.emailTo && props.formik.errors.emailTo) ? "has-msg msg-error" : ""}`}>
                <label>To <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="emailTo"
                        {...props.formik.getFieldProps('emailTo')}>
                        <option disabled value="">Select To</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
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

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.emailFrom && props.formik.errors.emailFrom) ? "has-msg msg-error" : ""}`}>
                <label>From</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="From"
                        id="emailFrom"
                        {...props.formik.getFieldProps('emailFrom')} />
                    {
                        /* form message */
                        (props.formik.touched.emailFrom && props.formik.errors.emailFrom) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.emailFrom}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.emailSubject && props.formik.errors.emailSubject) ? "has-msg msg-error" : ""}`}>
                <label>Subject <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Subject"
                        id="emailSubject"
                        {...props.formik.getFieldProps('emailSubject')} />
                    {
                        /* form message */
                        (props.formik.touched.emailSubject && props.formik.errors.emailSubject) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.emailSubject}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.emailCC && props.formik.errors.emailCC) ? "has-msg msg-error" : ""}`}>
                <label>CC</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CC"
                        id="emailCC"
                        {...props.formik.getFieldProps('emailCC')} />
                    {
                        /* form message */
                        (props.formik.touched.emailCC && props.formik.errors.emailCC) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.emailCC}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.emailBCC && props.formik.errors.emailBCC) ? "has-msg msg-error" : ""}`}>
                <label>BCC</label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="BCC"
                        id="emailBCC"
                        {...props.formik.getFieldProps('emailBCC')} />
                    {
                        /* form message */
                        (props.formik.touched.emailBCC && props.formik.errors.emailBCC) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.emailBCC}</p>
                            </div>
                        )
                    }
                </div>
            </div>


        </React.Fragment>
    )
}
