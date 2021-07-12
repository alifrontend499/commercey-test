import React, { memo } from 'react'

function FromProducts__Dimensions(props) {
    const { formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.weight && formik.errors.weight) ? "has-msg msg-error" : ""}`}>
                <label>
                    Weight
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Weight"
                        id="weight"
                        {...formik.getFieldProps('weight')} />
                    {
                        /* form message */
                        (formik.touched.weight && formik.errors.weight) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.weight}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.width && formik.errors.width) ? "has-msg msg-error" : ""}`}>
                <label>
                    Width
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Width"
                        id="width"
                        {...formik.getFieldProps('width')} />
                    {
                        /* form message */
                        (formik.touched.width && formik.errors.width) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.width}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.height && formik.errors.height) ? "has-msg msg-error" : ""}`}>
                <label>
                    Height
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Height"
                        id="height"
                        {...formik.getFieldProps('height')} />
                    {
                        /* form message */
                        (formik.touched.height && formik.errors.height) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.height}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.depth && formik.errors.depth) ? "has-msg msg-error" : ""}`}>
                <label>
                    Depth
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Depth"
                        id="depth"
                        {...formik.getFieldProps('depth')} />
                    {
                        /* form message */
                        (formik.touched.depth && formik.errors.depth) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.depth}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default memo(FromProducts__Dimensions)