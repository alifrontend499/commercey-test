import React, { memo } from 'react'

// html editor
import HTML_Editor from 'utlis/helpers/HTML_Editor'

function FormEmails__Description(props) {
    const { getResult, formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap mb-3 ${(formik.touched.emailContent && formik.errors.emailContent) ? "has-msg msg-error" : ""}`}>
                <label>
                    Content
                </label>
                <div className="media-body">
                    <HTML_Editor
                        defaultValue={formik.values.emailContent}
                        getResult={getResult}
                    />

                    {
                        /* form message */
                        (formik.touched.emailContent && formik.errors.emailContent) && (
                            <div className="st-form-msg position-absolute" style={{ bottom: -18 }}>
                                <p className="st-fs-12">{formik.errors.emailContent}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}


export default memo(FormEmails__Description)