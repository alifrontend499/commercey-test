import React, { memo } from 'react'

function FormProducts__SEO(props) {
    const { formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.metaTitle && formik.errors.metaTitle) ? "has-msg msg-error" : ""}`}>
                <label>
                    Meta Title
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Meta Title"
                        id="metaTitle"
                        {...formik.getFieldProps('metaTitle')} />
                    {
                        /* form message */
                        (formik.touched.metaTitle && formik.errors.metaTitle) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.metaTitle}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap ${(formik.touched.metaDescription && formik.errors.metaDescription) ? "has-msg msg-error" : ""}`}>
                <label>
                    Meta Description
                </label>
                <div className="media-body st-form-input-container">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Meta Description"
                        id="metaDescription"
                        rows={4}
                        {...formik.getFieldProps('metaDescription')}>
                    </textarea>
                    {
                        /* form message */
                        (formik.touched.metaDescription && formik.errors.metaDescription) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.metaDescription}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default memo(FormProducts__SEO)