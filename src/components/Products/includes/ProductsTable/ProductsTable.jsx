import React from 'react'

// bootstrap
import {
    Table,
    OverlayTrigger,
    Image,
} from 'react-bootstrap'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// react router
import { Link } from 'react-router-dom';

// skeleton loading
import ProductsLodingSkeleton from './table__loadingSkeleton'

// tooltips
import { renderTooltipDelete, renderTooltipEdit } from '../tooltips/Table__Tooltips'

// images
import noImgFound from 'assets/images/no-img-found.png'

export default function ProductsTable(props) {

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
                        props.column__ProductName && (
                            <th>
                                <p className="text-capitalize">
                                    name
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__ProductImg && (
                            <th>
                                <p className="text-capitalize">
                                    image
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__ProductSKU && (
                            <th>
                                <p className="text-capitalize">
                                    SKU
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__ProductStatus && (
                            <th>
                                <p className="text-capitalize">
                                    Status
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
                                        <ProductsLodingSkeleton />
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    )
                }

                {
                    /* EMAILS DATA */
                    (props.products && props.products.length) ? props.products.map(item => (
                        <tr key={item.product_id}>
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
                                props.column__ProductName && (
                                    <td className="column__ProductName">
                                        <p className="">
                                            {item.product_name}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__ProductImg && (
                                    <td className="column__ProductImg">
                                        <p className="">
                                            <Image src={item.thumb ? item.thumb : noImgFound} fluid width={70} />
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__ProductSKU && (
                                    <td className="column__ProductSKU">
                                        <p className="">
                                            {item.sku}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__ProductStatus && (
                                    <td className="column__ProductStatus">
                                        <p className="">
                                            {item.active ? "Active" : "Inactive"}
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
                                                pathname: '/catalog/products/edit/' + item.product_id,
                                                state: { productDetails: item }
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
                                            onClick={ev => props.handleDelete(ev, item.product_id)}
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
                                <td colSpan="7">
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
