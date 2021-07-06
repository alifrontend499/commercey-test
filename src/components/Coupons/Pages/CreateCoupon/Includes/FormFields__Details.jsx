import React from 'react'

// icons : feather
import FeatherIcon from 'feather-icons-react';

export default function FormFields__Details(props) {
    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponDiscountValue && props.formik.errors.couponDiscountValue) ? "has-msg msg-error" : ""}`}>
                <label>
                    Coupon Code
                    <span>*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Coupon Code"
                        id="couponDiscountValue"
                        {...props.formik.getFieldProps('couponDiscountValue')} />
                    {
                        /* form message */
                        (props.formik.touched.couponDiscountValue && props.formik.errors.couponDiscountValue) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponDiscountValue}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponFor && props.formik.errors.couponFor) ? "has-msg msg-error" : ""}`}>
                <label>
                    Coupon For
                    <span>*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="couponFor"
                        {...props.formik.getFieldProps('couponFor')}>
                        <option disabled value="">Select For</option>
                        <option value="website">Website</option>
                        <option value="app">App</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.couponFor && props.formik.errors.couponFor) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponFor}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponDiscountPercent && props.formik.errors.couponDiscountPercent) ? "has-msg msg-error" : ""}`}>
                <label>
                    Discount Percent
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Discount Percent"
                        id="couponDiscountPercent"
                        {...props.formik.getFieldProps('couponDiscountPercent')} />
                    {
                        /* form message */
                        (props.formik.touched.couponDiscountPercent && props.formik.errors.couponDiscountPercent) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponDiscountPercent}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponDiscountValue && props.formik.errors.couponDiscountValue) ? "has-msg msg-error" : ""}`}>
                <label>
                    Discount Value
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Discount Value"
                        id="couponDiscountPercent"
                        {...props.formik.getFieldProps('couponDiscountPercent')} />
                    {
                        /* form message */
                        (props.formik.touched.couponDiscountPercent && props.formik.errors.couponDiscountPercent) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponDiscountPercent}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.expiryDate && props.formik.errors.expiryDate) ? "has-msg msg-error" : ""}`}>
                <label>
                    Expiry Date
                    <span>*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Expiry Date"
                        id="expiryDate"
                        {...props.formik.getFieldProps('expiryDate')} />
                    {
                        /* form message */
                        (props.formik.touched.expiryDate && props.formik.errors.expiryDate) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.expiryDate}</p>
                            </div>
                        )
                    }
                </div>
            </div>
            
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.minOrderAmount && props.formik.errors.minOrderAmount) ? "has-msg msg-error" : ""}`}>
                <label>
                    Minimum Order Amount
                    <span>*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Minimum Order Amount"
                        id="minOrderAmount"
                        {...props.formik.getFieldProps('minOrderAmount')} />
                    {
                        /* form message */
                        (props.formik.touched.minOrderAmount && props.formik.errors.minOrderAmount) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.minOrderAmount}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponFreeShiping && props.formik.errors.couponFreeShiping) ? "has-msg msg-error" : ""}`}>
                <label>
                    Free Shipping
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container" style={{ textAlign: 'left' }}>
                    <label className="st-checkbox d-inline-flex cursor-pointer position-relative" style={{ top: 3 }}>
                        <input
                            type="checkbox"
                            className="d-none"
                            id="couponFreeShiping"
                            {...props.formik.getFieldProps('couponFreeShiping')} />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                    </label>

                    {
                        /* form message */
                        (props.formik.touched.couponFreeShiping && props.formik.errors.couponFreeShiping) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponFreeShiping}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponStatus && props.formik.errors.couponStatus) ? "has-msg msg-error" : ""}`}>
                <label>
                    Status
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container" style={{ textAlign: 'left' }}>
                    <label className="st-checkbox d-inline-flex cursor-pointer position-relative" style={{ top: 3 }}>
                        <input
                            type="checkbox"
                            className="d-none"
                            id="couponStatus"
                            {...props.formik.getFieldProps('couponStatus')} />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                    </label>

                    {
                        /* form message */
                        (props.formik.touched.couponStatus && props.formik.errors.couponStatus) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponStatus}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponSingleUse && props.formik.errors.couponSingleUse) ? "has-msg msg-error" : ""}`}>
                <label>
                    Single Use
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container" style={{ textAlign: 'left' }}>
                    <label className="st-checkbox d-inline-flex cursor-pointer position-relative" style={{ top: 3 }}>
                        <input
                            type="checkbox"
                            className="d-none"
                            id="couponSingleUse"
                            {...props.formik.getFieldProps('couponSingleUse')} />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                    </label>

                    {
                        /* form message */
                        (props.formik.touched.couponSingleUse && props.formik.errors.couponSingleUse) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponSingleUse}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponSingleUsePerUser && props.formik.errors.couponSingleUsePerUser) ? "has-msg msg-error" : ""}`}>
                <label>
                    Single Use Per User
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container" style={{ textAlign: 'left' }}>
                    <label className="st-checkbox d-inline-flex cursor-pointer position-relative" style={{ top: 3 }}>
                        <input
                            type="checkbox"
                            className="d-none"
                            id="couponSingleUsePerUser"
                            {...props.formik.getFieldProps('couponSingleUsePerUser')} />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                    </label>

                    {
                        /* form message */
                        (props.formik.touched.couponSingleUsePerUser && props.formik.errors.couponSingleUsePerUser) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponSingleUsePerUser}</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}
