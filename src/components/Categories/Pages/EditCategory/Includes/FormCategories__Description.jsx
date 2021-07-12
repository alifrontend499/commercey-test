import React, { memo } from 'react'

// html editor
import HTML_Editor from 'utlis/helpers/HTML_Editor'

function FormCategories__Description(props) {
    const { getResult, formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap ${(formik.touched.description && formik.errors.description) ? "has-msg msg-error" : ""}`}>
                <label>Description</label>
                <div className="media-body">
                    <HTML_Editor
                        defaultValue={formik.values.description}
                        getResult={getResult}
                    />

                    {
                        /* form message */
                        (formik.touched.description && formik.errors.description) && (
                            <div className="st-form-msg position-absolute" style={{ bottom: -18 }}>
                                <p className="st-fs-12">{formik.errors.description}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default memo(FormCategories__Description)