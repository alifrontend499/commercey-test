import React from 'react'

export default function FromProduct__Dimensions(props) {
    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.weight && props.formik.errors.weight) ? "has-msg msg-error" : ""}`}>
                <label>
                    Weight
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Weight"
                        id="weight"
                        {...props.formik.getFieldProps('weight')} />
                    {
                        /* form message */
                        (props.formik.touched.weight && props.formik.errors.weight) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.weight}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.width && props.formik.errors.width) ? "has-msg msg-error" : ""}`}>
                <label>
                    Width
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Width"
                        id="width"
                        {...props.formik.getFieldProps('width')} />
                    {
                        /* form message */
                        (props.formik.touched.width && props.formik.errors.width) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.width}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.height && props.formik.errors.height) ? "has-msg msg-error" : ""}`}>
                <label>
                    Height
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Height"
                        id="height"
                        {...props.formik.getFieldProps('height')} />
                    {
                        /* form message */
                        (props.formik.touched.height && props.formik.errors.height) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.height}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.depth && props.formik.errors.depth) ? "has-msg msg-error" : ""}`}>
                <label>
                    Depth
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Depth"
                        id="depth"
                        {...props.formik.getFieldProps('depth')} />
                    {
                        /* form message */
                        (props.formik.touched.depth && props.formik.errors.depth) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.depth}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
