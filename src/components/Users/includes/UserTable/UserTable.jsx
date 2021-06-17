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
import UsersLodingSkeleton from './users__loadingSkeleton'

// tooltips
import { renderTooltipDeleteUser, renderTooltipEditUser } from '../../includes/tooltips/Users__Tooltips'

// react moment
import Moment from 'react-moment';

export default function UserTable(props) {

    return (
        <Table responsive className="mb-0">
            <thead>
                <tr>
                    <th width={35}>
                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                            <input
                                type="checkbox"
                                className="d-none"
                                // defaultChecked={allUsersSelected}
                                checked={props.allUsersSelected}
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
                        props.column__User && (
                            <th>
                                <p className="text-capitalize">
                                    user
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__Email && (
                            <th>
                                <p className="text-capitalize">
                                    email
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__Type && (
                            <th>
                                <p className="text-capitalize">
                                    type
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__TwoFactors && (
                            <th>
                                <p className="text-capitalize">
                                    two factors
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__LastActive && (
                            <th>
                                <p className="text-capitalize">
                                    last active
                                </p>
                            </th>
                        )
                    }

                    {
                        props.column__Status && (
                            <th>
                                <p className="text-capitalize">
                                    status
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
                                        <UsersLodingSkeleton />
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    )
                }

                {
                    /* USERS DATA */
                    (props.users && props.users.length) ? props.users.map(item => (
                        <tr key={item.login_id}>
                            <td className="column__checkbox">
                                <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                    <input type="checkbox" className="d-none user-selector-checkbox" />
                                    <span className="box d-flex align-items-center justify-content-center border" style={{ height: 17, width: 17 }}>
                                        <FeatherIcon
                                            icon="check"
                                            size="11"
                                            className="icon position-relative" />
                                    </span>
                                </label>
                            </td>

                            {
                                props.column__User && (
                                    <td className="column__username">
                                        <Link to="/" className="hover-underline-link st-text-primary">
                                            {item.first_name + " " + item.last_name}
                                        </Link>
                                    </td>
                                )
                            }

                            {
                                props.column__Email && (
                                    <td className="column__email">
                                        <p className="">
                                            {item.email}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__Type && (
                                    <td className="column__type">
                                        <p className="st-text-primary">
                                            {item.group_name}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__TwoFactors && (
                                    <td className="column__two-factors">
                                        <p className="text-capitalize">
                                            {item.enable_two_factor ? 'yes' : 'no'}
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__LastActive && (
                                    <td className="column__last-active">
                                        <p className="">
                                            <Moment
                                                format="MMMM DD, YYYY hh:mm a"
                                                date={item.last_login_time}
                                            />
                                        </p>
                                    </td>
                                )
                            }

                            {
                                props.column__Status && (
                                    <td className="column__status">
                                        <p className="text-capitalize">
                                            {item.user_status === 1 ? 'active' : 'inactive'}
                                        </p>
                                    </td>
                                )
                            }

                            <td className="column__actions">
                                <div className="d-flex justify-content-end">
                                    <OverlayTrigger
                                        placement={"left"}
                                        overlay={renderTooltipEditUser}
                                    >
                                        <Link
                                            to={{
                                                pathname: '/settings/users/edit/' + item.login_id,
                                                state: { userDetails: item }
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
                                        overlay={renderTooltipDeleteUser}
                                    >
                                        <button
                                            className="st-round-btn st-btn-transparent st-btn-xs d-flex align-items-center justify-content-center"
                                            onClick={ev => props.handleDeleteUser(ev, item.login_id)}
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
