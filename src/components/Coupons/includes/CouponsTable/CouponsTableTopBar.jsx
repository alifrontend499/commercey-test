import React from 'react'

// bootstrap
import {
    Dropdown
} from 'react-bootstrap'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// react router
import { Link } from 'react-router-dom';

export default function CouponsTableTopBar(props) {

    return (
        <div className="inner d-flex">
            {/* lt */}
            <div className="lt">
                <Link
                    to="/catalog/coupons/create"
                    className="st-btn st-btn-primary no-min-width st-btn-sm d-flex align-items-center justify-content-center btn btn-primary">
                    <FeatherIcon
                        icon="plus"
                        size="14"
                        className="icon me-2" />
                    <span>Create Coupon</span>
                </Link>
            </div>

            {/* rt */}
            <div className="rt ms-auto d-flex">
                {/* search */}
                <div className="rt_item st-form form-sm st-form-with-icon-left search mb-0 me-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={props.handleSearchChange} />
                    <div className="icon">
                        <FeatherIcon
                            icon="search"
                            size="15"
                            className="icon-main" />
                    </div>
                </div>
                {/* edit columns*/}
                <div className="rt_item button-container export-options me-2">
                    <Dropdown className="st-bs-dropdown no-down-icon">
                        <Dropdown.Toggle className="st-btn st-btn-primary no-min-width st-btn-sm d-flex align-items-center justify-content-center btn btn-primary">
                            <FeatherIcon
                                icon="edit"
                                size="14"
                                className="icon me-2" />
                            <span>Edit Columns</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* label item */}
                            <label className="dropdown-item st-checkbox d-inline-flex cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="d-none"
                                    defaultChecked={props.column__CouponCode}
                                    onChange={ev => {
                                        (ev.target.checked) ? props.setColumn__CouponCode(true) : props.setColumn__CouponCode(false)
                                    }} />
                                <span className="box d-flex align-items-center justify-content-center border">
                                    <FeatherIcon
                                        icon="check"
                                        size="15"
                                        className="icon position-relative" />
                                </span>
                                <span className="text ms-2">Code</span>
                            </label>

                            {/* label item */}
                            <label className="dropdown-item st-checkbox d-inline-flex cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="d-none"
                                    defaultChecked={props.column__CouponFor}
                                    onChange={ev => {
                                        (ev.target.checked) ? props.setColumn__CouponFor(true) : props.setColumn__CouponFor(false)
                                    }} />
                                <span className="box d-flex align-items-center justify-content-center border">
                                    <FeatherIcon
                                        icon="check"
                                        size="15"
                                        className="icon position-relative" />
                                </span>
                                <span className="text ms-2">For</span>
                            </label>
                            
                            {/* label item */}
                            <label className="dropdown-item st-checkbox d-inline-flex cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="d-none"
                                    defaultChecked={props.column__CouponDiscountPercent}
                                    onChange={ev => {
                                        (ev.target.checked) ? props.setColumn__CouponDiscountPercent(true) : props.setColumn__CouponDiscountPercent(false)
                                    }} />
                                <span className="box d-flex align-items-center justify-content-center border">
                                    <FeatherIcon
                                        icon="check"
                                        size="15"
                                        className="icon position-relative" />
                                </span>
                                <span className="text ms-2">Discount Percent</span>
                            </label>

                            {/* label item */}
                            <label className="dropdown-item st-checkbox d-inline-flex cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="d-none"
                                    defaultChecked={props.column__CouponDiscountValue}
                                    onChange={ev => {
                                        (ev.target.checked) ? props.setColumn__CouponDiscountValue(true) : props.setColumn__CouponDiscountValue(false)
                                    }} />
                                <span className="box d-flex align-items-center justify-content-center border">
                                    <FeatherIcon
                                        icon="check"
                                        size="15"
                                        className="icon position-relative" />
                                </span>
                                <span className="text ms-2">Discount Value</span>
                            </label>

                            {/* label item */}
                            <label className="dropdown-item st-checkbox d-inline-flex cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="d-none"
                                    defaultChecked={props.column__CouponExpiryDate}
                                    onChange={ev => {
                                        (ev.target.checked) ? props.setColumn__CouponExpiryDate(true) : props.setColumn__CouponExpiryDate(false)
                                    }} />
                                <span className="box d-flex align-items-center justify-content-center border">
                                    <FeatherIcon
                                        icon="check"
                                        size="15"
                                        className="icon position-relative" />
                                </span>
                                <span className="text ms-2">Expiry Date</span>
                            </label>

                            {/* label item */}
                            <label className="dropdown-item st-checkbox d-inline-flex cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="d-none"
                                    defaultChecked={props.column__CouponFreeShipping}
                                    onChange={ev => {
                                        (ev.target.checked) ? props.setColumn__CouponFreeShipping(true) : props.setColumn__CouponFreeShipping(false)
                                    }} />
                                <span className="box d-flex align-items-center justify-content-center border">
                                    <FeatherIcon
                                        icon="check"
                                        size="15"
                                        className="icon position-relative" />
                                </span>
                                <span className="text ms-2">Free Shipping</span>
                            </label>

                            {/* label item */}
                            <label className="dropdown-item st-checkbox d-inline-flex cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="d-none"
                                    defaultChecked={props.column__CouponStatus}
                                    onChange={ev => {
                                        (ev.target.checked) ? props.setColumn__CouponStatus(true) : props.setColumn__CouponStatus(false)
                                    }} />
                                <span className="box d-flex align-items-center justify-content-center border">
                                    <FeatherIcon
                                        icon="check"
                                        size="15"
                                        className="icon position-relative" />
                                </span>
                                <span className="text ms-2">Status</span>
                            </label>

                            {/* label item */}
                            <label className="dropdown-item st-checkbox d-inline-flex cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="d-none"
                                    defaultChecked={props.column__CouponSingleUse}
                                    onChange={ev => {
                                        (ev.target.checked) ? props.setColumn__CouponSingleUse(true) : props.setColumn__CouponSingleUse(false)
                                    }} />
                                <span className="box d-flex align-items-center justify-content-center border">
                                    <FeatherIcon
                                        icon="check"
                                        size="15"
                                        className="icon position-relative" />
                                </span>
                                <span className="text ms-2">Single Use</span>
                            </label>

                            {/* label item */}
                            <label className="dropdown-item st-checkbox d-inline-flex cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="d-none"
                                    defaultChecked={props.column__CouponSingleUsePerUser}
                                    onChange={ev => {
                                        (ev.target.checked) ? props.setColumn__CouponSingleUsePerUser(true) : props.setColumn__CouponSingleUsePerUser(false)
                                    }} />
                                <span className="box d-flex align-items-center justify-content-center border">
                                    <FeatherIcon
                                        icon="check"
                                        size="15"
                                        className="icon position-relative" />
                                </span>
                                <span className="text ms-2">Single Use Per User</span>
                            </label>


                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* more options */}
                <div className="rt_item button-container export-options me-2">
                    <Dropdown className="st-bs-dropdown no-down-icon">
                        <Dropdown.Toggle className="st-btn st-btn-primary no-min-width st-btn-sm d-flex align-items-center justify-content-center btn btn-primary">
                            <FeatherIcon
                                icon="download"
                                size="14"
                                className="icon me-2" />
                            <span>Export</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" className="d-flex align-items-center">
                                <FeatherIcon
                                    icon="file"
                                    size="13"
                                    className="icon me-2" />
                                <span>Excel</span>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2" className="d-flex align-items-center">
                                <FeatherIcon
                                    icon="file"
                                    size="13"
                                    className="icon me-2" />
                                <span>PDF</span>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3" className="d-flex align-items-center">
                                <FeatherIcon
                                    icon="printer"
                                    size="13"
                                    className="icon me-2" />
                                <span>Print</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* more options */}
                <div className="rt_item button-container more-options">
                    <Dropdown className="st-bs-dropdown no-down-icon">
                        <Dropdown.Toggle className="st-round-btn st-btn-rounded-square-btn st-btn-primary st-btn-sm d-flex align-items-center justify-content-center">
                            <FeatherIcon
                                icon="more-horizontal"
                                size="55"
                                className="icon" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" className="d-flex align-items-center">
                                <FeatherIcon
                                    icon="trash"
                                    size="13"
                                    className="icon me-2" />
                                <span>Bulk Delete</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}
