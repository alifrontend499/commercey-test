import React, { useState } from 'react'

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

export default function FormFields__Details(props) {
    const { handleDateChange } = props

    const FORMAT = "YYYY-MM-DD"

    // disabling key press
    const handleKeyDown = ev => {
        ev.preventDefault()
        return false
    }

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponCode && props.formik.errors.couponCode) ? "has-msg msg-error" : ""}`}>
                <label>
                    Coupon Code
                    <span>*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Coupon Code"
                        id="couponCode"
                        {...props.formik.getFieldProps('couponCode')} />
                    {
                        /* form message */
                        (props.formik.touched.couponCode && props.formik.errors.couponCode) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponCode}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponDiscountType && props.formik.errors.couponDiscountType) ? "has-msg msg-error" : ""}`}>
                <label>
                    Discount Type
                    <span>*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="couponDiscountType"
                        {...props.formik.getFieldProps('couponDiscountType')}>
                        <option disabled value="">Select Discount Type</option>
                        <option value="percent">Percent</option>
                        <option value="value">Value</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.couponDiscountType && props.formik.errors.couponDiscountType) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponDiscountType}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* if discount type is percent */}
            {
                (props?.formik?.values?.couponDiscountType === "percent") && (
                    // form field
                    <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(props.formik.touched.couponDiscountPercent && props.formik.errors.couponDiscountPercent) ? "has-msg msg-error" : ""}`}>
                        <label>
                            Discount Percent
                            {/* <span>*</span> */}
                        </label>
                        <div className="media-body st-form-input-container">
                            <input
                                type="number"
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
                )
            }

            {/* if discount type is value */}
            {
                (props?.formik?.values?.couponDiscountType === "value") && (
                    // form field
                    <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(props.formik.touched.couponDiscountValue && props.formik.errors.couponDiscountValue) ? "has-msg msg-error" : ""}`}>
                        <label>
                            Discount Value
                            {/* <span>*</span> */}
                        </label>
                        <div className="media-body st-form-input-container">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Discount Value"
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

                )
            }

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponExpiryDate && props.formik.errors.couponExpiryDate) ? "has-msg msg-error" : ""}`}>
                <label>
                    Expiry Date
                    <span>*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <DayPickerInput
                        onDayChange={handleDateChange}
                        value={props.formik.values.couponExpiryDate}
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
                        {...props.formik.getFieldProps('couponExpiryDate')} />
                    {
                        /* form message */
                        (props.formik.touched.couponExpiryDate && props.formik.errors.couponExpiryDate) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponExpiryDate}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(props.formik.touched.couponMinOrderAmount && props.formik.errors.couponMinOrderAmount) ? "has-msg msg-error" : ""}`}>
                <label>
                    Minimum Order Amount
                    <span>*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Minimum Order Amount"
                        id="couponMinOrderAmount"
                        {...props.formik.getFieldProps('couponMinOrderAmount')} />
                    {
                        /* form message */
                        (props.formik.touched.couponMinOrderAmount && props.formik.errors.couponMinOrderAmount) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.couponMinOrderAmount}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponStatus && props.formik.errors.couponStatus) ? "has-msg msg-error" : ""}`}>
                <label>Status</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="couponStatus"
                        {...props.formik.getFieldProps('couponStatus')}>
                        <option disabled value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
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
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponFreeShiping && props.formik.errors.couponFreeShiping) ? "has-msg msg-error" : ""}`}>
                <label>
                    Free Shipping
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container" style={{ textAlign: 'left' }}>
                    <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer position-relative" style={{ top: 3 }}>
                        <input
                            type="checkbox"
                            className="d-none"
                            id="couponFreeShiping"
                            checked={props.formik.values.couponFreeShiping}
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
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.couponSingleUse && props.formik.errors.couponSingleUse) ? "has-msg msg-error" : ""}`}>
                <label>
                    Single Use
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container" style={{ textAlign: 'left' }}>
                    <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer position-relative" style={{ top: 3 }}>
                        <input
                            type="checkbox"
                            className="d-none"
                            id="couponSingleUse"
                            checked={props.formik.values.couponSingleUse}
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
                    <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer position-relative" style={{ top: 3 }}>
                        <input
                            type="checkbox"
                            className="d-none"
                            id="couponSingleUsePerUser"
                            checked={props.formik.values.couponSingleUsePerUser}
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
