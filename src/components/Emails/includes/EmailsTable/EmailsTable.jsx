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
import EmailsLodingSkeleton from './emails__loadingSkeleton'

// tooltips
import { renderTooltipDelete, renderTooltipEdit } from '../tooltips/Emails__Tooltips'

// react moment
import Moment from 'react-moment';

export default function EmailsTable(props) {

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
                        props.column__TemplateName && (
                            <th>
                                <p className="text-capitalize">
                                    template name
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__Subject && (
                            <th>
                                <p className="text-capitalize">
                                    subject
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__Event && (
                            <th>
                                <p className="text-capitalize">
                                    event name
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__to && (
                            <th>
                                <p className="text-capitalize">
                                    to
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__DateAdded && (
                            <th width="170">
                                <p className="text-capitalize">
                                    date added
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
                                        <EmailsLodingSkeleton />
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    )
                }

                {
                    /* EMAILS DATA */
                    (props.emails && props.emails.length) ? props.emails.map(item => (
                        <tr key={item.template_id}>
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
                                props.column__TemplateName && (
                                    <td className="column__TemplateName">
                                        <p className="">
                                            {item.template_title}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__Subject && (
                                    <td className="column__Subject">
                                        <p className="">
                                            {item.email_subject}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__Event && (
                                    <td className="column__Event">
                                        <p className="">
                                            {item.event_title}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__to && (
                                    <td className="column__to">
                                        <p className="">
                                            {item.send_email_to}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__DateAdded && (
                                    <td className="column__DateAdded">
                                        <p className="">
                                            <Moment
                                                format="MMMM DD, YYYY hh:mm a"
                                                date={item.dateAdded}
                                            />
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
                                                pathname: '/settings/emails/edit/' + item.template_id,
                                                state: { emailDetails: item }
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
                                            onClick={ev => props.handleDelete(ev, item.template_id)}
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
