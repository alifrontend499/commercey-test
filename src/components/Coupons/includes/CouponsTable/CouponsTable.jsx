import React from 'react'

// bootstrap
import {
    Table,
    OverlayTrigger,
} from 'react-bootstrap'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// react router
import { Link } from 'react-router-dom';

// skeleton loading
import CouponsLodingSkeleton from './table__loadingSkeleton'

// tooltips
import { renderTooltipDelete, renderTooltipEdit } from '../tooltips/Coupons__Tooltips'

// react moment
import Moment from 'react-moment';

export default function CouponsTable(props) {

    return (
        <Table responsive className="mb-0">
            <thead>
                <tr>
                    <th width={35}>
                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                            <input
                                type="checkbox"
                                className="d-none"
                                checked={props.allCheckboxSelected}
                                onChange={ev => props.handleSelectAllChange(ev)} />
                            <span className="box d-flex align-items-center justify-content-center border" style={{ height: 17, width: 17 }}>
                                <FeatherIcon
                                    icon="check"
                                    size="11"
                                    className="icon position-relative" />
                            </span>
                        </label>
                    </th>

                    {
                        props.column__CouponCode && (
                            <th>
                                <p className="text-capitalize">
                                    code
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CouponFor && (
                            <th>
                                <p className="text-capitalize">
                                    for
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CouponDiscountPercent && (
                            <th>
                                <p className="text-capitalize">
                                    discount percent
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CouponDiscountValue && (
                            <th>
                                <p className="text-capitalize">
                                    discount value
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CouponExpiryDate && (
                            <th>
                                <p className="text-capitalize">
                                    expiry date
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CouponFreeShipping && (
                            <th>
                                <p className="text-capitalize">
                                    free shipping
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CouponStatus && (
                            <th>
                                <p className="text-capitalize">
                                    status
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CouponSingleUse && (
                            <th>
                                <p className="text-capitalize">
                                    single use
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CouponSingleUsePerUser && (
                            <th>
                                <p className="text-capitalize">
                                    single use per user
                                </p>
                            </th>
                        )
                    }

                    <th width="90"></th>
                </tr>
            </thead>

            <tbody>
                {
                    /* loading */
                    props.loading && (
                        <React.Fragment>
                            {
                                (props.loadingCount && props.loadingCount.length) && props.loadingCount.map(item => (
                                    <React.Fragment key={item}>
                                        <CouponsLodingSkeleton />
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    )
                }

                {
                    /* EMAILS DATA */
                    (props.coupons && props.coupons.length) ? props.coupons.map(item => (
                        <tr key={item.coupon_id}>
                            <td className="column__checkbox">
                                <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                    <input type="checkbox" className="d-none all-checkboxes-selector-checkbox" />
                                    <span className="box d-flex align-items-center justify-content-center border" style={{ height: 17, width: 17 }}>
                                        <FeatherIcon
                                            icon="check"
                                            size="11"
                                            className="icon position-relative" />
                                    </span>
                                </label>
                            </td>

                            {
                                props.column__CouponCode && (
                                    <td className="column__CouponCode">
                                        <p className="">
                                            {item.coupon_code}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CouponFor && (
                                    <td className="column__CouponFor">
                                        <p className="">
                                            {item.coupon_for}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CouponDiscountPercent && (
                                    <td className="column__CouponDiscountPercent">
                                        <p className="">
                                            {item.discount_percent}%
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CouponDiscountValue && (
                                    <td className="column__CouponDiscountValue">
                                        <p className="">
                                            {item.discount_value}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CouponExpiryDate && (
                                    <td className="column__CouponExpiryDate">
                                        <p className="">
                                            <Moment
                                                format="MMMM DD, YYYY hh:mm a"
                                                date={item.expiry_date}
                                            />
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CouponFreeShipping && (
                                    <td className="column__CouponFreeShipping">
                                        <p className="">
                                            {item.free_shipping ? "Active" : 'Inactive'}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CouponStatus && (
                                    <td className="column__CouponStatus">
                                        <p className="">
                                            {item.is_active ? "Active" : 'Inactive'}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CouponSingleUse && (
                                    <td className="column__CouponSingleUse">
                                        <p className="">
                                            {item.single_use ? "Active" : 'Inactive'}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CouponSingleUsePerUser && (
                                    <td className="column__CouponSingleUsePerUser">
                                        <p className="">
                                            {item.single_use_per_user ? "Active" : 'Inactive'}
                                        </p>
                                    </td>
                                )
                            }

                            <td className="column__actions">
                                <div className="d-flex justify-content-end">
                                    <OverlayTrigger
                                        placement={"left"}
                                        overlay={renderTooltipEdit}
                                    >
                                        <Link
                                            to={{
                                                pathname: '/catalog/coupons/edit/' + item.coupon_id,
                                                state: { couponDetails: item }
                                            }}
                                            className="st-round-btn st-btn-transparent st-btn-xs d-flex align-items-center justify-content-center me-1"
                                        >
                                            <FeatherIcon
                                                icon="edit-2"
                                                size="15"
                                                className="icon" />
                                        </Link>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement={"left"}
                                        overlay={renderTooltipDelete}
                                    >
                                        <button
                                            className="st-round-btn st-btn-transparent st-btn-xs d-flex align-items-center justify-content-center"
                                            onClick={ev => props.handleDelete(ev, item.coupon_id)}
                                        >
                                            <FeatherIcon
                                                icon="trash"
                                                size="15"
                                                className="icon" />
                                        </button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        !props.loading ? (
                            <tr>
                                <td colSpan="12">
                                    <p className="no-data-found text-center st-fw-700 py-1">
                                        no data found
                                    </p>
                                </td>
                            </tr>
                        ) : null
                    )
                }
            </tbody>
        </Table>
    )
}
