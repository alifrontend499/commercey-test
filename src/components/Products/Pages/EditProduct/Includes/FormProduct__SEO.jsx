import React from 'react'

export default function FormProduct__SEO(props) {
    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.metaTitle && props.formik.errors.metaTitle) ? "has-msg msg-error" : ""}`}>
                <label>Meta Title <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Meta Title"
                        id="metaTitle"
                        {...props.formik.getFieldProps('metaTitle')} />
                    {
                        /* form message */
                        (props.formik.touched.metaTitle && props.formik.errors.metaTitle) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.metaTitle}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap ${(props.formik.touched.metaDescription && props.formik.errors.metaDescription) ? "has-msg msg-error" : ""}`}>
                <label>Meta Description <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Meta Description"
                        id="metaDescription"
                        rows={4}
                        {...props.formik.getFieldProps('metaDescription')}>
                    </textarea>
                    {
                        /* form message */
                        (props.formik.touched.metaDescription && props.formik.errors.metaDescription) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.metaDescription}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
