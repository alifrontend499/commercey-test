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
import CategoriesLodingSkeleton from './table__loadingSkeleton'

// tooltips
import { renderTooltipDelete, renderTooltipEdit } from '../tooltips/Categories__Tooltips'

// images
import noImgFound from 'assets/images/no-img-found.png'

export default function CategoriesTable(props) {

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
                        props.column__CategoryName && (
                            <th>
                                <p className="text-capitalize">
                                    name
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CategoryImg && (
                            <th>
                                <p className="text-capitalize">
                                    image
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CategoryParentCategory && (
                            <th>
                                <p className="text-capitalize">
                                    Parent Category
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__CategoryStatus && (
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
                                        <CategoriesLodingSkeleton />
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    )
                }

                {
                    /* EMAILS DATA */
                    (props.categories && props.categories.length) ? props.categories.map(item => (
                        <tr key={item.category_id}>
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
                                props.column__CategoryName && (
                                    <td className="column__CategoryName">
                                        <p className="">
                                            {item.category_name}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CategoryImg && (
                                    <td className="column__CategoryImg">
                                        <p className="">
                                            <Image src={item.image ?? noImgFound} fluid width={70} />
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CategoryParentCategory && (
                                    <td className="column__CategoryParentCategory">
                                        <p className="">
                                            {item.parent_name}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__CategoryStatus && (
                                    <td className="column__CategoryStatus">
                                        <p className="">
                                            {item.status ? "Active" : "Inactive"}
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
                                                pathname: '/catalog/categories/edit/' + item.category_id,
                                                state: { categoryDetails: item }
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
                                            onClick={ev => props.handleDelete(ev, item.category_id)}
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
