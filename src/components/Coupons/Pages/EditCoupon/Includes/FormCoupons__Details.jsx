import React, { memo } from 'react'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// date picker
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/it';

function FormCoupons__Details(props) {
    const { handleDateChange, formik } = props

    const FORMAT = "YYYY-MM-DD"

    // disabling key press
    const handleKeyDown = ev => {
        ev.preventDefault()
        return false
    }

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.couponCode && formik.errors.couponCode) ? "has-msg msg-error" : ""}`}>
                <label>
                    Coupon Code
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Coupon Code"
                        id="couponCode"
                        {...formik.getFieldProps('couponCode')} />
                    {
                        /* form message */
                        (formik.touched.couponCode && formik.errors.couponCode) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.couponCode}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.couponDiscountType && formik.errors.couponDiscountType) ? "has-msg msg-error" : ""}`}>
                <label>
                    Discount Type
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="couponDiscountType"
                        {...formik.getFieldProps('couponDiscountType')}>
                        <option disabled value="">Select Discount Type</option>
                        <option value="percent">Percent</option>
                        <option value="value">Value</option>
                    </select>
                    {
                        /* form message */
                        (formik.touched.couponDiscountType && formik.errors.couponDiscountType) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.couponDiscountType}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* if discount type is percent */}
            {
                (props?.formik?.values?.couponDiscountType === "percent") && (
                    // form field
                    <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(formik.touched.couponDiscountPercent && formik.errors.couponDiscountPercent) ? "has-msg msg-error" : ""}`}>
                        <label>
                            Discount Percent
                        </label>
                        <div className="media-body st-form-input-container">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Discount Percent"
                                id="couponDiscountPercent"
                                {...formik.getFieldProps('couponDiscountPercent')} />
                            {
                                /* form message */
                                (formik.touched.couponDiscountPercent && formik.errors.couponDiscountPercent) && (
                                    <div className="st-form-msg position-absolute">
                                        <p className="st-fs-12">{formik.errors.couponDiscountPercent}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }

            {/* if discount type is value */}
            {
                (props?.formik?.values?.couponDiscountType === "value") && (
                    // form field
                    <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(formik.touched.couponDiscountValue && formik.errors.couponDiscountValue) ? "has-msg msg-error" : ""}`}>
                        <label>
                            Discount Value
                        </label>
                        <div className="media-body st-form-input-container">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Discount Value"
                                id="couponDiscountValue"
                                {...formik.getFieldProps('couponDiscountValue')} />
                            {
                                /* form message */
                                (formik.touched.couponDiscountValue && formik.errors.couponDiscountValue) && (
                                    <div className="st-form-msg position-absolute">
                                        <p className="st-fs-12">{formik.errors.couponDiscountValue}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                )
            }

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.couponExpiryDate && formik.errors.couponExpiryDate) ? "has-msg msg-error" : ""}`}>
                <label>
                    Expiry Date
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <DayPickerInput
                        onDayChange={handleDateChange}
                        value={formik.values.couponExpiryDate}
                        inputProps={{
                            className: 'form-control',
                            onKeyDown: handleKeyDown
                        }}
                        classNames={{ container: 'date-picker-container' }}
                        dayPickerProps={{
                            todayButton: 'Today'
                        }}
                        formatDate={formatDate}
                        format={FORMAT}
                        parseDate={parseDate}
                        placeholder={"YY-MM-DD"}

                    // showOverlay={true}
                    // hideOnDayClick={false}
                    // keepFocus={true}
                    />

                    <input
                        type="text"
                        className="form-control d-none"
                        placeholder="Expiry Date"
                        id="couponExpiryDate"
                        {...formik.getFieldProps('couponExpiryDate')} />
                    {
                        /* form message */
                        (formik.touched.couponExpiryDate && formik.errors.couponExpiryDate) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.couponExpiryDate}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(formik.touched.couponMinOrderAmount && formik.errors.couponMinOrderAmount) ? "has-msg msg-error" : ""}`}>
                <label>
                    Minimum Order Amount
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Minimum Order Amount"
                        id="couponMinOrderAmount"
                        {...formik.getFieldProps('couponMinOrderAmount')} />
                    {
                        /* form message */
                        (formik.touched.couponMinOrderAmount && formik.errors.couponMinOrderAmount) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.couponMinOrderAmount}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.couponStatus && formik.errors.couponStatus) ? "has-msg msg-error" : ""}`}>
                <label>Status</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="couponStatus"
                        {...formik.getFieldProps('couponStatus')}>
                        <option disabled value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    {
                        /* form message */
                        (formik.touched.couponStatus && formik.errors.couponStatus) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.couponStatus}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.couponFreeShiping && formik.errors.couponFreeShiping) ? "has-msg msg-error" : ""}`}>
                <label>
                    Free Shipping
                </label>
                <div className="media-body st-form-input-container" style={{ textAlign: 'left' }}>
                    <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer position-relative" style={{ top: 3 }}>
                        <input
                            type="checkbox"
                            className="d-none"
                            id="couponFreeShiping"
                            checked={formik.values.couponFreeShiping}
                            {...formik.getFieldProps('couponFreeShiping')} />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                    </label>

                    {
                        /* form message */
                        (formik.touched.couponFreeShiping && formik.errors.couponFreeShiping) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.couponFreeShiping}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.couponSingleUse && formik.errors.couponSingleUse) ? "has-msg msg-error" : ""}`}>
                <label>
                    Single Use
                </label>
                <div className="media-body st-form-input-container" style={{ textAlign: 'left' }}>
                    <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer position-relative" style={{ top: 3 }}>
                        <input
                            type="checkbox"
                            className="d-none"
                            id="couponSingleUse"
                            checked={formik.values.couponSingleUse}
                            {...formik.getFieldProps('couponSingleUse')} />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                    </label>

                    {
                        /* form message */
                        (formik.touched.couponSingleUse && formik.errors.couponSingleUse) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.couponSingleUse}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.couponSingleUsePerUser && formik.errors.couponSingleUsePerUser) ? "has-msg msg-error" : ""}`}>
                <label>
                    Single Use Per User
                </label>
                <div className="media-body st-form-input-container" style={{ textAlign: 'left' }}>
                    <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer position-relative" style={{ top: 3 }}>
                        <input
                            type="checkbox"
                            className="d-none"
                            id="couponSingleUsePerUser"
                            checked={formik.values.couponSingleUsePerUser}
                            {...formik.getFieldProps('couponSingleUsePerUser')} />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                    </label>

                    {
                        /* form message */
                        (formik.touched.couponSingleUsePerUser && formik.errors.couponSingleUsePerUser) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.couponSingleUsePerUser}</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}

export default memo(FormCoupons__Details)