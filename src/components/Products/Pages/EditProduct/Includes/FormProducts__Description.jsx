import React, { memo } from 'react'

// html editor
import HTML_Editor from 'utlis/helpers/HTML_Editor'

function FormProducts__Description(props) {
    const { getShortDesc, getLongDesc, formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap mb-3 ${(formik.touched.longDescription && formik.errors.longDescription) ? "has-msg msg-error" : ""}`}>
                <label>
                    Short Description
                </label>
                <div className="media-body">
                    <HTML_Editor
                        defaultValue={formik.values.longDescription}
                        getResult={getLongDesc}
                    />

                    {
                        /* form message */
                        (formik.touched.longDescription && formik.errors.longDescription) && (
                            <div className="st-form-msg position-absolute" style={{ bottom: -18 }}>
                                <p className="st-fs-12">{formik.errors.longDescription}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap ${(formik.touched.shortDescription && formik.errors.shortDescription) ? "has-msg msg-error" : ""}`}>
                <label>
                    Long Description
                </label>
                <div className="media-body">
                    <HTML_Editor
                        defaultValue={formik.values.shortDescription}
                        getResult={getShortDesc}
                    />

                    {
                        /* form message */
                        (formik.touched.shortDescription && formik.errors.shortDescription) && (
                            <div className="st-form-msg position-absolute" style={{ bottom: -18 }}>
                                <p className="st-fs-12">{formik.errors.shortDescription}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default memo(FormProducts__Description)