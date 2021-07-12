import React, { memo } from 'react'

function FormBrands__BrandDetails(props) {
    const { formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.brandName && formik.errors.brandName) ? "has-msg msg-error" : ""}`}>
                <label>
                    Brand Name
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Brand Name"
                        id="brandName"
                        {...formik.getFieldProps('brandName')} />
                    {
                        /* form message */
                        (formik.touched.brandName && formik.errors.brandName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.brandName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}

export default memo(FormBrands__BrandDetails)