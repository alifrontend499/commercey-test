import React from 'react'

export default function CreateBrand__BrandDetails(props) {
    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.brandName && props.formik.errors.brandName) ? "has-msg msg-error" : ""}`}>
                <label>Brand Name <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Brand Name"
                        id="brandName"
                        {...props.formik.getFieldProps('brandName')} />
                    {
                        /* form message */
                        (props.formik.touched.brandName && props.formik.errors.brandName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.brandName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}
