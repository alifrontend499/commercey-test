import React from 'react'

// pagination styles
import './styles/pagination-styles.scss'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// react router dom
import { Link } from 'react-router-dom';

export default function Pagination(props) {
    const { paginationLinks, routeName } = props

    return (
        <React.Fragment>
            {
                (paginationLinks && paginationLinks.length) && (
                    <div id="st-pagination" className="">
                        <div className="st-pagination d-flex flex-wrap">
                            {
                                paginationLinks.map((item, key) => (
                                    <React.Fragment key={key}>
                                        {
                                            // button previous
                                            (item.label === "pagination.previous") && (
                                                <Link
                                                    to={`${routeName}?${item.url && item.url.split("?")[item.url.split("?").length - 1]}`}
                                                    className={`pagination-link text-decoration-none link-previous ms-0
                                                    ${(!item.url) ? "disabled" : ""}`}>
                                                    <FeatherIcon
                                                        icon="chevron-left"
                                                        size="13"
                                                        className="icon position-relative" />
                                                </Link>
                                            )
                                        }
                                        {
                                            // button links
                                            ((item.label !== "pagination.previous") && (item.label !== "pagination.next")) && (
                                                <Link
                                                    to={`${routeName}?${item.url && item.url.split("?")[item.url.split("?").length - 1]}`}
                                                    className={`pagination-link text-decoration-none link-count 
                                                    ${item.active ? "active disabled" : ""}
                                                    ${(!item.url) ? "disabled" : ""}`}>
                                                    {key}
                                                </Link>
                                            )
                                        }
                                        {
                                            // button previous
                                            (item.label === "pagination.next") && (
                                                <Link
                                                    to={`${routeName}?${item.url && item.url.split("?")[item.url.split("?").length - 1]}`}
                                                    className={`pagination-link text-decoration-none link-next
                                                    ${(!item.url) ? "disabled" : ""}`}>
                                                    <FeatherIcon
                                                        icon="chevron-right"
                                                        size="13"
                                                        className="icon position-relative" />
                                                </Link>
                                            )
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}
