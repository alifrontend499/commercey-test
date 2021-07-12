import React, { memo } from 'react'

function FormProducts__Price(props) {
    const { formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(formik.touched.costPrice && formik.errors.costPrice) ? "has-msg msg-error" : ""}`}>
                <label>
                    Cost Price
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Cost Price"
                        id="costPrice"
                        {...formik.getFieldProps('costPrice')} />
                    {
                        /* form message */
                        (formik.touched.costPrice && formik.errors.costPrice) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.costPrice}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(formik.touched.price && formik.errors.price) ? "has-msg msg-error" : ""}`}>
                <label>
                    Price
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        id="price"
                        {...formik.getFieldProps('price')} />
                    {
                        /* form message */
                        (formik.touched.price && formik.errors.price) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.price}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(formik.touched.promoPrice && formik.errors.promoPrice) ? "has-msg msg-error" : ""}`}>
                <label>
                    Promo Price
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Promo Price"
                        id="promoPrice"
                        {...formik.getFieldProps('promoPrice')} />
                    {
                        /* form message */
                        (formik.touched.promoPrice && formik.errors.promoPrice) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.promoPrice}</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}


export default memo(FormProducts__Price)