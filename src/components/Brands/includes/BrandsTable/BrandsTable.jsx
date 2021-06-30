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
import BrandsLodingSkeleton from './table__loadingSkeleton'

// tooltips
import { renderTooltipDelete, renderTooltipEdit } from '../tooltips/Brands__Tooltips'

export default function BrandsTable(props) {

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
                        props.column__ManufacturerName && (
                            <th>
                                <p className="text-capitalize">
                                    brand name
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__ManufacturerUrl && (
                            <th>
                                <p className="text-capitalize">
                                    brand url
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
                                        <BrandsLodingSkeleton />
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    )
                }

                {
                    /* EMAILS DATA */
                    (props.brands && props.brands.length) ? props.brands.map(item => (
                        <tr key={item.manufacturer_id}>
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
                                props.column__ManufacturerName && (
                                    <td className="column__ManufacturerName">
                                        <p className="">
                                            {item.manufacturer_name}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__ManufacturerUrl && (
                                    <td className="column__ManufacturerUrl">
                                        <p className="">
                                            {item.manufacturer_url}
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
                                                pathname: '/catalog/brands/edit/' + item.manufacturer_id,
                                                state: { brandsDetails: item }
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
                                            onClick={ev => props.handleDelete(ev, item.manufacturer_id)}
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
